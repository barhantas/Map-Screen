import React from "react";
// import io from "socket.io-client";
import * as firebase from "firebase";

import DeckGL, { IconLayer } from "deck.gl";
import ReactMapGL from "react-map-gl";

import iconMapJson from "./location-icon-mapping.json";
import iconMapPng from "./location-icon-atlas.png";
import IconClusterLayer from "./iconClusterLayer";

import { StyledChatBoxPopup } from "./StyledComponents";
import ChatBox from "../Chat/ChatBox";
import ControlPanel from "./components/ControlPanel";
import DraggableMarker from "./components/DraggableMarker.js";

function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

const config = {
  apiKey: "AIzaSyDwYi6uZjkbsPhY30svamzHsACHYVKQA4s",
  authDomain: "mapchat-7244f.firebaseapp.com",
  databaseURL: "https://mapchat-7244f.firebaseio.com",
  projectId: "mapchat-7244f",
  storageBucket: "mapchat-7244f.appspot.com",
  messagingSenderId: "878275037100",
  appId: "1:878275037100:web:629c0f79e2180879"
};

// Set your mapbox access token here
const TOKEN =
  "pk.eyJ1IjoiYmFyaGFudGFzIiwiYSI6ImNqMTZrNGVucTAwMmkycXBwOXphbmNxb3UifQ.AWPV2nEshrEQGXIWg0Plzg"; // Set your mapbox token here

var dummyUsers = [
  {
    name: "Barış",
    avatar: "https://randomuser.me/api/portraits/med/men/65.jpg"
  },
  {
    name: "Furkan",
    avatar: "https://randomuser.me/api/portraits/med/men/71.jpg"
  },
  {
    name: "İsmail",
    avatar: "https://randomuser.me/api/portraits/med/men/9.jpg"
  },
  {
    name: "Semih",
    avatar: "https://randomuser.me/api/portraits/med/men/60.jpg"
  }
];

// Initial viewport settings
const initialViewState = {
  longitude: 29.002252,
  latitude: 41.025715,
  zoom: 11,
  pitch: 50,
  bearing: 0,
  minZoom: 10
};

export default class Map extends React.Component {
  constructor(props) {
    super(props);

    firebase.initializeApp(config);

    this.state = {
      x: 0,
      y: 0,
      hoveredItems: null,
      expanded: false,
      pins: [],
      isChatBoxVisible: false,
      selectedMessages: [],
      messageMarkerGeolocation: {
        latitude: 41.025715,
        longitude: 29.002252
      },
      isMessageMarkerVisible: false
    };
  }

  componentDidMount() {
    let ref = firebase
      .database()
      .ref("/Messages")
      .orderByChild("date0");
    let arr = [];
    ref.on("value", snapshot => {
      snapshot.forEach(childSnapshot => {
        var childData = childSnapshot.val();
        arr.push(childData);
      });
      console.log("datagelsi")
      this.setState({ pins: arr });
    });

    // setInterval(() => {
    //   const socketData = {
    //     longitude: getRandomInRange(28.6, 29.1, 3),
    //     latitude: getRandomInRange(41.1, 40.9, 3),
    //     user: dummyUsers[Math.floor(Math.random() * dummyUsers.length)],
    //     content: {
    //       text:
    //         Math.random()
    //           .toString(36)
    //           .substring(7) +
    //         Math.random()
    //           .toString(36)
    //           .substring(7) +
    //         Math.random()
    //           .toString(36)
    //           .substring(7)
    //     },
    //     date: new Date()
    //       .toISOString()
    //       .replace(/T/, " ")
    //       .replace(/\..+/, "")
    //   };
    //   const newPin = {
    //     coordinates: [socketData.longitude, socketData.latitude],
    //     ...socketData
    //   };
    //   this.setState(prevstate => {
    //     // if (prevstate.pins.length > 200) {
    //     //   prevstate.pins.shift();
    //     // }
    //     return {
    //       pins: [...prevstate.pins, { ...newPin }]
    //     };
    //   });
    // }, 500);
  }

