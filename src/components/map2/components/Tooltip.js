import React from "react";
import { StyledTooltip } from "./StyledComponents";

export default function Tooltip({ x, y, hoveredItems = [] }) {
  return (
    <StyledTooltip x={x} y={y}>
      {hoveredItems.map(({ user, content }, index) => (
        <div key={index}>
          <h5>{`${user.name} says : ${content.text}`}</h5>
        </div>
      ))}
    </StyledTooltip>
  );
}
