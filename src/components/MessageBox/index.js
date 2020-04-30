import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';

import Card from '../Card';
import Badge from '../Badge';

const Wrapper = styled.div`
  display: flex;
  font-size: 15px;
  min-height: 45px;
`;
const Body = styled.div`
  flex: 1;
  font-size: 0.3rem;
  color: rgba(0, 0, 0, 0.85);
  line-height: 0.5rem;
  ${({ direction }) =>
    direction === 'left' ? 'margin-left: 0.2rem;' : 'margin-right: 0.2rem;'};
`;

const Icon = styled.div`
  width: 1rem;
  height: 1rem;

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

export default class MessageBox extends React.Component {
  static propTypes = {
    direction: propsType.string,
    avatar: propsType.string,
    date: propsType.any,
    children: propsType.any,
    onClick: propsType.any,
  };

  static defaultProps = {
    direction: 'left',
  };

  handleClick = () => {
    const { onClick } = this.props;
    if (onClick) {
      onClick();
    }
  };

  render() {
    const { direction, avatar, date, children, onClick } = this.props;

    const Info = () => (
      <Body
        direction={direction}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    );

    return (
      <div
        style={{ marginLeft: '0.3rem', marginRight: '0.3rem' }}
        onClick={onClick}
      >
        {date && (
          <BadgeWrapper>
            <Badge color="grey" shape="radius" text={date} />
          </BadgeWrapper>
        )}
        <Card active={!!onClick}>
          <Wrapper>
            {direction === 'right' && <Info />}
            <Icon>{avatar && <img src={avatar} />}</Icon>
            {direction === 'left' && <Info />}
          </Wrapper>
        </Card>
      </div>
    );
  }
}
