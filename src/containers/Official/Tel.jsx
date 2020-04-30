import React from 'react';

import Cell from '../../components/Cell';
import Input from '../../components/Input';
import Icon from '../../components/Icon';
import confirm from '../../components/Dialogs/Confirm';
import forEach from 'lodash/forEach';

export default class Tel extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {};
  }

  handleTelInputChange = event => {
    const { value } = event.target;
    this.setState({ phone: value });

    const { onValueChange, index } = this.props;
    if (onValueChange) {
      onValueChange({ phone: value, index });
    }
  };
  handleEmailInputChange = event => {
    const { value } = event.target;
    this.setState({ email: value });

    const { onValueChange, index } = this.props;
    if (onValueChange) {
      onValueChange({ email: value, index });
    }
  };
  handleUrlInputChange = event => {
    const { value } = event.target;
    this.setState({ url: value });

    const { onValueChange, index } = this.props;
    if (onValueChange) {
      onValueChange({ url: value, index });
    }
  };
  handleAddressInputChange = event => {
    const { value } = event.target;
    this.setState({ address: value });

    const { onValueChange, index } = this.props;
    if (onValueChange) {
      onValueChange({ address: value, index });
    }
  };

  handleDeleteClick = () => {
    const { dataSource, index, onValueChange } = this.props;
    let hasValue = false;

    forEach(dataSource, value => {
      if (value) hasValue = true;
    });

    if (hasValue) {
      confirm({
        headerText: '删除',
        bodyText: '删除后，内容无法恢复',
        onOkBtnClick: () => {
          if (onValueChange) {
            onValueChange({ deleted: true, index });
          }
        },
      });
    } else {
      if (onValueChange) {
        onValueChange({ deleted: true, index });
      }
    }
  };

  handleMoveClick = () => {
    const { onMove } = this.props;
    if (onMove) {
      onMove();
    }
  };

  render() {
    const { dataSource, dragHangle } = this.props;

    return (
      <Cell.Group>
        <Cell
          title="联系方式"
          description={
            <div>
              <span style={{ padding: '0.2rem 0.4rem' }}>
                <Icon type="delete" onClick={this.handleDeleteClick} />
              </span>
              {dragHangle}
            </div>
          }
        />
        <Cell title="电话">
          <Input
            placeholder="请输入电话"
            value={dataSource.phone}
            onChange={this.handleTelInputChange}
          />
        </Cell>
        <Cell title="邮箱">
          <Input
            placeholder="请输入邮箱"
            value={dataSource.email}
            onChange={this.handleEmailInputChange}
          />
        </Cell>
        <Cell title="网址">
          <Input
            placeholder="请输入网址"
            value={dataSource.url}
            onChange={this.handleUrlInputChange}
          />
        </Cell>
        <Cell title="地址">
          <Input
            placeholder="请输入地址"
            value={dataSource.address}
            onChange={this.handleAddressInputChange}
          />
        </Cell>
      </Cell.Group>
    );
  }
}
