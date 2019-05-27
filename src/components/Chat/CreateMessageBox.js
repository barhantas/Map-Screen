import React, { PureComponent } from "react";

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
      <>
        {collapse && (
          <>
            <input type="text" onChange={this.handleChange} />{" "}
            <button
              disabled={!messageText}
              color="primary"
              onClick={() => {
                sendMessage(messageText);
                this.toggle();
              }}
              style={{ marginBottom: "1rem" }}
            >
              Send !
            </button>
          </>
        )}
        <button
          type="asd"
          color="primary"
          onClick={this.toggle}
          style={{ marginBottom: "1rem" }}
        >
          {!collapse ? "Send Message" : "X"}
        </button>
      </>
    );
  }
}

export default CreateMessageBox;
