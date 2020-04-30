import React from 'react';
import styled from 'styled-components';

import Cell from '../../../components/Cell';

const Content = styled.div`
  padding: 0.2rem 0;
  line-height: 1.6;
`;

const BindIntro = () => {
  return (
    <Cell.Group>
      <Cell title="绑定说明" />
      <Cell>
        <Content>
          绑定自己的微信，就可以用这个微信，在小程序中发红包吸引更多的客户点击咯！以下用户中没有你？请用微信扫描你的小程序码哦。
        </Content>
      </Cell>
    </Cell.Group>
  );
};

export default BindIntro;
