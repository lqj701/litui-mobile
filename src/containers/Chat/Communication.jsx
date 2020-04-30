import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createChatCommunication,
  updateChatCommunication,
  appendChatCommunication,
  decreaseChatAllUnread,
  updateChatContacts,
  pushChatMsg,
  setChatMsgRead,
} from '../../actions/chat';
import styled from 'styled-components';

import PullToRefresh from '../../components/PullToRefresh';
import ChatInput from '../../components/ChatInput';

import Message from './Message';
import imsdk from '../../utils/imsdk';
import webim from '../../utils/imsdk/webim';
import { msgDateStr } from '../../utils/utils';
import find from 'lodash/find';

const Wrapper = styled.div`
  /* height: 100%; */
`;

const List = styled.div`
  position: fixed;
  left: 0.3rem;
  right: 0.3rem;
  top: 0;
  bottom: 1.1rem;
  overflow-y: auto;
  overflow-x: hidden;
`;

class Communicaton extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    createChatCommunication: PropTypes.func.isRequired,
    updateChatCommunication: PropTypes.func.isRequired,
    appendChatCommunication: PropTypes.func.isRequired,
    decreaseChatAllUnread: PropTypes.func.isRequired,
    updateChatContacts: PropTypes.func.isRequired,
    pushChatMsg: PropTypes.func.isRequired,
    setChatMsgRead: PropTypes.func.isRequired,
    msgs: PropTypes.array.isRequired,
    user: PropTypes.object,
    contact: PropTypes.object,
    imAccount: PropTypes.object,
    customerDetail: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      scroll: null,
      lastMsgTime: 0,
      msgKey: '',
      moreMsgs: true,
      msgCount: 0,
      msgs: [],
    };

    this.bindScroll = this.bindScroll.bind(this);
    this.pullDownFreshAction = this.pullDownFreshAction.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.fetchHistoryMsgs().then(msgs => {
      this.props.createChatCommunication({ id, msgs });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setMsgRead(nextProps);

    if (nextProps.msgs) {
      this.handleTimeFormat(nextProps.msgs, 15);
    }
  }

  handleTimeFormat(msgs, num) {
    const { msgCount } = this.state;
    const TIMERANGE = 1000 * 60;
    
    const len = msgs.length;
    const sendDatas = [];

    if (len > 0) {
      for (let i = len - 1; i >= 0; i--) {
        const currentItem = msgs[i];
        if (currentItem.dataSource === 'send') {
          sendDatas.unshift(currentItem);
        } else {
          break;
        }
      }
    }

    // 新发送的消息
    const sendLen = sendDatas.length;
    let sendCount = 0;
    if (sendLen > 0) {
      for (let i = 0; i < sendLen; i++) {
        const currentSendItem = sendDatas[i];

        if (sendLen === 1) {
          // 发送的消息个数只有一条
          currentSendItem._hideTime = false;
          currentSendItem._formatTime = msgDateStr(currentSendItem.lastTime);
          break;
        }

        // 最先发送的第一条消息
        if (i === 0) {
          const nextItem = sendDatas[i + 1];

          if (
            nextItem.lastTime - currentSendItem.lastTime < TIMERANGE &&
            sendCount < num
          ) {
            sendCount += 1;
          } else {
            sendCount = 1;
          }
          currentSendItem._hideTime = false;
        } else {
          const prevItem = sendDatas[i - 1];

          if (
            currentSendItem.lastTime - prevItem.lastTime < TIMERANGE &&
            sendCount < num
          ) {
            sendCount += 1;
            currentSendItem._hideTime = true;
          } else {
            sendCount = 1;
            currentSendItem._hideTime = false;
          }
        }

        currentSendItem._formatTime = msgDateStr(currentSendItem.lastTime);
      }
    }

    // 历史消息
    let count = msgCount;
    if (len - sendLen > 0) {
      for (let i = len - sendLen - 1; i >= 0; i--) {
        const currentItem = msgs[i];

        if (i === 0) {
          if (len === 1) {
            count = 0;
            currentItem._hideTime = false;
            currentItem._formatTime = msgDateStr(currentItem.lastTime);
            break;
          }

          const nextItem = msgs[i + 1];
          if (
            nextItem.lastTime - currentItem.lastTime < TIMERANGE &&
            count < num
          ) {
            count += 1;
          } else {
            count = 0;
          }

          currentItem._hideTime = false;
          currentItem._formatTime = msgDateStr(currentItem.lastTime);
          break;
        } else {
          const prevItem = msgs[i - 1];

          if (
            currentItem.lastTime - prevItem.lastTime < TIMERANGE &&
            count < num
          ) {
            currentItem._hideTime = true;
            count += 1;
          } else {
            currentItem._hideTime = false;
            count = 0;
          }
          currentItem._formatTime = msgDateStr(currentItem.lastTime);
        }
      }
    }

    this.setState({ msgs, msgCount: count });
  }

  // 消息已读上报
  setMsgRead(props) {
    const { msgs } = props;
    if (!msgs.length) return; // 没有消息时不需要上报

    const lastMsg = msgs[msgs.length - 1];
    const lastMsgRandom = lastMsg.random;
    if (this.lastMsgRandom === lastMsgRandom) return; // 最后一条消息与之前的消息一样时不需要上报
    this.lastMsgRandom = lastMsgRandom;

    // 有新消息后需要 refresh scroll 并滚动到最后一条消息
    const { scroll } = this.state;

    setTimeout(() => {
      scroll.refresh();
      scroll.scrollTo(0, scroll.maxScrollY);
    }, 16);

    const { contact } = props;
    if (contact.unread === 0) return; // 未读消息为 0 时不需要上报

    const { id } = props.match.params;
    this.props.updateChatContacts({ toAccount: id, unread: 0 }); // 更新 contact 未读数
    this.props.decreaseChatAllUnread(contact.unread); // 更新消息总未读数
    const msgSess = webim.MsgStore.sessByTypeId(webim.SESSION_TYPE.C2C, id);
    webim.setAutoRead(msgSess, true, true); // 上报给腾讯 IM
    this.props.setChatMsgRead({ msgSeq: lastMsgRandom }); // 上报给我们自己
  }

  bindScroll(scroll) {
    this.setState({ scroll });
  }

  handleMsgs(msgs) {
    const {
      contact,
      imAccount,
      match: { params },
    } = this.props;
    const { id } = params;

    return msgs.map(item => {
      let avatar;
      let direction;
      let name;

      if (item.fromAccount === id) {
        avatar = contact.toAccountAvatar;
        direction = 'left';
        name = contact.toAccountNick;
      } else {
        avatar = imAccount.faceUrl;
        direction = 'right';
        name = imAccount.nikeName;
      }

      return {
        dataSource: 'history',
        random: item.random,
        message: item.elems[0].content.text,
        lastTime: item.time * 1000,
        avator: avatar,
        direction,
        name,
        wx_user_id: imAccount.accountId,
        customer_id: id,
      };
    });
  }

  fetchHistoryMsgs() {
    const toId = this.props.match.params.id;
    const { lastMsgTime, msgKey } = this.state;

    return imsdk
      .getLastC2CHistoryMsgs({ toId, lastMsgTime, msgKey })
      .then(resp => {
        this.setState({
          lastMsgTime: resp.LastMsgTime,
          msgKey: resp.MsgKey,
          moreMsgs: resp.Complete === 0,
        });

        return this.handleMsgs(resp.MsgList);
      });
  }

  pullDownFreshAction() {
    if (!this.state.moreMsgs) return Promise.resolve(true);
    const id = this.props.match.params.id;
    const { scroll } = this.state;

    return this.fetchHistoryMsgs().then(msgs => {
      const beforeMaxScrollY = scroll.maxScrollY;

      this.props.appendChatCommunication({ id, msgs });
      scroll.refresh();

      const afterMaxScrollY = scroll.maxScrollY;

      scroll.scrollTo(0, afterMaxScrollY - beforeMaxScrollY + 60);
    });
  }

  sendMessage(content) {
    if (!content) return;

    const { id } = this.props.match.params;
    const { imAccount, contact, customerDetail } = this.props;
    const random = Math.round(Math.random() * 4294967296);
    const msgTime = Math.round(new Date().getTime() / 1000);

    const msg = {
      random,
      name: '',
      avator: imAccount.faceUrl,
      message: content,
      direction: 'right',
      lastTime: msgTime * 1000,
      dataSource: 'send',
      wx_user_id: imAccount.accountId,
      customer_id: id,
    };

    imsdk.sendCommonMsg({ toId: id, random, msgTime, content });
    this.props.updateChatCommunication({ id, msg });

    const contactOpts = {
      toAccount: id,
      unread: 0,
      lastMsg: content,
      lastMsgTime: msg.lastTime,
    };

    if (!contact) {
      contactOpts.toAccountAvatar = customerDetail.avatarUrl;
      contactOpts.toAccountNick = customerDetail.nickname;
    }

    this.props.updateChatContacts(contactOpts);

    this.props.pushChatMsg({
      from_account_id: imAccount.accountId,
      to_account_id: id,
      msg_seq: random,
      msg_send: msg.lastTime,
      content,
    });
  }

  handleSendClick = value => {
    this.sendMessage(value);
  };

  render() {
    const { msgs } = this.state;

    return (
      <Wrapper>
        <List>
          <PullToRefresh
            offset="0px"
            pullDownRefresh={this.pullDownFreshAction}
            bindScroll={this.bindScroll}
          >
            {msgs.map(item => {
              return (
                <Message
                  key={item.random}
                  avator={item.avator}
                  dateStr={item._formatTime}
                  direction={item.direction}
                  hideTime={item._hideTime}
                  wxUserId={item.wx_user_id}
                  customerId={item.customer_id}
                >
                  {item.message}
                </Message>
              );
            })}
          </PullToRefresh>
        </List>

        <ChatInput onValueChange={this.handleSendClick} />
      </Wrapper>
    );
  }
}

function mapStateToProps(state, { match }) {
  return {
    msgs: state.chat.communication[match.params.id] || [],
    contact: find(state.chat.contacts, { toAccount: match.params.id }),
    imAccount: state.chat.imAccount,
    user: state.user.userInfo.wxUser,
    customerDetail: state.customerDetail,
  };
}
export default connect(mapStateToProps, {
  createChatCommunication,
  updateChatCommunication,
  appendChatCommunication,
  decreaseChatAllUnread,
  updateChatContacts,
  pushChatMsg,
  setChatMsgRead,
})(Communicaton);
