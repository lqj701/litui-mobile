import React from 'react';
import propsType from 'prop-types';

import PullToRefresh from '../../../components/PullToRefresh';
import Item from './Item';

export default class GroupCustomer extends React.Component {
  static propTypes = {
    dispath: propsType.any.isRequired,
    dataSource: propsType.any,
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

  pullUpLoadMore = () => {
    const { currentPage } = this.state;
    const { dispath } = this.props;
    return dispath(currentPage);
  };

  componentDidMount() {
    const { currentPage } = this.state;
    const { dispath } = this.props;
    // dispath(currentPage);
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    const { dataSource } = this.props;
    const { list } = dataSource;

    return (
      <PullToRefresh offset="2rem" pullUpLoad={this.pullUpLoadMore}>
        {list.map((value, key) => {
          const extra = [
            {
              name: '获客数',
              value: value.count,
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
