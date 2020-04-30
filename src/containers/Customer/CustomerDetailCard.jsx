import React from 'react';
import propsType from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import Cell from '../../components/Cell';
import Icon from '../../components/Icon';
import CustomerName from './CustomerName';

const Wrapper = styled.div`
  position: relative;
  z-index: 2;
`;

const StyleMessafe = styled.div`
  font-size: 0.28rem;
  color: #888888;
`;

const StyledLink = styled(Link)`
  font-size: 0.28rem;
  color: #4a8cf2;
  text-decoration: none;
`;

const ButtonIcon = styled.button`
  border: 1px solid #4a8cf2;
  border-radius: 0.08rem;
  font-size: 0.28rem;
  color: #fff;
  outline: 0;
  height: 0.66rem;
  width: 1.95rem;
  background: #4a8cf2;
`;

const StyledCard = styled(Cell)`
  padding-top: 0.18rem;
  padding-bottom: 0.18rem;
`;

const StyledCardContent = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 95%;
`;

class CustomerDetailCard extends React.Component {
  static propTypes = {
    history: propsType.object,
    match: propsType.object,
    customerProfile: propsType.object,
    currentUser: propsType.object,
    imAccount: propsType.object
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChatClick = () => {
    const { imAccount } = this.props;
    if (!imAccount) return;
    this.props.history.push(`/Chat/${imAccount.accountId}`);
  };

  handleSyncClick = () => {
    const { onSyncClick } = this.props;
    onSyncClick && onSyncClick();
  };

  render() {
    const { currentUser, customerProfile, match } = this.props;

    const description = () => {
      if (customerProfile.visiable) {
        if (!customerProfile.isChanged) {
          if (currentUser.wxUser.id === customerProfile.wxUserId) {
            return (
              <ButtonIcon onClick={this.handleSyncClick}>
                {customerProfile.isSynchronized ? '进入' : '同步到'}CRM
              </ButtonIcon>
            );
          }
        }
      }

      return null;
    };

    return (
      <Wrapper>
        <StyledCard
          icon={<img src={customerProfile.avatarUrl} />}
          description={description()}
        >
          <div style={{ lineHeight: 1.5 }}>
            <CustomerName>
              {customerProfile.remark
                ? customerProfile.remark
                : customerProfile.nickname}

              {customerProfile.gender === 1 ? (
                <Icon type="male" />
              ) : customerProfile.gender === 2 ? (
                <Icon type="female" />
              ) : null}
            </CustomerName>

            {customerProfile.remark ? (
              <StyleMessafe>微信昵称：{customerProfile.nickname}</StyleMessafe>
            ) : null}
            <StyledLink
              to={`/Customer/Editor/${match.params.id}/${
                match.params.wx_user_id
              }`}
            >
              编辑客户详情
            </StyledLink>
          </div>
        </StyledCard>
        {customerProfile.bindphone && (
          <Cell title="绑定手机：">{customerProfile.bindphone}</Cell>
        )}
        {customerProfile.company && (
          <Cell title="公司：">{customerProfile.company}</Cell>
        )}
        {customerProfile.phone1 && (
          <Cell title="电话：">{customerProfile.phone1}</Cell>
        )}
        {customerProfile.phone2 && (
          <Cell title="电话：">{customerProfile.phone2}</Cell>
        )}
        {customerProfile.weixinid && (
          <Cell title="微信号：">{customerProfile.weixinid}</Cell>
        )}
        {customerProfile.email && (
          <Cell title="邮箱：">{customerProfile.email}</Cell>
        )}
        {customerProfile.address && (
          <Cell title="地址：">
            <StyledCardContent>{customerProfile.address}</StyledCardContent>
          </Cell>
        )}
        {customerProfile.descr && (
          <Cell title="描述：">
            <StyledCardContent>{customerProfile.descr}</StyledCardContent>
          </Cell>
        )}
      </Wrapper>
    );
  }
}

export default withRouter(CustomerDetailCard);
