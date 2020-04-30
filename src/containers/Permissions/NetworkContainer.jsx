import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Banner from 'assets/images/network.png';

const Wrapper = styled.div`
  height: 100%;
  background: #fff;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  text-align: center;
`;

const Img = styled.img`
  padding-top: 20%;
  padding-bottom: 0.5rem;
`;

const Text = styled.div`
  font-size: 0.32rem;
  color: #ccc;
  text-align: center;
`;

const StyledButton = styled.button`
  background: #c3c7ce;
  color: #fff;
  border-radius: 16px;
  padding: 0.2rem 0.6rem;
  margin-top: 1rem;
  border: 0;
  outline: none;
`;

const StyledImgContainer = styled.div`
    height: 360px;
`;

export const NetworkContainer = () => (
  <Wrapper>
    <StyledImgContainer><Img src={Banner} width="100%" /></StyledImgContainer>
    <Text>无法连接到网络，请确认网络连接后再重试</Text>
    <StyledButton onClick={() => window.location.reload()}>
      点击重试
    </StyledButton>
  </Wrapper>
);

let container;

export function NetWorkExpect() {
  if (container) return;
  container = document.createElement('div');
  document.body.appendChild(container);
  ReactDOM.render(<NetworkContainer />, container);
}

export function hideNextWorkExpect() {
  if (!container) return;
  container.remove();
  container = null;
}
