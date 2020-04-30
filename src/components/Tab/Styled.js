import styled, { css } from 'styled-components';

export const Wrapper = styled.div``;
export const Header = styled.div`
  position: relative;
`;
export const Line = styled('div')`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 0.04rem;
  transition: left 0.3s ease-out;

  background-color: #4A8CF2;
`;
export const Content = styled.div``;
export const Ul = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 0.9rem;
  line-height: 0.9rem;

  &:after {
    content: '';
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-width: 0;
    border-radius: 0;
    border-bottom: 0.02rem solid #ddd;

    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
      width: 200%;
      height: 200%;
      transform: scale(0.5);
      transform-origin: 0 0;
      border-radius: 0;
    }

    @media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 3dppx) {
      width: 300%;
      height: 300%;
      transform: scale(0.33333);
      transform-origin: 0 0;
      border-radius: 0;
    }
  }
`;
export const Li = styled('li')`
  flex: 1;
  text-align: center;
  color: #333;
  font-size: 0.3rem;
  cursor: pointer;

  ${({ active }) =>
    active &&
    css`
      color: #4A8CF2;
    `};

  ${({ disabled }) =>
    disabled &&
    css`
      color: #bbb;
      cursor: not-allowed;
    `};
`;
