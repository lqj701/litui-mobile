import React from 'react';
import { Container } from './Styled';

const LayoutContainer = ({ children, ...other }) => (
  <Container {...other}>{children}</Container>
);

export default LayoutContainer;
