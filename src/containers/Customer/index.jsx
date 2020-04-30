import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getCustomersOrderByLastInfoTime,
  getCustomersOrderByCreateTime,
  listCustomer
} from '../../actions/customer';

import Spinner from 'core/components/Spinner';

import { Container } from '../../components/Layout';
import Icon from '../../components/Icon';
// import Picker from './Picker';
import Picker from '../../components/Picker';
import PullToRefresh from '../../components/PullToRefresh';

import List from './List';

const Tool = styled.div`
  display: flex;
  color: #333333;
  font-size: 0.28rem;
  margin: 0 0.3rem;
  padding: 0.2rem 0;
`;

const StyledList = styled.div`
  height: calc(100% - 0.7rem);
`;

const StyledSearch = styled.div`
  display: flex;
  align-items: center;
  color: #333333;
`;

export const ViewText = styled.div`
  color: rgb(136, 136, 136);
`;

export const Arrow = styled.span`
  margin-left: 5px;
  &:after {
    display: inline-block;
    content: '';
    border-right: 2px solid rgb(136, 136, 136);
    border-top: 2px solid rgb(136, 136, 136);
    width: 8px;
    height: 8px;
    transform: rotate(135deg);

    position: relative;
    top: -3px;
  }
`;

const View = ({ extra, onClick }) => {
  return (
    <ViewText onClick={onClick}>
      {extra} <Arrow />
    </ViewText>
  );
};

class CustomerPage extends React.Component {
  static propTypes = {
    dispatch: propsType.func,
    history: propsType.object,
    list: propsType.object,
    customers: propsType.object
  };

  static defaultProps = {};

  constructor() {
    super(...arguments);
    this.state = {
      pickerValue: [0],
      pickerData: [
        {
          label: '按情报时间',
          value: 0
        },
        {
          label: '按创建时间',
          value: 1
        },
        {
          label: '已同步到CRM',
          value: 2
        },
        {
          label: '未同步到CRM',
          value: 3
        }
      ],
      data: [],
      currentPage: 1
    };
  }

  handleSearchClick = () => {
    this.props.history.push('Customer/Search');
  };

  handelPickerChange = pickedNo => {
    const { byInfoTime, byCreateTime, bySyncTime, byUnSyncTime } = this.props;

    if (pickedNo[0] === 0) {
      byInfoTime();
    } else if (pickedNo[0] === 1) {
      byCreateTime();
    } else if (pickedNo[0] === 2) {
      bySyncTime();
    } else if (pickedNo[0] === 3) {
      byUnSyncTime();
    }

    this.setState({ pickerValue: pickedNo, data: [], currentPage: 1 });
  };

  pullDownFreshAction = () => {
    this.setState({ currentPage: 1 });
    const { pickerValue } = this.state;
    const { byInfoTime, byCreateTime, bySyncTime, byUnSyncTime } = this.props;

    if (pickerValue[0] === 0) {
      return byInfoTime();
    } else if (pickerValue[0] === 1) {
      return byCreateTime();
    } else if (pickerValue[0] === 2) {
      return bySyncTime();
    } else if (pickerValue[0] === 3) {
      return byUnSyncTime();
    }
  };

  loadMoreData = () => {
    const { pickerValue } = this.state;
    let { currentPage } = this.state;
    const { byInfoTime, byCreateTime, bySyncTime, byUnSyncTime } = this.props;

    if (pickerValue[0] === 0) {
      return byInfoTime(currentPage);
    } else if (pickerValue[0] === 1) {
      return byCreateTime(currentPage);
    } else if (pickerValue[0] === 2) {
      return bySyncTime(currentPage);
    } else if (pickerValue[0] === 3) {
      return byUnSyncTime(currentPage);
    }
  };

  componentDidMount() {
    document.title = '客户';
    const { byInfoTime } = this.props;
    byInfoTime();
  }

  componentWillReceiveProps(nextProps) {
    if (
      'customers' in nextProps &&
      this.props.customers !== nextProps.customers
    ) {
      const { currentPage, data } = this.state;
      const {
        customers: { customerDtoList }
      } = nextProps;

      if (currentPage === 1) {
        this.setState({
          data: [...customerDtoList],
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
    const { customers } = this.props;
    const { pickerData, pickerValue, data } = this.state;

    if (!customers) {
      return <Spinner />;
    }

    return (
      <Container>
        <Tool>
          {/* <Picker
            data={pickerData}
            value={pickerValue}
            onChange={this.handelPickerChange}
          /> */}
          <Picker
            data={pickerData}
            value={pickerValue}
            cols={1}
            extra="请选择"
            className="forss"
            onChange={this.handelPickerChange}
          >
            <View />
          </Picker>

          <span style={{ flex: '1 1 1e-09px' }} />
          <StyledSearch onClick={this.handleSearchClick}>
            <Icon type="search" style={{ marginRight: 10 }} /> 搜索
          </StyledSearch>
        </Tool>
        <StyledList>
          <PullToRefresh
            pullDownRefresh={this.pullDownFreshAction}
            pullUpLoad={this.loadMoreData}
          >
            {data && <List dataSource={data} />}
          </PullToRefresh>
        </StyledList>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  byInfoTime: (_page = 1, _row = 50) =>
    dispatch(
      listCustomer({
        page: _page,
        row: _row,
        orderBy: 'lastInfo'
      })
    ),
  byCreateTime: (_page = 1, _row = 50) =>
    dispatch(
      listCustomer({
        page: _page,
        row: _row,
        orderBy: 'createdAt'
      })
    ),
  bySyncTime: (_page = 1, _row = 50) =>
    dispatch(
      listCustomer({
        page: _page,
        row: _row,
        orderBy: 'synchronized_at',
        isSynchronized: true
      })
    ),
  byUnSyncTime: (_page = 1, _row = 50) =>
    dispatch(
      listCustomer({
        page: _page,
        row: _row,
        orderBy: 'lastInfo',
        isSynchronized: false
      })
    )
});

function mapStateToProps(state) {
  const {
    customer: { list }
  } = state;

  return {
    customers: list
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CustomerPage));
