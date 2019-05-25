import React from "react";
import {
  ThemeProvider,
  Message,
  MessageList,
  MessageText,
  Row,
  Avatar
} from "@livechat/ui-kit";

export default function ChatBox({ messages }) {
  return (
    <ThemeProvider>
      <MessageList active>
        {messages.map((message, index) => (
          <Row key={index}>
            <Avatar imgUrl={message.user.avatar} />
            <Message authorName={message.user.name} date={message.date}>
              <MessageText>{message.content.text}</MessageText>
            </Message>
          </Row>
        ))}
      </MessageList>
    </ThemeProvider>
  );
}
