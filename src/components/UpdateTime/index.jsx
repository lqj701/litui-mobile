import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
moment.locale('zh-cn');

const StyledTabPart = styled('div')`
  background: rgb(237, 236, 242);
  font-size: 0.26rem;
  color: #999999;
  height: 0.66rem;
  line-height: 0.66rem;
  padding-left: 0.3rem;
`;

const UpdateTime = ({ day }) => {
  return (
    <StyledTabPart>
      以下数据更新至{moment()
        .subtract(day, 'days')
        .format('YYYY-MM-DD')}
    </StyledTabPart>
  );
};

UpdateTime.defaultProps = {
  day: 1,
};

export default UpdateTime;
