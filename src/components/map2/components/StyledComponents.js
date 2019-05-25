import styled from "styled-components";

export const StyledTooltip = styled.div`
  pointer-events: none;
  position: absolute;
  z-index: 9;
  font-size: 12px;
  padding: 8px;
  background: #000;
  color: #fff;
  min-width: 160px;
  max-height: 240px;
  overflow-y: hidden;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
`;

export const StyledInteractiveTooltip = styled(StyledTooltip)`
  width: 200px;
  pointer-events: all;
  background: #fcfcfc;
  color: #444;
  overflow-y: auto;
`;
