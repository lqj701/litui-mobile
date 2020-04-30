import React from 'react';
import { withRouter } from 'react-router-dom';

import Cell from '../../components/Cell';

class SettingPage extends React.Component {
  componentDidMount() {
    document.title = '系统设置';
  }

  render() {
    const data = [
      {
        name: '产品设置',
        url: '/Product/list/1',
      },
      {
        name: '官网设置',
        url: '/Setting/Official',
      },
      {
        name: '用户列表',
        url: '/Setting/userlist',
      },
    ];

    return (
      <Cell.Group>
        {data.map((value, key) => {
          return (
            <Cell
              key={key}
              hasArrow
              title={value.name}
              onClick={() => this.props.history.push(value.url)}
            />
          );
        })}
      </Cell.Group>
    );
  }
}

export default withRouter(SettingPage);
