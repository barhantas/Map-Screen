import React, { PureComponent } from "react";
import styled from "styled-components";

import openIcon from "../../assets/Map/plus-icon-1.png";
import closeIcon from "../../assets/Map/close-icon-1.png";

class CreateMessageBox extends PureComponent {
  state = {
    collapse: false,
    messageText: ""
  };

  toggle = () => {
    this.props.openMessageInput(!this.state.collapse);
    this.setState(state => ({ collapse: !state.collapse, messageText: "" }));
  };

  handleChange = e => {
    this.setState({ messageText: e.target.value });
  };

  render() {
    const { collapse, messageText } = this.state;
    const { sendMessage = () => {} } = this.props;
    return (
      <CreateMessageBoxWrapper>
        {collapse && (
          <StyledMessageBoxWrapper>
            <StyledInput
              type="text"
              onChange={this.handleChange}
              placeholder="Say Hi to İstanbul !"
              onKeyPress={(e)=>{
                if (e.key === "Enter") {
                  messageText && sendMessage(messageText);
                }
              }}
            />
            <StyledButton
              disabled={!messageText}
              onClick={() => {
                sendMessage(messageText);
                this.toggle();
              }}
            >
              Send !
            </StyledButton>
          </StyledMessageBoxWrapper>
        )}
        {!collapse ? (
          <StyledIconWrapper cursor="copy">
            <img src={openIcon} alt="open" onClick={this.toggle} />
            <StyledIconText> Send Message </StyledIconText>
          </StyledIconWrapper>
        ) : (
          <StyledIconWrapper>
            <img src={closeIcon} alt="close" onClick={this.toggle} />
            <StyledIconText> Close</StyledIconText>
          </StyledIconWrapper>
        )}
      </CreateMessageBoxWrapper>
    );
  }
}

export default CreateMessageBox;

const StyledButton = styled.div`
  width: 100%;
  margin: auto;
  background: #39b539;
  text-align: center;
  color: white;
  font-family: monospace;
  font-weight: bolder;
  border-radius: 20px;
  font-size: 16px;
`;

const CreateMessageBoxWrapper = styled.div`
  display: flex;
`;

const StyledMessageBoxWrapper = styled.div`
  margin: auto;
  margin-right: 14px;
  height: 60px;
  width: 280px;

  position: relative;
  background: #6168b7;
  border-radius: 0.4em;
  animation: slide-in 1s forwards;
  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 23px solid transparent;
    border-left-color: #6168b7;
    border-right: 0;
    margin-top: -23px;
    margin-right: -23px;
  }
  @keyframes slide-in {
    0% {
      transform: translateX(30%);
      opacity: 0.2;
      box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
    }
    100% {
      transform: translateX(0%);
      opacity: 1;
      box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
    }
  }
`;

const StyledInput = styled.input`
  height: 100%;
  width: 100%;
  background: transparent;
  border: none;
  color: white;
  font-family: monospace;
  font-size: 18px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: white;
  }
`;

const StyledIconWrapper = styled.div`
  text-align: right;
  padding: 0;
  margin: 0;
  cursor: ${props => props.cursor};

  &:hover {
    animation: pulse 1s infinite;
    @keyframes pulse {
      0% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }
  }
`;

const StyledIconText = styled.div`
  text-align: center;
  margin-top: -25px;
  color: white;
  font-size: 16px;
  font-weight: bolder;
  font-family: fantasy;
`;
