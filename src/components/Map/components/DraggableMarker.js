import React from "react";
import { pure } from "recompose";
import styled from "styled-components";

import { Marker } from "react-map-gl";
import Pin from "./Pin";

function DraggableMarker({
  isVisible,
  marker: { longitude, latitude },
  onDragEnd
}) {
  return (
    isVisible && (
      <StyledMarker
        draggable
        longitude={longitude}
        latitude={latitude}
        offsetTop={-20}
        offsetLeft={-10}
        // onDragStart={e => console.log(e)}
        // onDrag={e => console.log(e)}
        onDragEnd={onDragEnd}
      >
        <Pin size={64} />
      </StyledMarker>
    )
  );
}
export default pure(DraggableMarker);

const StyledMarker = styled(Marker)`
  z-index: 100;
`;
