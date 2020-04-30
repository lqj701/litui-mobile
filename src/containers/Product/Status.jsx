import React from 'react';
import styled from 'styled-components';

import NotBook from 'assets/svgs/icon-notbook.svg';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledNotBook = styled(NotBook)`
  width: 1.5rem;
`;

const Text = styled.div`
  font-size: 0.32rem;
  color: #999;
  padding-bottom: 0.5rem;
`;

function Status({ ...other }) {
  return (
    <Wrapper {...other}>
      <StyledNotBook />
      <Text>没有数据</Text>
    </Wrapper>
  );
}

export default Status;
