import React, { PureComponent } from 'react';
import { Wrapper } from './Styled';
import Container from './Container';

export default class Layout extends PureComponent {
  static defaultProps = {
    align: 'left'
  };
  render() {
    const { children, align } = this.props;
    return <Wrapper align={align}>{children}</Wrapper>;
  }
}
export { Container };
