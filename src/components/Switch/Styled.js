import styled from 'styled-components';

export const Wrapper = styled.span``;

export const Input = styled.input`
  position: relative;
  outline: 0;
  -webkit-appearance: none;
  width: 0.95rem;
  height: 0.54rem;
  border: 1px solid #e5e5e5;
  border-radius: 1000px;
  background-color: #e5e5e5;
  vertical-align: middle;
  transition: background-color 0.1s, border 0.1s;
  padding: 0;
  margin: 0;

  &:before,
  &:after {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    height: 0.5rem;
    border-radius: 1000px;
  }

  &:before {
    width: 0.91rem;
    background-color: #fdfdfd;
    transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
  }

  &:after {
    width: 0.5rem;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
  }

  &:checked {
    border-color: #4a8cf2;
    background-color: #4a8cf2;
    &:before {
      transform: scale(0);
    }

    &:after {
      transform: translateX(20px);
    }
  }
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
