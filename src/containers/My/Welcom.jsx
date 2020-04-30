import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { upateWelcomeText } from '../../actions/user';

import Layout from '../../components/Layout';
import Cell from '../../components/Cell';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Toast from '../../components/Toast';
import Checkbox from 'components/Checkbox';

const CellGroup = styled.div`
  margin-top: 0.31rem;
`;

const StyledButton = styled(Button)`
  margin-top: 0.6rem;
`;

const Content = styled.div`
  padding: 0.2rem 0;
  line-height: 1.6;
`;

class Profile extends React.Component {
  static propTypes = {
    dispatch: propsType.func,
    history: propsType.object
  };

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.welcomeChat = this.getWelcomeValue(props);
  }

  getWelcomeValue(props) {
    if ('userInfo' in props) {
      const {
        userInfo: {
          bCard: { welcomeChat }
        }
      } = props;
      return welcomeChat;
    }
    return '';
  }

  showToast(message, onClose) {
    Toast.info(message, 1, onClose, false);
  }

  handleSaveClick = () => {
    this.props
      .dispatch(
        upateWelcomeText({
          welcome_chat: this.welcomeChat
        })
      )
      .then(action => {
        if (action.payload === 0) {
          this.showToast('保存成功', () => this.props.history.goBack());
        } else {
          this.showToast('保存失败');
        }
      });
  };

  handleInptChange = value => {
    this.welcomeChat = value;
  };

  handelReplyChange = checked => {

  };

  componentDidMount() {
    document.title = '设置欢迎语';
  }

  componentWillReceiveProps(nextProps) {
    if ('userInfo' in nextProps) {
      const {
        userInfo: {
          bCard: { welcomeChat }
        }
      } = nextProps;

      this.welcomeChat = welcomeChat;
    }
  }

  render() {
    if (!this.props.userInfo) {
      return <div />;
    }
    const {
      userInfo: {
        bCard: { welcomeChat }
      }
    } = this.props;

    const replys = [
      {
        title: '复制电话',
        checked: false
      },
      {
        title: '转发名片',
        checked: false
      },
      {
        title: '查看官网',
        checked: false
      },
      {
        title: '获取手机号',
        checked: false
      },
      {
        title: '保存到通讯录',
        checked: false
      },
      {
        title: '拨打电话',
        checked: false
      },
      {
        title: '加微信好友',
        checked: false
      },
      {
        title: '发送手机号码',
        checked: false
      }
    ];

    return (
      <div>
        <CellGroup>
          <Cell>
            <Input
              showCount
              type="textarea"
              placeholder="请输入欢迎语"
              value={welcomeChat}
              onChange={this.handleInptChange}
            />
          </Cell>
        </CellGroup>

        {/* <Cell.Group>
          <Cell title="回复模板" />
          <Cell>
            <Content>
              回复模板能在自动回复中增加跳转连接，以便咨询客户快捷操作与自助咨询
            </Content>
          </Cell>
          {replys.map((reply, key) => (
            <Cell
              key={key}
              title={reply.title}
              description={
                <Checkbox
                  checked={reply.checked}
                  onChange={this.handelReplyChange}
                />
              }
            />
          ))}
        </Cell.Group> */}

        <Layout>
          <StyledButton onClick={this.handleSaveClick}>保存</StyledButton>
        </Layout>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    user: { userInfo }
  } = state;

  return { userInfo };
}
export default connect(mapStateToProps)(withRouter(Profile));
