import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getUserInfo } from '../../actions/user';
import { withRouter } from 'react-router-dom';
import Spinner from 'core/components/Spinner';
import { Container } from '../../components/Layout';
import Scroll from '../../components/Scroll';
import Cell from '../../components/Cell';
import Icon from '../../components/Icon';
import UserBgImg from 'assets/images/bg-card2.png';

const Header = styled.div`
  position: relative;
  padding: 0.5rem 0.4rem;
  background: url('${UserBgImg}');
  background-size: cover;
  overflow: hidden;
`;

const Avator = styled.div`
  float: left;
  width: 2rem;
  height: 2rem;

  > img {
    width: 100%;
    height: 100%;
  }
`;

const Intro = styled.div`
  margin-left: 2.25rem;
  margin-right: 1.02rem;
`;

const Name = styled.div`
  font-size: 0.48rem;
  color: #fff;
  margin-bottom: 0.2rem;
`;

const Job = styled.div`
  font-size: 0.28rem;
  color: #fff;
  padding: 0.1rem 0;
  opacity: 0.8;
  min-height: 0.3rem;
`;

const Tel = Job.extend``;
const Company = Job.extend`
  overflow: hidden;
`;

const StyledIconEditor = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(236, 241, 254);
  width: 0.92rem;
  height: 0.92rem;
  text-align: center;
  border-radius: 50%;
  margin-bottom: 0.2rem;
`;

const Action = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 0.92rem;
`;

class MyPage extends React.Component {
  static propTypes = {
    dispatch: propsType.func,
    history: propsType.object,
    userInfo: propsType.object,
    currentUser: propsType.object,
  };

  static defaultProps = {};

  componentDidMount() {
    document.title = '名片';
    this.props.dispatch(getUserInfo());
  }

  render() {
    const { userInfo, currentUser } = this.props;

    if (!userInfo) {
      return <Spinner />;
    }

    const { wxUser, wxOrganization, bCard, websiteName } = userInfo;

    const data = [
      {
        name: '我的小程序名片',
        icon: 'xcx',
        url: `/My/Card/${currentUser.userToken}`,
      },
      {
        name: '个人介绍',
        icon: 'profile',
        url: '/My/Signature',
      },
      {
        name: '聊天欢迎语',
        icon: 'welcome',
        url: '/My/Welcom',
      },
      {
        name: '我的产品',
        icon: 'product',
        url: '/My/Product',
      },
      // {
      //   name: '绑定小程序',
      //   icon: 'link-mp',
      //   url: '/My/Bind/MP',
      // },
      {
        name: '帮助手册',
        icon: 'book',
        url: '/My/Help',
      },
    ];

    const setting = [
      {
        name: '系统设置',
        icon: 'setting',
        url: '/Setting',
      },
    ];

    const Setting = () =>
      currentUser.userRoe !== '0' && (
        <Cell.Group>
          {setting.map((value, key) => {
            return (
              <Cell
                key={key}
                hasArrow
                icon={<Icon type={value.icon} />}
                title={value.name}
                onClick={() => this.props.history.push(value.url)}
              />
            );
          })}
        </Cell.Group>
      );

    return (
      <Container>
        <Scroll offset="1.1rem">
          <Header>
            <Avator>
              <img src={wxUser.avatar} />
            </Avator>

            <Intro>
              <Name>{wxUser.name}</Name>
              <Job>{wxUser.position}</Job>
              <Company>{websiteName}</Company>
            </Intro>

            <Action>
              <StyledIconEditor
                onClick={() => this.props.history.push('/My/Profile')}
              >
                <Icon type="editor" />
              </StyledIconEditor>
              <Icon
                type="qcode"
                onClick={() =>
                  this.props.history.push('/My/Card/' + currentUser.userToken)
                }
              />
            </Action>
          </Header>

          <Cell.Group>
            {data.map((value, key) => {
              return (
                <Cell
                  key={key}
                  hasArrow
                  icon={<Icon type={value.icon} />}
                  title={value.name}
                  onClick={() => this.props.history.push(value.url)}
                />
              );
            })}
          </Cell.Group>

          <Setting />
        </Scroll>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const {
    user: { userInfo },
    currentUser,
  } = state;

  return { userInfo, currentUser };
}
export default connect(mapStateToProps)(withRouter(MyPage));
