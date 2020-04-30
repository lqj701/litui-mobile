import React, { Component } from 'react';
import propsType from 'prop-types';

import Cell from 'components/Cell';
import Mutex from './Mutex';
import ListItem from './ListItem';

import PullToRefresh from 'components/PullToRefresh';

function ListContainer(WrappedComponent) {
  return class Hoc extends Component {
    constructor(props) {
      super(props);

      this.state = {
        currentPage: this.getCurrentPageProps(props),
        data: this.getDataSourecProps(props),
      };

      this.pullDown = false;
      this.pullUp = false;
    }

    getDataSourecProps(props) {
      if ('dataSource' in props) {
        return props.dataSource.list;
      }
      return [];
    }

    getCurrentPageProps(props) {
      if ('currentPage' in props) {
        return props.currentPage;
      }
      return 1;
    }

    static propTypes = {
      action: propsType.func,
      dispatch: propsType.func,
    };

    componentWillReceiveProps(nextProps) {
      if (
        'dataSource' in nextProps &&
        this.props.dataSource.list !== nextProps.dataSource.list
      ) {
        const { data, currentPage } = this.state;
        const { dataSource, pageSize, keywords } = nextProps;

        if (this.pullUp) {
          this.setState({
            data: [...data, ...dataSource.list],
            pageSize: pageSize,
            currentPage: currentPage + 1,
          });
          this.pullUp = false;
        } else {
          this.setState({
            data: dataSource.list,
            pageSize: pageSize,
            currentPage: currentPage + 1,
          });
        }

        // if (currentPage === 1) {
        //   this.setState({
        //     data: dataSource.list,
        //     pageSize: pageSize,
        //     currentPage: currentPage + 1,
        //   });
        // } else {
        //   this.setState({
        //     data: [...data, ...dataSource.list],
        //     pageSize: pageSize,
        //     currentPage: currentPage + 1,
        //   });
        // }
      }
    }

    pullDownRefresh = () => {
      this.pullDown = true;

      const { dispatch, action, keywords } = this.props;
      const { userRoe } = window.AppConf;

      this.setState({ currentPage: 1 });

      return dispatch(
        action('0', {
          searchParam: keywords,
          page: 1,
          row: 20,
        })
      );
    };

    loadMoreData = () => {
      this.pullUp = true;

      const { currentPage } = this.state;
      const { dispatch, action, keywords } = this.props;
      const { userRoe } = window.AppConf;

      return dispatch(
        action('0', {
          searchParam: keywords,
          page: currentPage,
          row: 20,
        })
      );
    };

    render() {
      const { data } = this.state;
      return (
        <PullToRefresh
          offset="0px"
          pullDownRefresh={this.pullDownRefresh}
          pullUpLoad={this.loadMoreData}
        >
          <WrappedComponent data={data} {...this.props} />
        </PullToRefresh>
      );
    }
  };
}

const List = ListContainer(({ data, onCheck, defaultValue }) => {
  /**
   * 客户列表选中事件
   * @param {Number} id 选择客户的id
   * @param {Array} data 客户列表
   */
  const handleMutexChange = (id, data) => {
    // 根据id找出对于客户信息
    const customers = data.filter(
      (customer, key) => customer.id === id - customer.wxUserId
    );
    // 回调
    onCheck && onCheck(customers[0].id, customers[0]);
  };

  return (
    <Cell.Group>
      <Mutex
        defaultValue={defaultValue}
        onChange={state => handleMutexChange(state, data)}
      >
        {data &&
          data.map((value, key) => {
            return (
              <ListItem
                key={value.id}
                data={value}
                value={value.id + value.wxUserId}
              />
            );
          })}
      </Mutex>
    </Cell.Group>
  );
});

List.propTypes = {
  data: propsType.array,
  onClick: propsType.func,
};

const SearchList = ({
  dataSource,
  searchlist,
  onCheck,
  action,
  dispatch,
  keywords,
  defaultValue,
}) => {
  if (!searchlist) {
    return (
      <div style={{ textAlign: 'center', marginTop: '0.4rem' }}>
        没有客户哦～
      </div>
    );
  }

  if (!searchlist.customerDtoList.length && searchlist.total === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '0.4rem' }}>
        没有客户哦～
      </div>
    );
  }

  const { customerDtoList } = searchlist;
  const list = customerDtoList;
  const data = { list: list };

  return (
    <List
      onCheck={onCheck}
      dataSource={data}
      action={action}
      dispatch={dispatch}
      keywords={keywords}
      defaultValue={defaultValue}
    />
  );
};

export default SearchList;
