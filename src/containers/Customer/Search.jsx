import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { searchCustomer } from '../../actions/customer';
import { updateCustomerSearchKeyWord } from '../../actions/syncStateStore';
import { withRouter } from 'react-router-dom';

import { Container } from '../../components/Layout';
import SearchBar from '../../components/Search';
import PullToRefresh from '../../components/PullToRefresh';
import List from './List';

const StyledList = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 1rem;
  overflow: scroll;
`;

class SearchPage extends React.Component {
  static propTypes = {
    dispatch: propsType.func,
    history: propsType.object,
    match: propsType.object,
    customers: propsType.any,
    currentUser: propsType.any,
    searchKeyWord: propsType.string
  };

  static defaultProps = {};

  timer;

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      currentPage: 1,
      pageSize: 0,
      keyWord: props.searchKeyWord // 搜索关键字
    };
  }

  componentDidMount() {
    const { customers, searchKeyWord } = this.props;
    if (customers) {
      this.setState({ data: customers.customerDtoList });
    }
  }

  /**
   * 搜索事件
   * @param {string} keyWord 关键字
   */
  handleSearchChange = keyWord => {
    const {
      currentUser: { userRoe },
      dispatch
    } = this.props;

    this.debounce(() => {
      this.fetchCustomers(keyWord, userRoe).then(() =>
        dispatch(updateCustomerSearchKeyWord(keyWord))
      );
    });

    // 清除上次搜索结果
    this.setState({ data: [], currentPage: 1, keyWord });
  };

  debounce(fn) {
    window.clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      fn();
    }, 500);
  }

  handleSearchCancel = () => {
    this.props.history.goBack();
  };

  /**
   * 获取客户列表
   * @param {Array} searchParam 搜索关键字
   * @param {String} userRole 0普通/1超管
   * @return {Promise}
   *
   */
  fetchCustomers(keyword, userRole) {
    let { currentPage } = this.state;

    return this.props.dispatch(
      searchCustomer(userRole, {
        page: currentPage,
        row: 20,
        keyword
      })
    );
  }

  /**
   * 下拉刷新
   * @return {Promise} 返回dispatch
   */
  pullDownRefresh = () => {
    this.setState({ currentPage: 1 });

    const {
      currentUser: { userRoe }
    } = this.props;

    const { keyWord } = this.state;
    return this.fetchCustomers(keyWord, userRoe);
  };

  /**
   * 上拉加载
   * @return {Promise} 返回dispatch
   */
  loadMoreData = () => {
    const { hasNext, keyWord } = this.state;
    const {
      currentUser: { userRoe }
    } = this.props;

    // if (hasNext) {
    return this.fetchCustomers(keyWord, userRoe);
    // }

    // return Promise.resolve(true);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.customers !== this.props.customers) {
      const { currentPage, data } = this.state;
      const {
        customers: { customerDtoList }
      } = nextProps;

      if (currentPage === 1) {
        this.setState({
          data: customerDtoList,
          currentPage: currentPage + 1
        });
      } else {
        this.setState({
          data: [...data, ...customerDtoList],
          currentPage: currentPage + 1
        });
      }
    }
  }

  render() {
    const { data, keyWord } = this.state;

    return (
      <Container>
        <SearchBar
          placeholder="请输入所搜内容"
          defaultValue={keyWord}
          onChange={this.handleSearchChange}
          onCancel={this.handleSearchCancel}
        />
        <StyledList>
          <PullToRefresh
            offset="0px"
            pullDownRefresh={this.pullDownRefresh}
            pullUpLoad={this.loadMoreData}
          >
            {data && <List dataSource={data} />}
          </PullToRefresh>
        </StyledList>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const {
    customer: { searchlist },
    currentUser,
    syncStateStore: {
      customer: { searchKeyWord }
    }
  } = state;

  return {
    customers: searchlist,
    currentUser,
    searchKeyWord
  };
}
export default connect(mapStateToProps)(withRouter(SearchPage));
