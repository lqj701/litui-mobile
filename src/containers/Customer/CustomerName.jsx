import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 0.34rem;
  padding: 0.08rem 0;
`;

export default ({ children }) => <Wrapper>{children}</Wrapper>;
