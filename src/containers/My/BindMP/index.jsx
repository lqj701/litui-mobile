import React, { Component } from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  redPacketBind,
  redPacketUnBind,
  redPackethaveBinded,
} from '../../../actions/redpacket';
import { getCustomersOrderByCreateTimeAsc } from '../../../actions/customer';
import { searchCustomer } from '../../../actions/customer';

import SearchBar from '../../../components/Search';
import Toast from 'components/Toast';

import UnBind from './UnBind';
import Bind from './Bind';
import List from './List';
import SearchList from './SearchList';

import TabList from './TabList';

const ListWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 4rem;
  bottom: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
`;

class BindMP extends Component {
  state = {
    isBind: false,
    customer: null,
    customerId: null,
    keywords: '',
    isDisabled: false,

    searchCustomerId: null,
    listCustomerId: null,
  };

  isRender = false;

  componentDidMount() {
    document.title = '绑定小程序';

    this.isRender = true;

    this.props.dispatch(redPackethaveBinded()).then(action => {
      // console.error(action);
      const customer = action.payload.data;

      if (action.payload.code === 0) {
        if (!Object.keys(customer).length) {
          this.fetchCustomers();
          return;
        } else {
          const user = customer.customer;
          user.remark = customer.customerWxUser.remark;
          this.setState({ isBind: true, customer: user });
          this.fetchCustomers();
        }
      } else {
        this.fetchCustomers();
        return;
      }
    });
  }

  showToast(message, onClose) {
    Toast.info(message, 1, onClose, false);
  }

  fetchCustomers() {
    this.props.dispatch(
      getCustomersOrderByCreateTimeAsc({
        page: 1,
        row: 20,
      })
    );
  }

  actionResult(action, type) {
    // console.error(action);
    if (action.payload.code === 101108) {
      this.showToast('销售已绑定');
    } else if (action.payload.code === 101108) {
      this.showToast('客户已被绑定');
    } else {
      this.showToast('操作成功', () => {
        // setState
        if (type == 'unbind') {
          // todo: 如果已经加载过数据，使用缓存中的数据
          // this.fetchCustomers();
          window.location.reload();
          // this.setState({ isBind: false, customer: null });
        } else {
          this.setState({ isBind: true, customerId: null });
        }
      });
    }
  }

  handleUnBindChange = () => {
    const { customer } = this.state;
    this.props
      .dispatch(redPacketUnBind({ customer_id: customer.id }))
      .then(action => this.actionResult(action, 'unbind'));

    this.setState({ keywords: '' });
  };

  handleBindChange = state => {
    const { customer } = this.state;
    this.setState({ isDisabled: false });

    if (state === 1) {
      this.props
        .dispatch(redPacketBind({ customer_id: customer.id }))
        .then(action => this.actionResult(action, 'bind'));
    } else if (state === -1) {
      this.setState({ isDisabled: true });
    }
  };

  handleSearchChange = value => {
    const { userRoe } = window.AppConf;

    if (value) {
      this.props.dispatch(
        searchCustomer('0', {
          searchParam: value,
          page: 1,
          row: 50,
        })
      );
    } else {
      // this.fetchCustomers();
    }
    let isDisabled = false;
    this.setState({ keywords: value, isDisabled, customerId: null });
  };

  handleCheck = (id, customer) => {
    const { keywords } = this.props;

    if (keywords) {
      this.setState({
        searchCustomerId: id,
        customerId: id,
        customer: customer,
        isDisabled: true,
      });
    } else {
      this.setState({
        listCustomerId: id,
        customerId: id,
        customer: customer,
        isDisabled: true,
      });
    }
  };

  render() {
    let { dataSource, bindList, searchlist } = this.props;
    const { isBind, customer, keywords, isDisabled, customerId } = this.state;

    //目前发现这render2次
    if (!this.isRender) {
      return <div />;
    }

    return (
      <div>
        {isBind ? (
          <UnBind customer={customer} onChange={this.handleUnBindChange} />
        ) : (
          <Bind
            disabled={!isDisabled}
            customer={customer}
            onChange={this.handleBindChange}
            {...this.props}
          >
            <SearchBar
              hasCancel={false}
              defaultValue={keywords}
              onChange={this.handleSearchChange}
            />
            <TabList>
              <TabList.Panel value={0} active={keywords === ''}>
                <ListWrapper>
                  <List
                    keywords={keywords}
                    action={getCustomersOrderByCreateTimeAsc}
                    onCheck={this.handleCheck}
                    defaultValue={customerId}
                    dataSource={bindList}
                    {...this.props}
                  />
                </ListWrapper>
              </TabList.Panel>
              <TabList.Panel value={1} active={keywords !== ''}>
                <ListWrapper>
                  <SearchList
                    keywords={keywords}
                    action={searchCustomer}
                    onCheck={this.handleCheck}
                    currentPage={this.state.currentPage}
                    searchlist={searchlist}
                    defaultValue={customerId}
                    // dataSource={searchlist}
                    {...this.props}
                  />
                </ListWrapper>
              </TabList.Panel>
            </TabList>
          </Bind>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    customer: { bindList, searchlist, redPacket },
  } = state;

  return { dataSource: bindList, bindList, searchlist, redPacket };
}

export default connect(mapStateToProps)(BindMP);
