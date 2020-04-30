import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { listDateStr } from '../../utils/utils';

import Cell from '../../components/Cell';
import SwipeAction from '../../components/SwipeAction';
import FlagTui from '../../assets/images/tui.png';

import CustomerName from './CustomerName';
import AvatarIcon from '../../assets/images/avatar.png';

const StyleMessafe = styled.div`
  font-size: 0.26rem;
  color: #888888;
  padding: 0.08rem 0;
`;

const StyleDesc = styled.div`
  font-size: 0.24rem;
  color: #b2b2b2;
  padding: 0.08rem 0;
`;

const RevisitText = styled.div`
  color: #1aad19;
`;

const StyledCell = styled(Cell)`
  padding: 0.2rem 0;

  ${({ hasPush }) =>
    hasPush &&
    ` &:before {
  content: " ";
  background:url('${FlagTui}');
  position: absolute;
  width: 0.7rem;
  height: 0.7rem;
  top: 0;
  left: 0;
  background-size: cover;
}`};
`;

class List extends React.Component {
  static propTypes = {
    dispatch: propsType.func,
    history: propsType.object,
    dataSource: propsType.array
  };

  static defaultProps = {
    dataSource: []
  };

  handleCustomerClick = (id, wx_user_id) => {
    const path = `/Customer/detail/${id}/${wx_user_id}`;
    this.props.history.push(path);
  };

  render() {
    const { dataSource } = this.props;

    const Title = ({ name, resp }) => (
      <div>
        <CustomerName>{name}</CustomerName>
        <StyleMessafe>负责人: {resp}</StyleMessafe>
      </div>
    );

    const Description = ({ time, status }) => (
      <div>
        <StyleDesc>{time}</StyleDesc>
        <StyleDesc>{status}</StyleDesc>
      </div>
    );

    return (
      <div>
        {dataSource.map((value, key) => {
          return (
            <SwipeAction key={key}>
              <StyledCell
                hasPush={value.pushable}
                icon={
                  <img src={value.avatarUrl} />
                }
                title={
                  <Title
                    name={value.remark || value.nickname}
                    resp={value.name}
                  />
                }
                description={
                  <Description
                    time={
                      value.lastInformationTime &&
                      listDateStr(value.lastInformationTime)
                    }
                    status={
                      value.traced ? (
                        <RevisitText>已跟进</RevisitText>
                      ) : (
                        `未跟进`
                      )
                    }
                  />
                }
                onClick={() =>
                  this.handleCustomerClick(value.id, value.wxUserId)
                }
              />
            </SwipeAction>
          );
        })}
      </div>
    );
  }
}
export default withRouter(List);
