import React, { Component } from "react";
import ReactMapGL from "react-map-gl";
import io from "socket.io-client";

import MessagePopup from "./MessagePopup";

const TOKEN =
  "pk.eyJ1IjoiYmFyaGFudGFzIiwiYSI6ImNqMTZrNGVucTAwMmkycXBwOXphbmNxb3UifQ.AWPV2nEshrEQGXIWg0Plzg"; // Set your mapbox token here
function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  // .toFixed() returns string, so ' * 1' is a trick to convert to number
}
export default class Map extends Component {
  state = {
    viewport: {
      latitude: 37.8,
      longitude: -122.41,
      zoom: 3,
      bearing: 0,
      pitch: 0
    },
    popups: [
      {
        id: 1,
        latitude: 37.78,
        longitude: -122.41,
        content: {
          text: "This is popup 1"
        }
      },
      {
        id: 2,
        latitude: 37.98,
        longitude: -121.61,
        content: {
          text: "This is popup 2"
        }
      }
    ]
  };

  componentDidMount() {
    // const socket = io("http://localhost:8810");
    // socket.on("connect", () => {
    //   console.log("hi");
    // });

    // socket.on("message", message => {
    //   this.setState({
    //     popups: [...this.state.popups, { ...message }]
    //   });
    //   console.log(message);
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
      this.setState(prevstate => ({
        popups: [...prevstate.popups, { ...socketData }]
      }));
      console.log(socketData);
    }, 1000);
  }

  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  closePopUp = id => {
    const { popups } = this.state;
    popups.filter(popup => popup.id === id);
  };

  render() {
    const { viewport, popups } = this.state;
    return (
      <ReactMapGL
        mapboxApiAccessToken={TOKEN}
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._updateViewport}
      >
        {popups.slice(Math.max(popups.length - 20, 1)).map((popup, index) => (
          <MessagePopup key={index} popup={popup} onClose={this.closePopUp} />
        ))}
      </ReactMapGL>
    );
  }
}
