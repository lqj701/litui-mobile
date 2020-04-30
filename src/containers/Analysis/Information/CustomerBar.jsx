import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';
//
import Cell from '../../../components/Cell';

const StyledCellGroup = styled.div`
  margin: 0 0 0.3rem;
`;

const Bar = styled.div`
  background: #4a8cf2;
  border-radius: 4px;
  height: 100%;
  height: 0.4rem; // iphone5s
`;

const Label = styled.div`
  flex: 0 0 30%;
`;

const Value = styled.div`
  flex: 0 0 20%;
`;

const getTotal = dataSource => {
  let total = 0;
  dataSource.forEach(value => {
    total += value.value;
  });

  return total;
};

const CustomerBar = ({ dataSource, title, subTitile }) => {
  return (
    <StyledCellGroup>
      <Cell title={title} description={`累计：${getTotal(dataSource)}`} />

      <Cell>
        <Label>{subTitile}类型</Label>
        <Value>数量</Value>
      </Cell>
      {dataSource.map((value, key) => {
        return (
          <Cell key={key}>
            <Label>{value.label}</Label>
            <Value>{value.value}</Value>
            <Bar style={{ width: `${value.percent}%` }} />
          </Cell>
        );
      })}
    </StyledCellGroup>
  );
};

CustomerBar.propTypes = {
  dataSource: propsType.any.isRequired,
  title: propsType.string.isRequired,
  subTitile: propsType.string.isRequired,
};

export default CustomerBar;
