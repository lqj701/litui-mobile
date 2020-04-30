import React, { PureComponent } from 'react';
import { Wrapper, Input } from './Styled';

export default class Radio extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.getChecked(props)
    };
  }

  getChecked(props) {
    if ('checked' in props && props.checked) {
      return props.checked;
    }
    return false;
  }
  handleChange = () => {
    const { onChange } = this.props;
    const checked = !this.state.checked;
    this.setState({ checked });

    if (onChange) {
      onChange(checked);
    }
  };

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked
      });
    }
  }

  render() {
    const { disabled } = this.props;
    const { checked } = this.state;

    const renderCheckbox = (
      <Wrapper>
        <Input
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={this.handleChange}
        />
      </Wrapper>
    );

    return renderCheckbox;
  }
}
