import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';
import TagDate from './TagDate';
import Chart from './Charts';
//
import Cell from '../../../components/Cell';

const StyledCellGroup = styled.div`
  margin: 0.15rem 0;
`;

export default class NewCustomers extends React.Component {
  constructor(props) {
    super(props);
    this.dataSource = props.dataSource;
  }

  render() {

    const xAxis = this.dataSource.map((value) => {
      return value.day;
    });

    const series = this.dataSource.map((value) => {
      return value.num;
    });

    const option = {
      color: '#4A8CF2',
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#C4C5C9',
        },
        data: xAxis,
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#C4C5C9',
          margin: 16,
        },
        nameTextStyle: {
          color: '#C4C5C9',
        },
      },
      series: {
        type: 'line',
        lineStyle: {
          color: '#4A8CF2',
        },
        areaStyle: {
          color: '#4a8cf23d',
        },
        symbolSize: 0.1,
        label: {
          show: true,
          position: 'top',
          color: '#303030',
        },
        data: series,
      },
    };

    return (
      <StyledCellGroup>
        <Cell title="新增客户数" />
        <Cell>
          <TagDate />
        </Cell>
        <Cell>
          <Chart option={option} opts={{width: 'auto',height: 'auto'}} />
        </Cell>
      </StyledCellGroup>
    );
  }
}

NewCustomers.propTypes = {
  dataSource: propsType.array.isRequired,
};

