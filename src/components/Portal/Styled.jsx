import styled from 'styled-components';

export const Wrapper = styled('div')`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 99;

  ${({ type }) => type && `background-color: transparent;`};
`;
