import React from 'react';
import { Button } from './Button';
import styled from 'styled-components';

export default function NavigatorButton({
  history,
  value = '/',
  text = 'NavigatorButton',
}) {
  const navigator = ({ target: { value } }) => {
    history.push(value);
  };
  return (
    <StyledButton component={Button} value={value} onClick={navigator}>
      {text}
    </StyledButton>
  );
}

export const StyledButton = styled(Button)`
  cursor: pointer;
  margin: 10px;
  width: 200px;
  align-self: center;
  font-family: monospace;
  transition-timing-function: ease-in;
  transition: 0.5s;
  transform: translateX(calc(-0.15em * 3 - 0.08em * 2));
  &:hover {
    transform: translateX(1.15em);
  }
`;
