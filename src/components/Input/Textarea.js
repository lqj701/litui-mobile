import React, { PureComponent } from 'react';
import { Wrapper, Count } from './Styled';

export default class InputTextarea extends PureComponent {
  static defaultProps = {
    maxSize: 500,
    showCount: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.getValueProps(props),
      size: this.getSizeProps(props),
    };
  }

  getValueProps(props) {
    if ('value' in props && props.value) {
      return props.value;
    }
    if ('defaultValue' in props && props.defaultValue) {
      return props.defaultValue;
    }

    return '';
  }

  getSizeProps(props) {
    if ('value' in props && props.value) {
      return props.value.length;
    }

    return 0;
  }

  handleChange = ({ target: { value } }) => {
    const length = value.length;
    const { maxSize, showCount } = this.props;
    if (length > maxSize && showCount) {
      return;
    }

    this.setState({ value, size: length });
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  componentWillReceiveProps(nexProps) {
    if ('value' in nexProps) {
      this.setState({ value: nexProps.value, size: nexProps.value.length });
    }
  }

  render() {
    const { maxSize, placeholder, showCount, rows } = this.props;
    const { value, size } = this.state;

    return (
      <Wrapper>
        <textarea
          className="textarea"
          value={value}
          placeholder={placeholder}
          onChange={this.handleChange}
          rows={rows}
        />
        {showCount && (
          <Count>
            {size}/{maxSize}
          </Count>
        )}
      </Wrapper>
    );
  }
}
