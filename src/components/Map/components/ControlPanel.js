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
  padding: 12px 24px;
  margin: 20px;
  font-size: 13px;
  line-height: 2;
  color: #6b6b76;
  text-transform: uppercase;
  outline: none;
`;
