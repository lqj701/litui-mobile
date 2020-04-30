import React from 'react';
import styled from 'styled-components';

import Banner from 'assets/images/banner1.png';

const Wrapper = styled.div`
  height: 100%;
  background: #fff;
`;

const Img = styled.img`
  padding-top: 20%;
  padding-bottom: 0.5rem;
`;

const Text = styled.div`
  font-size: 0.32rem;
  color: #333333;
  text-align: center;
`;

const Tel = Text.extend`
  color: #3e82f7;
  > a {
    color: #3e82f7;
    text-decoration: none;
  }
`;

const AccountContainer = () => (
  <Wrapper>
    <Img src={Banner} width="100%" />
    <Text>账号已过期，请联系客服。</Text>
    <Tel><a href="tel:400-867-1101">400-867-1101</a></Tel>
  </Wrapper>
);

export default AccountContainer;
