import React, { Component } from "react";
import { Popup } from "react-map-gl";

export default class MessagePopup extends Component {
  state = {
    visible: true
  };
  
  render() {
    const {
      popup: {
        latitude,
        longitude,
        content: { text }
      },
    } = this.props;
    const { visible } = this.state;
    return (
      visible && (
        <Popup
          latitude={latitude}
          longitude={longitude}
          closeButton={true}
          closeOnClick={true}
          anchor="bottom"
          captureClick={true}
        >
          <p>{text}</p>
        </Popup>
      )
    );
  }
}
