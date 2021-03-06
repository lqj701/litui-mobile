import React from 'react';
import propsType from 'prop-types';

import PullToRefresh from '../../../components/PullToRefresh';
import Item from './Item';

export default class GroupForward extends React.Component {
  static propTypes = {
    dataSource: propsType.any.isRequired,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data: this.getDateSouceProps(props),
      currentPage: 1,
    };
  }

  getDateSouceProps(props) {
    if ('dataSource' in props) {
      return props.dataSource.list;
    }

    return [];
  }

  render() {
    const { data } = this.state;

    return (
      <PullToRefresh>
        {data.map((value, key) => {
          const extra = [
            {
              name: '二次转发数',
              value: value.secondForwardCount,
            },
            {
              name: '分享人',
              value: value.sharingPerson,
            },
          ];
          return <Item key={key} title={value.groupName} extra={extra} />;
        })}
      </PullToRefresh>
    );
  }
}
