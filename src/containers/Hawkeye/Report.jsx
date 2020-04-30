import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Card from '../../components/Card';
import { moneyFormatUnit } from 'utils/utils';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Num = styled.div`
  font-size: 0.36rem;
  color: #6f6f6f;
`;
const Text = styled.div`
  color: #999;
  font-size: 0.28rem;
`;

const ReportFlex = styled.div`
  display: flex;
  align-content: center;
  line-height: 0.56rem;
`;

const ReportRow = styled.div`
  flex: 50%;
`;
const ReportLine = styled.div`
  width: 0.02rem;
  background: #e5e5e5;
  margin: 0 0.34rem;
`;

const StyledCard = styled(Card)`
  margin-left: 0.3rem;
  margin-right: 0.3rem;
`;

const StyledMore = styled.div`
  text-align: center;
  margin-top: 0.2rem;

  > a {
    font-size: 0.28rem;
    color: #4a8cf2;
    text-decoration: none;
  }
`;

export class Report extends React.Component {
  static propTypes = {
    dataSource: propsType.any.isRequired,
  };

  static defaultProps = {
    dataSource: {},
  };

  render() {
    const { dataSource } = this.props;

    return (
      <StyledCard>
        <Wrapper>
          <ReportRow>
            <ReportFlex>
              <Text>今日新客户数</Text>
              <span style={{ flex: '1 1 1e-09px' }} />
              <Num>{moneyFormatUnit(dataSource.ctCount)}</Num>
            </ReportFlex>
            <ReportFlex>
              <Text>今日情报数</Text>
              <span style={{ flex: '1 1 1e-09px' }} />
              <Num>{moneyFormatUnit(dataSource.itCount)}</Num>
            </ReportFlex>
          </ReportRow>
          <ReportLine />
          <ReportRow>
            <ReportFlex>
              <Text>昨日新客户数</Text>
              <span style={{ flex: '1 1 1e-09px' }} />
              <Num>{moneyFormatUnit(dataSource.cyCount)}</Num>
            </ReportFlex>
            <ReportFlex>
              <Text>昨日情报数</Text>
              <span style={{ flex: '1 1 1e-09px' }} />
              <Num>{moneyFormatUnit(dataSource.iyCount)}</Num>
            </ReportFlex>
          </ReportRow>
        </Wrapper>
        <StyledMore>
          <Link to="/Analysis/Information">查看更多</Link>
        </StyledMore>
      </StyledCard>
    );
  }
}
