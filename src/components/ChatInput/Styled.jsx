import styled from 'styled-components';

export const Wrapper = styled.div`
  background: rgba(239, 239, 244, 1);
  height: 1rem;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  box-shadow: 0 -1px 0 0 rgba(0, 0, 0, 0.1);
  padding: 0 0.3rem;
  z-index: 20;
`;

export const Input = styled.input`
  background: #fdfdfe;
  border: 1px solid #b4b6ba;
  border-radius: 0.08rem;
  height: 0.72rem;
  flex: 1;
  outline: 0;
  font-size: 0.32rem;
  padding: 0 0.15rem;
`;

export const Button = styled.button`
  background: #f4f4f4;
  border: 1px solid #b4b6ba;
  border-radius: 0.08rem;
  opacity: 0.85;
  font-family: PingFangSC-Regular;
  font-size: 0.28rem;
  color: #000000;
  outline: 0;
  margin-left: 0.2rem;
  height: 0.72rem;
  width: 1.36rem;

  &:active {
    opacity: 0.5;
  }
`;
