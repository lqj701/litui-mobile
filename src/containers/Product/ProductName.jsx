import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 0.34rem;
  color: #222;
`;

export default ({ children, ...other }) => (
  <Wrapper {...other}>{children}</Wrapper>
);
