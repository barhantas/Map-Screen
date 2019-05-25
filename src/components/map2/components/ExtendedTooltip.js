import React from "react";
import { StyledInteractiveTooltip } from "./StyledComponents";
import ChatBox from "../../Chat/ChatBox";
export default function ExtendedTooltip({
  x,
  y,
  hoveredItems = [],
  onMouseLeave
}) {
  return (
    <StyledInteractiveTooltip x={x} y={y} onMouseLeave={onMouseLeave}>
      <ChatBox messages={hoveredItems} />
    </StyledInteractiveTooltip>
  );
}
