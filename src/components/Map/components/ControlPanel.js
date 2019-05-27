import React, { PureComponent } from "react";
import styled from "styled-components";

import CreateMessageBox from "../../Chat/CreateMessageBox";

export default class ControlPanel extends PureComponent {
  render() {
    const { sendMessage, openMessageInput } = this.props;
    return (
      <ControlPanelWrapper>
        <CreateMessageBox
          sendMessage={sendMessage}
          openMessageInput={openMessageInput}
        />
      </ControlPanelWrapper>
    );
  }
}

const ControlPanelWrapper = styled.div`
  position: absolute;
  z-index: 101;
  top: 0;
  right: 0;
  max-width: 320px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: 12px 24px;
  margin: 20px;
  font-size: 13px;
  line-height: 2;
  color: #6b6b76;
  text-transform: uppercase;
  outline: none;
`;
