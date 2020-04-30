import React from 'react';
import propsType from 'prop-types';

import CustomerBar from './CustomerBar';
import { CityList } from '../../../utils/city';

const CustomerArea = ({ dataSource }) => {

  const province = (p)=> {

    for(let i in CityList) {
      if(p === i) {
        return CityList[i].name;
      }
    }
  };


  let data = dataSource.map(value => {
    return {
      label: province(value.area),
      value: value.count,
      percent: 0,
    };
  });

  data = data.sort((a, b) => a.value < b.value);

  for (let i = 0; i < data.length; i++) {
    if(data[i].value) {
      data[i].percent = data[i].value / data[0].value * 50 / 1.25;
    } else {
      data[i].percent = 0;
    }
  }

  return <CustomerBar title="客户地区分析" subTitile="地区" dataSource={data} />;
};
CustomerArea.propTypes = {
  dataSource: propsType.any,
};

export default CustomerArea;
