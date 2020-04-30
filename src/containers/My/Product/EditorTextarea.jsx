import React from 'react';
import propsType from 'prop-types';
import Cell from 'components/Cell';
import Input from 'components/Input';

export default class EditorTextarea extends React.Component {
  static propTypes = {
    onChange: propsType.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.getValueProps(props),
    };
  }

  getValueProps(props) {
    if ('value' in props) {
      return props.value;
    }

    return '';
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  componentWillReceiveProps(nexProps) {
    if ('value' in nexProps) {
      this.setState({ value: nexProps.value });
    }
  }

  render() {
    const { value } = this.state;
    return (
      <Cell>
        <Input type="textarea" value={value} onChange={this.handleChange} />
      </Cell>
    );
  }
}
