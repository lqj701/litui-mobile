import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  followCustomer,
  getCustomerInfo,
  getCustomerInformations
} from '../../actions/customer';
import { generateUrl, enterCrm, getCrmUrl } from '../../actions/crm';
import { fetchCustomerImAccount } from '../../actions/chat';
import Toast from '../../components/Toast';
import ChatInput from '../../components/ChatInput';
import PullToRefresh from '../../components/PullToRefresh';

import CustomerDetailCard from './CustomerDetailCard';
import RevisitLog from '../Hawkeye/RevisitLog';
import Revisit from '../Hawkeye/Revisit';

import confirm from '../../components/Dialogs/Confirm';

const Wrapper = styled.div`
  height: 100%;
`;

const ScrollWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: ${({ top }) => top}rem;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-around;
  background: rgba(239, 239, 244, 1);
  padding: 0.16rem;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  box-shadow: 0 -1px 0 0 rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  border: 1px solid #4a8cf2;
  border-radius: 0.08rem;
  font-size: 0.28rem;
  color: #fff;
  outline: 0;
  height: 0.66rem;
  width: 1.84rem;
  background: #4a8cf2;
  ${({ grey }) =>
    grey &&
    `
    color: #000;
    border: 1px solid #fff;
    background: #fff;
  `};