  _onClick = info => {
    const { x, y, object, lngLat } = info;
    const z = info.layer.state.z;
    const { showCluster = true } = this.props;

    let selectedMessages = null;
    if (object) {
      if (showCluster) {
        selectedMessages = object.zoomLevels[z].points.sort(
          (m1, m2) => m1.year - m2.year
        );
      } else {
        selectedMessages = [object];
      }
    }

    this.setState({
      isChatBoxVisible: true,
      chatBoxPosition: { x, y },
      chatBoxGeolocation: lngLat,
      lngLat: lngLat,
      selectedMessages
    });
  };

  _closePopup = () => {
    this.setState({ expanded: false, hoveredItems: null });
  };

  _onChatBoxClose = () => {
    this.setState({
      isChatBoxVisible: false,
      chatBoxPosition: {},
      chatBoxGeolocation: [],
      selectedPins: []
    });
  };

  _renderLayers = () => {
    const {
      data = this.state.pins,
      iconMapping = iconMapJson,
      iconAtlas = iconMapPng,
      showCluster = true,
      viewState
    } = this.props;

    const layerProps = {
      data,
      pickable: true,
      wrapLongitude: true,
      getPosition: d => d.coordinates,
      iconAtlas,
      iconMapping,
      onClick: this._onClick,
      sizeScale: 60
    };

    const size = viewState
      ? Math.min(Math.pow(1.5, viewState.zoom - 10), 1)
      : 0.1;

    const layer = showCluster
      ? new IconClusterLayer({ ...layerProps, id: "icon-cluster" })
      : new IconLayer({
          ...layerProps,
          id: "icon",
          getIcon: d => "marker",
          getSize: size
        });

    return [layer];
  };

  _onMarkerDragEnd = event => {
    this.setState({
      messageMarkerGeolocation: {
        longitude: event.lngLat[0],
        latitude: event.lngLat[1]
      }
    });
  };

  _openMessageInput = boolean => {
    this.setState({
      isMessageMarkerVisible: boolean
    });
  };

  _sendMessage =  messageText => {
    const {
      messageMarkerGeolocation: { longitude, latitude },
      messageMarkerGeolocation
    } = this.state;
     firebase
      .database()
      .ref("/Messages")
      .push({
        content: { text: messageText },
        coordinates: [longitude, latitude],
        geolocation: messageMarkerGeolocation,
        date: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
        user: dummyUsers[Math.floor(Math.random() * dummyUsers.length)]
      });
    // .set({
    //   text: messageText,
    //   geolocation: messageMarkerGeolocation,
    //   date: new Date()
    //     .toISOString()
    //     .replace(/T/, " ")
    //     .replace(/\..+/, "")
    // });
    this.setState({
      isMessageMarkerVisible: false
    });
  };

  render() {
    const { controller = true, baseMap = true } = this.props;
    const {
      isChatBoxVisible,
      chatBoxGeolocation,
      selectedMessages,
      messageMarkerGeolocation,
      isMessageMarkerVisible
    } = this.state;

    return (
      <DeckGL
        initialViewState={initialViewState}
        controller={controller}
        layers={this._renderLayers()}
      >
        {baseMap && (
          <ReactMapGL
            mapboxApiAccessToken={TOKEN}
            mapStyle="mapbox://styles/mapbox/satellite-v9"
            preventStyleDiffing={true}
          >
            <ControlPanel
              sendMessage={this._sendMessage}
              openMessageInput={this._openMessageInput}
            />

            <DraggableMarker
              isVisible={isMessageMarkerVisible}
              marker={messageMarkerGeolocation}
              onDragEnd={this._onMarkerDragEnd}
            />

            {isChatBoxVisible && (
              <StyledChatBoxPopup
                longitude={chatBoxGeolocation[0]}
                latitude={chatBoxGeolocation[1]}
                closeButton={false}
                closeOnClick={false}
                // onClose={e => console.log(e)}
                onClose={()=>{}}
                anchor="bottom"
              >
                <ChatBox
                  messages={selectedMessages}
                  onClose={this._onChatBoxClose}
                />
              </StyledChatBoxPopup>
            )}
          </ReactMapGL>
        )}
      </DeckGL>
    );
  }
}
