// import React from 'react';
// import propsType from 'prop-types';

// import Cell from 'components/Cell';
// import ListContainer from 'components/List/DynanicList';
// import Mutex from './Mutex';
// import ListItem from './ListItem';

// // const List = ListContainer(({ data, onCheck }) => {
// //   return (
// //     <Cell.Group style={{ paddingTop: 0 }}>
// //       <Mutex onChange={onCheck}>
// //         {data &&
// //           data.map((value, key) => {
// //             return <ListItem key={value.id} data={value} value={value} />;
// //           })}
// //       </Mutex>
// //     </Cell.Group>
// //   );
// // });

// // List.propTypes = {
// //   data: propsType.array,
// //   onClick: propsType.func,
// // };

// // const CustomerList = ({ dataSource, bindList, onCheck, ...other }) => {
// //   if (bindList) {
// //     dataSource.list = bindList.list;
// //     if(!bindList.list.length) {
// //       return <div style={{textAlign: 'center', marginTop: '0.4rem'}}>您还没有客户哦～</div>;
// //     }
// //   }

// //   return <List reset dataSource={dataSource} onCheck={onCheck} {...other} />;
// // };

// // export default CustomerList;

import React from 'react';
import propsType from 'prop-types';

import Cell from 'components/Cell';
import ListContainer from 'components/List/DynanicList';
import PullToRefresh from 'components/PullToRefresh';
import Mutex from './Mutex';
import ListItem from './ListItem';

// const List = ListContainer(({ data, onCheck }) => {
//   return (
//     <Cell.Group style={{ paddingTop: 0 }}>
//       <Mutex onChange={onCheck}>
//         {data &&
//           data.map((value, key) => {
//             return <ListItem key={key} data={value} value={value} />;
//           })}
//       </Mutex>
//     </Cell.Group>
//   );
// });

// List.propTypes = {
//   data: propsType.array,
//   onClick: propsType.func,
// };

// const CustomerList = ({ dataSource, bindList, onCheck, ...other }) => {
//   if (bindList) {
//     // dataSource.list = bindList.list;
//     if (!bindList.list.length) {
//       return (
//         <div style={{ textAlign: 'center', marginTop: '0.4rem' }}>
//           您还没有客户哦～
//         </div>
//       );
//     }
//   }

//   return <List dataSource={dataSource} onCheck={onCheck} {...other} />;
// };

class CustomerList extends React.Component {
  static propTypes = {
    dispatch: propsType.func,
    history: propsType.object,
    list: propsType.object,
    userProducts: propsType.object,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data: this.getDataProps(props),
      hasNext: this.getHasNextProps(props),
      currentPage: 2,
    };

    this.pullDown = false;
    this.pullUp = false;
  }

  getDataProps(props) {
    if ('bindList' in props && props.bindList.list) {
      return props.bindList.list;
    }
    return [];
  }

  getHasNextProps(props) {
    if ('bindList' in props && props.bindList.hasNext) {
      return props.bindList.hasNext;
    }
    return 0;
  }

  getCurrentPageProps(props) {
    if ('currentPage' in props && props.currentPage) {
      return props.currentPage;
    }
    return 1;
  }

  /**
   * 下拉刷新
   * @return {Promise} 返回dispatch
   */
  pullDownRefresh = () => {
    const { action } = this.props;
    return this.props.dispatch(
      action({
        page: 1,
        row: 20,
      })
    );
  };

  /**
   * 上拉加载
   * @return {Promise} 返回dispatch
   */
  loadMoreData = () => {
    this.pullUp = true;

    const { hasNext } = this.state;
    if (hasNext) {
      return this.fetchCustomers();
    }

    return Promise.resolve(true);
  };

  /**
   *
   * @return {Promise}
   *
   */
  fetchCustomers() {
    const { action } = this.props;
    let { currentPage } = this.state;
    return this.props.dispatch(
      action({
        page: currentPage,
        row: 20,
      })
    );
  }

  componentWillReceiveProps(nextProps) {
    if (
      'bindList' in nextProps &&
      this.props.bindList.list !== nextProps.bindList.list
    ) {
      let { data, currentPage } = this.state;
      const list = nextProps.bindList.list;
      const hasNext = nextProps.bindList.hasNext;

      if (nextProps.currentPage) {
        currentPage = nextProps.currentPage;
      }

      // console.error(nextProps.keywords);

      // if (this.pullUp) {
      //   this.setState({
      //     data: [...data, ...list],
      //     currentPage: currentPage + 1,
      //     hasNext: hasNext,
      //   });
      // } else {
      //   this.setState({
      //     data: list,
      //     currentPage: currentPage + 1,
      //     hasNext: hasNext,
      //   });
      // }

      if (currentPage === 1) {
        this.setState({
          data: list,
          currentPage: currentPage + 1,
          hasNext: hasNext,
        });
      } else {
        this.setState({
          data: [...data, ...list],
          currentPage: currentPage + 1,
          hasNext: hasNext,
        });
      }
    }
  }

  /**
   * 客户列表选中事件
   * @param {Number} id 选择客户的id
   * @param {Array} data 客户列表
   */
  handleMutexChange(index, data) {
    // 根据id找出对于客户信息
    const customers = data.filter((customer, key) => key === index - 1);
    // 回调
    this.props.onCheck && this.props.onCheck(index - 1, customers[0]);
  }

  render() {
    const { onCheck, defaultValue } = this.props;
    const { data } = this.state;

    return (
      <PullToRefresh
        offset="0px"
        pullDownRefresh={this.pullDownRefresh}
        pullUpLoad={this.loadMoreData}
      >
        <Cell.Group style={{ paddingTop: 0 }}>
          <Mutex
            defaultValue={defaultValue}
            onChange={state => this.handleMutexChange(state, data)}
          >
            {data.map((value, key) => {
              return <ListItem key={value.id} data={value} value={key + 1} />;
            })}
          </Mutex>
        </Cell.Group>
      </PullToRefresh>
    );
  }
}

export default CustomerList;
