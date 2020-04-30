import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Badge from '../../components/Badge';

const Wrapper = styled.div`
  display: flex;
  font-size: 0.3rem;
  min-height: 0.8rem;

  justify-content: ${({ direction }) =>
    direction === 'left' ? 'start' : 'flex-end'};
`;
const Body = styled.div`
  position: relative;
  // flex: 1;
  font-size: 0.3rem;
  color: rgba(0, 0, 0, 0.85);
  border-radius: 0.1rem;
  padding: 0.2rem;
  max-width: 60%;
  margin: 0 0.2rem;
  word-break: break-word;

  &:before {
    content: ' ';
    position: absolute;
    top: 9px;
    right: 100%;
    border: 6px solid transparent;
    border-right-color: #fff;

    ${({ direction }) =>
    direction === 'left'
      ? ''
      : `
    right: inherit;
    left: 100%;
    border-right-color: transparent;
    border-left-color: #b2e281;
    `};
  }

  border: 1px solid
    ${({ direction }) => (direction === 'left' ? '#d1d1d1' : ' #84d55a')};

  background: ${({ direction }) =>
    direction === 'left' ? '#fff' : ' #a0e75a'};
`;

const Icon = styled.div`
  width: 0.8rem;
  height: 0.8rem;

  text-align: center;
  > img {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
  }
`;

const BadgeWrapper = styled.div`
  text-align: center;
  padding: 0.26rem 0;
`;

class Message extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleAvatorClick = this.handleAvatorClick.bind(this);
  }

  handleAvatorClick() {
    const { direction, wxUserId, customerId, history } = this.props;
    const customer_id = customerId.split('_')[1];
    const wx_user_id = wxUserId.split('_')[1];

    if (direction === 'left') {
      // bug: 跳转到客户详情id接口没有返回
      // history.push(`/Customer/detail/${customer_id}/${wx_user_id}`);
    }
  }

  renderTime() {
    const { hideTime, dateStr } = this.props;
    let content = '';

    if (!hideTime) {
      content = <Badge color="grey" shape="radius" text={dateStr} />;
    }

    return content;
  }

  render() {
    const { direction, avator, children } = this.props;
    const Info = () => <Body direction={direction}>{children}</Body>;

    return (
      <div>
        <BadgeWrapper>{this.renderTime()}</BadgeWrapper>
        <Wrapper direction={direction}>
          {direction === 'right' && <Info />}
          <Icon onClick={this.handleAvatorClick}>
            {avator && <img src={avator} />}
          </Icon>
          {direction === 'left' && <Info />}
        </Wrapper>
      </div>
    );
  }
}

Message.propTypes = {
  direction: PropTypes.string.isRequired,
  avator: PropTypes.string.isRequired,
  dateStr: PropTypes.string.isRequired,
  hideTime: PropTypes.bool,
  wxUserId: PropTypes.string.isRequired,
  customerId: PropTypes.string.isRequired,
};

Message.defaultProps = {
  direction: 'left',
  hideTime: false,
};

export default withRouter(Message);
