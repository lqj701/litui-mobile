import styled, { css } from 'styled-components';

export const Wrapper = styled('button')`
  display: inline-block;
  position: relative;
  padding: 0;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  transition: background-color 0.2s ease-out, border-color 0.2s ease-out;
  cursor: pointer;
  outline: 0 none;
  user-select: none;
  padding: 0 0.3rem;
  font-size: 0.36rem;
  height: 0.9rem;
  line-height: 0.9rem;
  background-color: #ddd;
  border: 1px solid #ddd;
  color: #333;
  border-radius: 0;

  width: 100%;
  display: block;

  background: #4a8cf2;
  color: #fff;
  border-radius: 5px;

  &:active {
    opacity: 0.7;
  }

  &.disabled,
  &[disabled] {
    background-color: #85ace8;
    color: hsla(0,0%,100%,.6);
  }

  ${({ color }) => {
    if (color === 'default') {
      return `background-color: #F8F8F8;
        border: 2px solid rgba(5,5,5,0.10);
        color: #000`;
    }
  }};
`;
