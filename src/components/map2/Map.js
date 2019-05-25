import React from "react";
// import io from "socket.io-client";
import DeckGL, { IconLayer } from "deck.gl";
import { StaticMap } from "react-map-gl";
import iconMapJson from "./location-icon-mapping.json";
import iconMapPng from "./location-icon-atlas.png";
import IconClusterLayer from "./iconClusterLayer";
import Tooltip from "./components/Tooltip";
import ExtendedTooltip from "./components/ExtendedTooltip";

function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  // .toFixed() returns string, so ' * 1' is a trick to convert to number
}
// Set your mapbox access token here
const TOKEN =
  "pk.eyJ1IjoiYmFyaGFudGFzIiwiYSI6ImNqMTZrNGVucTAwMmkycXBwOXphbmNxb3UifQ.AWPV2nEshrEQGXIWg0Plzg"; // Set your mapbox token here

// Initial viewport settings
const initialViewState = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

export default class Map2 extends React.Component {
  state = {
    x: 0,
    y: 0,
    hoveredItems: null,
    expanded: false,
    pins: []
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
        latitude: getRandomInRange(-90, 90, 3),
        longitude: getRandomInRange(-180, 180, 3),
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
        if (prevstate.pins.length > 200) {
          prevstate.pins.shift();
        }
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

  _onClick = () => {
    this.setState({ expanded: true });
  };

  _closePopup = () => {
    this.setState({ expanded: false, hoveredItems: null });
  };

  _renderhoveredItems = () => {
    const { x, y, hoveredItems, expanded } = this.state;
    if (!hoveredItems) {
      return null;
    }
    return expanded ? (
      <ExtendedTooltip
        x={x}
        y={y}
        hoveredItems={hoveredItems}
        ref={this._onPopupLoad}
        onMouseLeave={this._closePopup}
      />
    ) : (
      <Tooltip x={x} y={y} hoveredItems={hoveredItems} />
    );
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
      onHover: this._onHover,
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
    const { viewState, controller = true, baseMap = true } = this.props;

    return (
      <DeckGL
        initialViewState={initialViewState}
        controller={controller}
        layers={this._renderLayers()}
        viewState={viewState}
      >
        {baseMap && (
          <StaticMap
            mapboxApiAccessToken={TOKEN}
            euseMaps
            mapStyle="mapbox://styles/mapbox/dark-v9"
            preventStyleDiffing={true}
          />
        )}

        {this._renderhoveredItems}
      </DeckGL>
    );
  }
}
