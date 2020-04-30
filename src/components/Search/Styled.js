import styled from 'styled-components';

export const Wrapper = styled('div')`
  position: relative;
  display: flex;
  align-items: center;

  padding: 0.16rem 0.3rem;
`;

export const Action = styled('span')`
  font-size: 0.32rem;
  color: #4a8cf2;
  margin-left: 0.18rem;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  background: #ffffff;
  border: 1px solid #e6e6ea;
  border-radius: 0.1rem;
`;

export const Zoom = styled.div`
  width: 28px;
  height: 28px;
`;

export const Close = styled.div`
  width: 28px;
  height: 28px;
`;

export const Input = styled.input`
  padding: 0.15rem 0.1rem;

  font-size: 0.26rem;
  color: #333333;
  outline: none;
  flex: 1;
`;
