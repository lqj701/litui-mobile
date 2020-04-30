import React, { Component } from 'react';
import Scroll from '../../components/Scroll';
import Cell from '../../components/Cell';

export default class Help extends Component {

  componentDidMount() {
    document.title = '用户手册';
  }

  openHelp(url){
    window.location.href = url;
  }

  render() {

    const data = [
      {
        id: 1,
        title: '在微信中使用企业微信中的励推',
        url: 'https://www.kancloud.cn/weiwenjia_litui/help/711887',
      },
      {
        id: 2,
        title: '创建并使用自己的名片',
        url: 'https://www.kancloud.cn/weiwenjia_litui/help/711888',
      },
      {
        id: 3,
        title: '进入小程序',
        url: 'https://www.kancloud.cn/weiwenjia_litui/help/711889',
      },
      {
        id: 4,
        title: '查看客户行为轨迹',
        url: 'https://www.kancloud.cn/weiwenjia_litui/help/711890',
      },
      {
        id: 5,
        title: '直接与客户聊天',
        url: 'https://www.kancloud.cn/weiwenjia_litui/help/711891',
      },

      {
        id: 6,
        title: '游客是什么',
        url: 'https://www.kancloud.cn/weiwenjia_litui/help/711892',
      },
      {
        id: 7,
        title: '默认名片是什么',
        url: 'https://www.kancloud.cn/weiwenjia_litui/help/711893',
      },
      {
        id: 8,
        title: '介绍公司产品',
        url: 'https://www.kancloud.cn/weiwenjia_litui/help/711894',
      },
      {
        id: 9,
        title: '商品和产品的区别',
        url: 'https://www.kancloud.cn/weiwenjia_litui/help/711895',
      },
      {
        id: 10,
        title: '介绍公司官网',
        url: 'https://www.kancloud.cn/weiwenjia_litui/help/711896',
      },
      {
        id: 11,
        title: '量化名片的传播价值',
        url: 'https://www.kancloud.cn/weiwenjia_litui/help/711897',
      },
    ];

    return (
      <Scroll>
        {data.map(value=>{
          return (
            <Cell 
              key={value.id} 
              hasArrow
              title={`${value.id}. ${value.title}`}
              onClick={()=>this.openHelp(value.url)}
            />
          );
        })}
      </Scroll>
    );
  }
}
