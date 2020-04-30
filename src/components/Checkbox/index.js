import React, { PureComponent } from 'react';
import { Container, Wrapper, Inner, Input, Text } from './Styled';

export default class Checkbox extends PureComponent {
  static defaultProps = {
    disabled: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: this.getChecked(props),
    };
  }

  getChecked(props) {
    if ('checked' in props && props.checked) {
      return props.checked;
    }

    if ('defaultChecked' in props && props.defaultChecked) {
      return props.defaultChecked;
    }

    return false;
  }

  handleChange = () => {
    const { onChecked } = this.props;
    const checked = !this.state.checked;
    this.setState({ checked });

    if (onChecked) {
      onChecked(checked);
    }
  };

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked,
      });
    }
    
  }

  render() {
    const { children, disabled, ...other } = this.props;
    const { checked } = this.state;

    const renderCheckbox = (
      <Container {...other}>
        <Wrapper>
          <Inner checked={checked} disabled={disabled} />
          {children && <Text disabled={disabled}>{children}</Text>}
          <Input
            type="checkbox"
            disabled={disabled}
            checked={checked}
            onChange={this.handleChange}
          />
        </Wrapper>
      </Container>
    );

    return renderCheckbox;
  }
}
