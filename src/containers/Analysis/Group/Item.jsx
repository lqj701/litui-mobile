import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';
//
import Cell from '../../../components/Cell';

const StyledCell = styled(Cell)`
  padding: 0.4rem 0;
`;

const InfoBox = styled.div`
  flex: 1;
`;
const Title = styled.div`
  font-size: 0.32rem;
  color: #303030;
`;

const Row = styled.div`
  display: flex;
  padding: 0.08rem 0;
`;
const Col = styled.div`
  width: 30%;
`;

const Item = ({ title, extra }) => (
  <StyledCell>
    <InfoBox>
      <Title>{title}</Title>
      <Row>
        {extra &&
          extra.map((value, key) => {
            return <Col key={key}>{value.name}</Col>;
          })}
      </Row>
      <Row>
        {extra &&
          extra.map((value, key) => {
            return <Col key={key}>{value.value}</Col>;
          })}
      </Row>
    </InfoBox>
  </StyledCell>
);

export default Item;
