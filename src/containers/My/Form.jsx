import React from 'react';
import propsType from 'prop-types';

import Cell from '../../components/Cell';
import Input from '../../components/Input';

export default class From extends React.Component {
  static propTypes = {
    input: propsType.array.isRequired,
    output: propsType.func,
  };

  static defaultProps = {
    input: [],
  };

  handleChange = ({ target: { value } }, field) => {
    this.setState({ [field]: value });

    const { output } = this.props;
    if (output) {
      output({ [field]: value });
    }
  };

  render() {
    const { input } = this.props;

    return (
      <div>
        <Cell.Group>
          {input.map((value, key) => {
            return (
              <Cell key={key} title={value.name}>
                <Input
                  placeholder={value.placeholder}
                  defaultValue={value.value}
                  maxLength={value.maxlength}
                  onChange={event => this.handleChange(event, value.field)}
                />
              </Cell>
            );
          })}
        </Cell.Group>
      </div>
    );
  }
}
