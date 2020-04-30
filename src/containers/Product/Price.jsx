import React from 'react';
import styled from 'styled-components';
import propsType from 'prop-types';

const Wrapper = styled.div`
  padding: 0.08rem 0;
  font-size: 0.36rem;
  color: #eb0028;
`;

const Price = ({ value, uncertain, ...other }) => (
  <Wrapper {...other}>{uncertain ? '面议' : `¥${value / 100}`}</Wrapper>
);

Price.propTypes = {
  value: propsType.number.isRequired,
  uncertain: propsType.bool
};

export default Price;
