import React from "react";
import {
  ThemeProvider,
  Message,
  MessageList,
  MessageText,
  Avatar,
  TitleBar,
  IconButton,
  CloseIcon
} from "@livechat/ui-kit";

import { ChatBoxWrapper, MessageRow } from "./StyledComponents";

import { theme } from "./theme";
import { dummyMessages } from "./dummyMessages";

export default function ChatBox({
  messages = dummyMessages,
  onClose = () => {}
}) {
  return (
    <ChatBoxWrapper>
      <ThemeProvider theme={theme}>
        <TitleBar
          title="Chat with us!"
          rightIcons={[
            <IconButton key="close">
              <CloseIcon onClick={onClose} />
            </IconButton>
          ]}
        />
        <MessageList active>
          {messages.map(
            (
              message = {
                user: { name: "no-name", avatar: "no-avatar" },
                content: { text: "no-text" }
              },
              index
            ) => (
              <MessageRow key={index}>
                <Avatar imgUrl={message.user.avatar} />
                <Message authorName={message.user.name} date={message.date}>
                  <MessageText>{message.content.text}</MessageText>
                </Message>
              </MessageRow>
            )
          )}
        </MessageList>
      </ThemeProvider>
    </ChatBoxWrapper>
  );
}
