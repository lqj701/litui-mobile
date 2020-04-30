import React from 'react';
import propsType from 'prop-types';
import CustomerPie from './CustomerPie';

const CustomerGender = ({ dataSource }) => {
  const data = [];
  for (let i in dataSource) {
    let name = '未知';
    switch (i) {
    case 'man':
      name = '男';
      break;
    case 'woman':
      name = '女';
      break;
    default:
      name = '未知';
      break;
    }

    data.push({
      name,
      value: dataSource[i],
      icon: 'circle',
    });
  }

  return <CustomerPie title="性别分类" data={data} />;
};

CustomerGender.propTypes = {
  dataSource: propsType.any,
};

export default CustomerGender;
