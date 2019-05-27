import styled from "styled-components";
import { Popup } from "react-map-gl";

export const StyledChatBoxPopup = styled(Popup)`
  background: transparent;
  z-index: 100;
  > .mapboxgl-popup-content {
    padding: 0;
    background: transparent;
  }
`;
