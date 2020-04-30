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

const LimitContainer = () => (
  <Wrapper>
    <Img src={Banner} width="100%" />
    <Text>超出使用工号上限，</Text>
    <Text>请联系你的管理员升级系统版本。</Text>
  </Wrapper>
);

export default LimitContainer;
