import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getWxUsers } from '../../actions/user';
import { withRouter } from 'react-router-dom';
import Spinner from 'core/components/Spinner';

import Cell from '../../components/Cell';
import ListContainer from '../../components/List/DynanicList';

const StyledCell = styled(Cell)`
  padding: 0.2rem 0;
`;

const List = ListContainer(({ data, onClick }) => {
  return (
    <Cell.Group>
      {data.map((value, key) => {
        return (
          <StyledCell
            key={key}
            icon={<img src={value.avatar} />}
            title={value.name}
            onClick={() => onClick(value.id)}
          />
        );
      })}
    </Cell.Group>
  );
});

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = id => {
    this.props.history.push(`userlist/${id}`);
  };

  componentDidMount() {
    document.title = '用户列表';
    this.props.dispatch(
      getWxUsers({
        page: 1,
        row: 20,
      })
    );
  }

  render() {
    const { dataSource } = this.props;

    if (!dataSource) {
      return <Spinner />;
    }

    return <List action={getWxUsers} onClick={this.handleClick} {...this.props} />;
  }
}
function mapStateToProps(state) {
  const {
    user: { wxUsers },
  } = state;
  return { dataSource: wxUsers };
}
export default connect(mapStateToProps)(withRouter(UserList));
