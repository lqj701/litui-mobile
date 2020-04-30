import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getWxUser } from '../../actions/user';
import { withRouter } from 'react-router-dom';
import Spinner from 'core/components/Spinner';

import { getWxUserQrcode } from '../../actions/user';
import Cell from '../../components/Cell';
import Icon from '../../components/Icon';
import UserBgImg from 'assets/images/bg-card2.png';

import UserCard from './UserCard';

const Wrapper = styled.div`
  height: 100%;
`;

const FlexLayout = styled.div`
  display: flex;
`;

const Header = FlexLayout.extend`
  padding: 0.5rem 0.4rem;
  background: url('${UserBgImg}');
  background-size: cover;
`;

const Avator = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 0.58rem;
  overflow: hidden;

  > img {
    width: 100%;
    height: 100%;
  }
`;

const Intro = styled.div`
  flex: 1;
`;

const Name = styled.div`
  font-size: 0.48rem;
  color: #fff;
  margin-bottom: 0.2rem;
`;

const Job = styled.div`
  font-size: 0.28rem;
  color: #fff;
`;

const Mobile = styled.a`
  color: #000;
  text-decoration: none;
  &:active,
  &:hover {
    color: #00;
  }
`;

const Tel = Job.extend``;
const Company = Job.extend``;

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCard: false,
    };
  }

  componentDidMount() {
    this.props
      .dispatch(
        getWxUser({
          wxUserId: this.props.match.params.id,
        })
      )
      .then(action => {
        // console.error(action.payload);
        const { wxUser, salesToken } = action.payload;

        this.props.dispatch(
          getWxUserQrcode(wxUser.wxOrganizationId, salesToken)
        );
      });

    document.title = '用户列表';
  }

  handleClick = () => {
    this.setState({
      isCard: !this.isCard,
    });
  };

  render() {
    const { wxUser, conf, qrcode } = this.props;
    const { isCard } = this.state;

    if (!wxUser) {
      return <Spinner />;
    }

    const user = wxUser.wxUser;

    const dataSource = {
      name: user.name,
      position: user.position,
      phone1: user.phone1,
      avatar: user.avatar,
      company: wxUser.corpName,
      qcode: qrcode,
    };

    return (
      <Wrapper>
        {isCard && (
          <UserCard
            name={dataSource.name}
            job={dataSource.position}
            phone={dataSource.phone1}
            company={dataSource.company}
            avatar={dataSource.avatar}
            qcode={dataSource.qcode}
          />
        )}
        {!isCard && (
          <div>
            <Header>
              <Avator>
                <img src={user.avatar} />
              </Avator>

              <Intro>
                <Name>{user.name}</Name>
                <Job>{user.position}</Job>
                <Tel>{user.phone1}</Tel>
                <Company>{wxUser.corpName}</Company>
              </Intro>

              <Icon type="qcode" onClick={this.handleClick} />
            </Header>

            <Cell.Group>
              <Cell title="名片信息" />
              <Cell title="电话：" description={<Icon type="call" />}>
                <Mobile>{user.phone1}</Mobile>
              </Cell>
              <Cell title="电话：" description={<Icon type="call" />}>
                {user.phone2}
              </Cell>
              <Cell title="邮箱：" description={<Icon type="mail" />}>
                {user.email}
              </Cell>
              <Cell title="微信：" description={<Icon type="weixin" />}>
                {user.weixinid}
              </Cell>
              <Cell title="公司：" description={<Icon type="company" />}>
                {wxUser.corpName}
              </Cell>
              <Cell title="地址：" description={<Icon type="address" />}>
                {wxUser.address}
              </Cell>
            </Cell.Group>
          </div>
        )}
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  const {
    user: { wxUser, qrcode },
    conf,
  } = state;

  return { wxUser, qrcode, conf };
}
export default connect(mapStateToProps)(withRouter(UserDetail));
