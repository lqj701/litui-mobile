import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: inline-block;
  position: relative;
  margin-left: 10px;
  &:first-child {
    margin-left: 0;
  }
`;
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Inner = styled('span')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 1px solid #999;
  border-radius: 50%;
  background: #fff;

  width: 0.55rem;
  height: 0.55rem;

  &:before {
    content: ' ';
    width: 5.71429px;
    height: 10px;
    border: 2px solid #4A8CF2;
    border-top: 0;
    border-left: 0;
    margin-top: -2px;
    transform: rotate(45deg) scale(0);
    transition: all 0.2s cubic-bezier(0.71, -0.46, 0.88, 0.6);

    width: 0.1442rem;
    height: 0.3rem;
    margin-top:-0.04rem;
  }

  ${({ checked }) =>
    checked &&
    css`
      border-color: #4A8CF2;
      &:before {
        transform: rotate(45deg) scale(1);
        transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
      }
    `};
  ${({ disabled }) =>
    disabled &&
    css`
      border-color: #bbb;
      cursor: not-allowed;

      &:before {
        border-color: #bbb;
      }
    `};
`;

export const Input = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  margin: 0;
`;

export const Text = styled('span')`
  color: ${props => (props.disabled ? ` #bbb;` : '#333')};
  margin-left: 10px;
  margin-left: 0.2rem;
`;
