import React from "react";
// import io from "socket.io-client";
import DeckGL, { IconLayer } from "deck.gl";
import ReactMapGL from "react-map-gl";

import iconMapJson from "./location-icon-mapping.json";
import iconMapPng from "./location-icon-atlas.png";
import IconClusterLayer from "./iconClusterLayer";

import { StyledChatBoxPopup } from "./StyledComponents";
import ChatBox from "../Chat/ChatBox";

function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  // .toFixed() returns string, so ' * 1' is a trick to convert to number
}
// Set your mapbox access token here
const TOKEN =
  "pk.eyJ1IjoiYmFyaGFudGFzIiwiYSI6ImNqMTZrNGVucTAwMmkycXBwOXphbmNxb3UifQ.AWPV2nEshrEQGXIWg0Plzg"; // Set your mapbox token here

// Initial viewport settings
const initialViewState = {
  longitude: 29.002252,
  latitude: 41.025715,
  zoom: 11,
  pitch: 0,
  bearing: 0
};

export default class Map extends React.Component {
  state = {
    x: 0,
    y: 0,
    hoveredItems: null,
    expanded: false,
    pins: [],
    isChatBoxVisible: false,
    selectedMessages: []
  };

  componentDidMount() {
    // const socket = io("http://localhost:8810");
    // socket.on("connect", () => {
    //   console.log("hi");
    // });

    // socket.on("message", message => {
    //   console.log(message);
    //   const newPin = {
    //     coordinates: [message.longitude, message.latitude],
    //     ...message
    //   };
    //   this.setState(prevState => ({
    //     pins: [...prevState.pins, newPin]
    //   }));
    // });
    setInterval(() => {
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

      const socketData = {
        longitude: getRandomInRange(28.6, 29.1, 3),
        latitude: getRandomInRange(41.1, 40.9, 3),
        user: dummyUsers[Math.floor(Math.random() * dummyUsers.length)],
        content: {
          text:
            Math.random()
              .toString(36)
              .substring(7) +
            Math.random()
              .toString(36)
              .substring(7) +
            Math.random()
              .toString(36)
              .substring(7)
        },
        date: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, "")
      };
      const newPin = {
        coordinates: [socketData.longitude, socketData.latitude],
        ...socketData
      };
      this.setState(prevstate => {
        // if (prevstate.pins.length > 200) {
        //   prevstate.pins.shift();
        // }
        return {
          pins: [...prevstate.pins, { ...newPin }]
        };
      });
    }, 500);
  }

  _onHover = info => {
    if (this.state.expanded) {
      return;
    }

    const { x, y, object } = info;
    const z = info.layer.state.z;
    const { showCluster = true } = this.props;

    let hoveredItems = null;

    if (object) {
      if (showCluster) {
        hoveredItems = object.zoomLevels[z].points.sort(
          (m1, m2) => m1.year - m2.year
        );
      } else {
        hoveredItems = [object];
      }
    }

    this.setState({ x, y, hoveredItems, expanded: false });
  };

  _onClick = info => {
    console.log("_onClick");
    console.log(info);

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
    console.log("_onChatBoxClose");
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
      // onHover: this._onHover,
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

  render() {
    const { controller = true, baseMap = true } = this.props;
    const {
      isChatBoxVisible,
      chatBoxGeolocation,
      selectedMessages
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
            euseMaps
            mapStyle="mapbox://styles/mapbox/dark-v9"
            preventStyleDiffing={true}
          >
            {isChatBoxVisible && (
              <StyledChatBoxPopup
                longitude={chatBoxGeolocation[0]}
                latitude={chatBoxGeolocation[1]}
                closeButton={false}
                closeOnClick={false}
                onClose={e => console.log(e)}
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
