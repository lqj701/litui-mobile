import React from 'react';
import propsType from 'prop-types';
import CustomerPie from './CustomerPie';

function CustomerInterest({ dataSource }) {
  const data = dataSource.map(value => {
    let name = '';
    if (value.type === 'card') {
      name = '对我感兴趣';
    } else if (value.type === 'prod') {
      name = '对产品感兴趣';
    } else {
      name = '对公司感兴趣';
    }
    return {
      value: value.count,
      name: name,
      icon: 'circle',
    };
  });

  return <CustomerPie title="客户偏好分析" data={data} />;
}

CustomerInterest.propTypes = {
  dataSource: propsType.any,
};

export default CustomerInterest;
