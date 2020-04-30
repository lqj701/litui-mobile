import React from 'react';
import styled from 'styled-components';
import propsType from 'prop-types';

import Cell from '../../../components/Cell';

const Content = styled.div`
  padding: 0.2rem 0;
  text-align: center;
  width: 100%;
`;

const StyledImg = styled.img`
  width: 1rem;
  height: 1rem;
`;

const TextCenter = styled.div`
  text-align: center;
  padding-top: 0.1rem;
`;

const BindUser = ({ avatar, name }) => {
  return (
    <Cell.Group>
      <Cell>已绑定以下微信：</Cell>
      <Cell>
        <Content>
          <StyledImg src={avatar} />
          <TextCenter>{name}</TextCenter>
        </Content>
      </Cell>
    </Cell.Group>
  );
};

BindUser.propTypes = {
  avatar: propsType.string,
  name: propsType.string,
};

export default BindUser;
