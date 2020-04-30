import React, { PureComponent } from 'react';
import PropsType from 'prop-types';
import styled from 'styled-components';

import Chart from './Charts';
import Cell from '../../../components/Cell';
import TagSelect from '../../../components/TagSelect';

const StyledCellGroup = styled.div`
  margin: 0 0 0.3rem;
  position: relative;
`;

const SyledSum = styled.div`
  position: absolute;
  right: 0.3rem;
  font-size: 0.2rem;
  color: #888;
`;

class CustomerLine extends PureComponent {
  constructor(props) {
    super(props);

    this.handleTagSelectChange = this.handleTagSelectChange.bind(this);
  }

  handleTagSelectChange(item) {
    const { onChange } = this.props;

    if (onChange) {
      onChange(item.id);
    }
  }

  render() {
    const { title, sum, data, xAxis } = this.props;

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
          rotate: 30,
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
        data: data,
      },
    };

    const list = [
      { id: '7day', name: '近7天' },
      { id: '15day', name: '近15天' },
      { id: '30day', name: '近30天' },
    ];

    return (
      <StyledCellGroup>
        <Cell>
          <span>{title}</span>
          <SyledSum>累计: {sum}</SyledSum>
        </Cell>
        <Cell>
          <div>
            <TagSelect list={list} onChangeItem={this.handleTagSelectChange} />
            <Chart option={option} />
          </div>
        </Cell>
      </StyledCellGroup>
    );
  }
}

CustomerLine.propTypes = {
  title: PropsType.string,
  data: PropsType.any,
  xAxis: PropsType.any,
  onChange: PropsType.func,
  sum: PropsType.number,
};

export default CustomerLine;