`;

const status = {
  0: '操作成功',
  106801: '您不在励推的可用范围内，不可同步!',
  106802: '您不在CRM的可用范围内，不可同步!',
  106803: '您没有CRM的新增权限，不可同步!',
  106804: '您没有CRM的新增联系人权限，不可同步!',
  106805: '该客户未同步成功，是否重新同步!',
  106806: '您不在励推的可用范围内，不可访问!',
  106807: '您不在CRM的可用范围内，不可访问!',
  106808: '您没有该客户的数据权限，不可访问!',
  106811: '该客户已由其他人负责'
};

class CustomerDetail extends React.Component {
  static propTypes = {
    dispatch: propsType.func,
    history: propsType.object,
    match: propsType.object,
    customer: propsType.object,
    customerLog: propsType.object,
    currentUser: propsType.object,
    customerImAccount: propsType.object
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentPage: 1,
      scroll: null,
      pullingDown: false,
      isShowRevisitInput: false
    };
  }

  showToast(message, onClose) {
    Toast.info(message, 1, onClose, false);
  }

  sendMessage(content) {
    const { data } = this.state;
    const { currentUser } = this.props;

    const message = {
      name: '',
      avatar: currentUser.wxUser.avatar,
      message: content,
      direction: 'right'
    };

    data.unshift(message);

    this.setState({ data });
  }

  fixedScrollHeight() {
    const { customer } = this.props;
    let count = 0;

    if (!customer) {
      return 86;
    }

    if (customer.bindphone) {
      count += 1;
    }
    if (customer.company) {
      count += 1;
    }
    if (customer.phone1) {
      count += 1;
    }
    if (customer.phone2) {
      count += 1;
    }
    if (customer.weixinid) {
      count += 1;
    }
    if (customer.email) {
      count += 1;
    }
    if (customer.address) {
      count += 1;
    }
    if (customer.descr) {
      count += 1;
    }

    const height = ((count * 45 + 86) * 2) / 100;

    return height;
  }

  /**
   * 发送跟进消息
   * @param {string} event 消息内容
   */
  handleSendClick = message => {
    if (!message) {
      return;
    }

    const {
      match: {
        params: { id, wx_user_id }
      }
    } = this.props;
    this.sendMessage(message);

    const params = {
      customer_wx_user_id: id,
      wx_user_id,
      content: message
    };

    // 发送数据
    this.props.dispatch(followCustomer(params));
  };

  // handleChatClick = () => {
  //   const {
  //     match: {
  //       params: { id }
  //     }
  //   } = this.props;
  //   this.props.history.push(`/Chat/${id}`);
  // };

  componentDidMount() {
    document.title = '客户详情页';
    const {
      match: {
        params: { id, wx_user_id }
      }
    } = this.props;

    if (!wx_user_id || wx_user_id === 'undefined') {
      this.showToast('参数错误');
    }

    this.props
      .dispatch(
        getCustomerInfo({
          customer_wx_user_id: id
        })
      )
      .then(act => {
        // im 查询客户账号
        this.props.dispatch(
          fetchCustomerImAccount({
            orgId: AppConf.orgId,
            userIdOrOpenid: act.payload.openid
          })
        );
      });

    this.props.dispatch(
      getCustomerInformations({
        wxUserId: wx_user_id,
        customer_wx_user_id: id,
        goalsType: 0,
        page: 1,
        row: 50
      })
    );

    // crm
  }

  filterRevisitLogs(data) {
    return data.map((value, key) => {
      return {
        createdAt: value.information.sentAt,
        revisitLog: value.information.revisitLog,
        avatar: value.avatar,
        message: value.message,
        direction: value.information.goalsType ? 'right' : 'left',
        isShowTimer: key ? false : true
      };
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      'customerLog' in nextProps &&
      this.props.customerLog != nextProps.customerLog
    ) {
      let logs = this.filterRevisitLogs(nextProps.customerLog.informations);

      var i = 0;
      for (i; i < logs.length; i++) {
        for (var j = i; j < logs.length - 1; j++) {
          const interval = Math.abs(logs[i].createdAt - logs[j + 1].createdAt);

          // console.log('informations', i, j + 1, interval);
          if (interval >= 60000) {
            logs[j + 1].isShowTimer = true;
          } else {
            i = j + 1;
            logs[j + 1].isShowTimer = false;
            continue;
          }
        }
      }

      const { data, currentPage } = this.state;

      if (currentPage === 1) {
        this.setState({ data: logs, currentPage: currentPage + 1 });
      } else {
        this.setState({
          data: [...data, ...logs],
          currentPage: currentPage + 1
        });
      }
    }
  }

  pullDownRefresh = () => {
    const {
      match: {
        params: { id, wx_user_id }
      }
    } = this.props;

    this.setState({ currentPage: 1 });
    return this.props.dispatch(
      getCustomerInformations({
        wxUserId: wx_user_id,
        customer_wx_user_id: id,
        goalsType: 0,
        page: 1,
        row: 50
      })
    );
  };

  loadMoreData = () => {
    const {
      match: {
        params: { id, wx_user_id }
      }
    } = this.props;
    const { currentPage } = this.state;
    return this.props.dispatch(
      getCustomerInformations({
        wxUserId: wx_user_id,
        customer_wx_user_id: id,
        goalsType: 0,
        page: currentPage,
        row: 50
      })
    );
  };

  enterToCrm() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.props
      .dispatch(
        enterCrm({
          customerWxUserId: id
        })
      )
      .then(action => {
        const code = action.payload.code;
        if (code === 0) {
          this.goToCrm('', 1);
        } else {
          const params = {
            headerText: '提示',
            bodyText: status[code],
            onOkBtnClick: () => {
              // 同步失败，跳转到CRM新增页面
              if (code === 106805) {
                this.syncToCrm(0);
              }
            }
          };

          if (code !== 106805) {
            params.alert = true;
          }

          confirm(params);
        }
      });
  }

  // 同步到crm
  syncToCrm(crmPageType) {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.props.dispatch(generateUrl({ customerWxUserId: id })).then(action => {
      const code = action.payload.code;
      if (code === 0) {
        // 直接跳转到CRM详情页面
        this.goToCrm(action.payload.data, crmPageType);
      } else {
        confirm({
          alert,
          headerText: '提示',
          bodyText: status[code]
        });
      }
    });
  }

  /**
   *
   * @param {String} url crm需要请求的接口地址
   * @param {Number} pageType 跳转页面， 0 新增 1 详情
   */
  goToCrm(url, pageType = 0) {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.props
      .dispatch(
        getCrmUrl({
          type: 'new',
          customerWxUserId: id
        })
      )
      .then(action => {
        const _url = action.payload.data.url;
        const _id = action.payload.data.customerId;
        const hash = pageType
          ? `#customers/${_id}/sales_activities`
          : '#/shared/open_litui';

          // '#litui/customerNew';
        // #/shared/open_litui
        const api = window.btoa(url);
        window.location.href = `${_url}${hash}?api=${api}`;
        // console.error(`${_url}&api=${api}${hash}`);
      });
  }

  handleSyncClick = () => {
    const { customer } = this.props;

    if (customer.isSynchronized) {
      // 进入CRM
      this.enterToCrm();
    } else {
      // 同步到CRM
      this.syncToCrm(0);
    }
  };

  handleChatClick = () => {
    const { customerImAccount } = this.props;
    if (!customerImAccount.imAccount.accountId) return;
    this.props.history.push(`/Chat/${customerImAccount.imAccount.accountId}`);
  };

  handWriteButtonClick = () => {
    this.setState({ isShowRevisitInput: !this.state.isShowRevisitInput });
  };

  render() {
    const { data } = this.state;
    const { currentUser, customer, customerImAccount } = this.props;

    const fixTop = this.fixedScrollHeight();

    return (
      <Wrapper>
        {customer && (
          <CustomerDetailCard
            customerProfile={customer}
            currentUser={currentUser}
            imAccount={customerImAccount}
            onSyncClick={this.handleSyncClick}
          />
        )}

        <ScrollWrapper top={fixTop}>
          {/* {this.props.customerLog ? (
            <Revisit
              dataSource={this.props.customerLog.informations}
              {...this.props}
            />
          ) : null} */}
          <PullToRefresh
            pullDownRefresh={this.pullDownRefresh}
            pullUpLoad={this.loadMoreData}
          >
            <RevisitLog logs={data} />
          </PullToRefresh>
        </ScrollWrapper>

        {this.state.isShowRevisitInput && (
          <ChatInput
            style={{ bottom: '50px' }}
            text="跟进"
            onValueChange={this.handleSendClick}
          />
        )}

        <Flex>
          <Button grey onClick={this.handleChatClick}>
            发消息
          </Button>
          <Button onClick={this.handWriteButtonClick}>写跟进</Button>
        </Flex>
      </Wrapper>
    );
  }
}

function mapStateToProps(state, props) {
  const {
    customerDetail,
    revisit: { customerLog },
    user: { userInfo }
  } = state;

  return {
    customerLog,
    customer: customerDetail,
    currentUser: userInfo,
    customerImAccount: state.chat.customerImAccounts
  };
}
export default connect(mapStateToProps)(withRouter(CustomerDetail));
