import styled from "styled-components";

export const ChatBoxWrapper = styled.div`
  z-index: 9;
  font-size: 12px;
  min-width: 160px;
  width: 250px;
  pointer-events: all;
  background: transparent;
  color: #444;
  overflow-y: auto;
`;

export const MessageRow = styled.div`
  display: flex;
  margin: 10px;
`;
