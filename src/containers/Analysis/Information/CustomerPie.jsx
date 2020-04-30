import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';
import Cell from '../../../components/Cell';
import Chart from './Charts';

const StyledCellGroup = styled.div`
  margin: 0 0 0.3rem;
`;

const StyledCellChart = styled(Cell)`
  padding-bottom: 0.4rem;
`;

const NoData = ({ data, title }) => {
  const option = {
    color: ['#ddd', '#ddd', '#ddd'],
    legend: {
      x: 'center',
      y: 'bottom',
      data: data,
    },
    series: [
      {
        type: 'pie',
        radius: ['30%', '46%'],
        label: {
          data: data,
          formatter: _data => {
            return _data.percent + '%';
          },
        },
        markPoint: {
          symbol: 'circle',
        },
        data: data,
      },
    ],
  };

  return (
    <StyledCellGroup>
      <Cell title={title} />
      <StyledCellChart>
        <Chart option={option} />
      </StyledCellChart>
    </StyledCellGroup>
  );
};

const CustomerGender = ({ data, title }) => {
  const value = data.filter(v => v.value === 0).length;
  if (value >= 3) {
    return <NoData data={data} title={title} />;
  }

  const option = {
    color: ['#02A9F3', '#02C579', '#9988FF'],
    legend: {
      x: 'center',
      y: 'bottom',
      data: data,
    },
    series: [
      {
        type: 'pie',
        radius: ['30%', '46%'],
        label: {
          data: data,
          formatter: _data => {
            return _data.percent + '%';
          },
        },
        markPoint: {
          symbol: 'circle',
        },
        data: data,
      },
    ],
  };

  return (
    <StyledCellGroup>
      <Cell title={title} />
      <StyledCellChart>
        <Chart option={option} />
      </StyledCellChart>
    </StyledCellGroup>
  );
};

CustomerGender.propTypes = {
  title: propsType.any,
  data: propsType.any,
};

export default CustomerGender;
