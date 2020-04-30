import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: block;
  min-height: 1.1rem;
`;

const Footer = ({ children, ...other }) => (
  <Wrapper {...other}>{children}</Wrapper>
);

export default Footer;
