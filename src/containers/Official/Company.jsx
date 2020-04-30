import React from 'react';

import Cell from '../../components/Cell';
import Input from '../../components/Input';

export default class Company extends React.Component {
  static defaultProps = {};
  constructor() {
    super(...arguments);

    this.state = {};
  }

  componentWillReceiveProps() {}

  handleCompanyInputChange = event => {
    const { value } = event.target;
    this.setState({ corp_name: value });
    const { onValueChange, index } = this.props;
    if (onValueChange) {
      onValueChange({ corp_name: value, index });
    }
  };

  handleIntroduceInputChange = value => {
    this.setState({ introduce: value });
    const { onValueChange, index } = this.props;
    if (onValueChange) {
      onValueChange({ introduce: value, index });
    }
  };

  render() {
    const { dataSource } = this.props;

    return (
      <Cell.Group>
        <Cell title="公司名称">
          <Input
            placeholder="请输入公司名称"
            defaultValue={dataSource.corp_name}
            onChange={this.handleCompanyInputChange}
          />
        </Cell>
        <Cell title="简介">
          <Input
            showCount
            type="textarea"
            placeholder="请输入简介"
            value={dataSource.introduce}
            onChange={this.handleIntroduceInputChange}
          />
        </Cell>
      </Cell.Group>
    );
  }
}
