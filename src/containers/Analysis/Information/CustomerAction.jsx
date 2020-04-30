import React from 'react';
import propsType from 'prop-types';

import CustomerBar from './CustomerBar';

function sortBy(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j].value < arr[j + 1].value) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

const CustomerAction = ({ dataSource }) => {
  let _data = [
    { label: '查看名片', value: dataSource.seeCard, percent: 0 },
    {
      label: '点赞名片',
      value: dataSource.supportCard,
      percent: 0,
    },
    {
      label: '查看产品',
      value: dataSource.seeProduct,
      percent: 0,
    },
    { label: '拨打电话', value: dataSource.copyPhone, percent: 0 },
    { label: '复制微信号', value: dataSource.copyWechat, percent: 0 },
    { label: '查看官网', value: dataSource.seeHomeWebsite, percent: 0 },
    { label: '点赞产品', value: dataSource.supportProduct, percent: 0 },
    { label: '转发名片', value: dataSource.forwardCard, percent: 0 },
    { label: '转发产品', value: dataSource.forwardProduct, percent: 0 },
    { label: '保存到通讯录', value: dataSource.holdMailList, percent: 0 },
    { label: '查看商品', value: dataSource.readEcproduct, percent: 0 },
    { label: '商品成交', value: dataSource.buyEcproduct, percent: 0 },
  ];

  // 有兼容问题
  // data = data.sort((a, b) => a.value < b.value);
  let data = sortBy(_data);

  for (let i = 0; i < data.length; i++) {
    if (data[i].value) {
      data[i].percent = data[i].value / data[0].value * 50 / 1.25;
    } else {
      data[i].percent = 0;
    }
  }

  return (
    <CustomerBar title="客户行为分析" subTitile="情报" dataSource={data} />
  );
};
CustomerAction.propTypes = {
  dataSource: propsType.any,
};

export default CustomerAction;
