import React, { PureComponent } from 'react';
import { Wrapper } from './Styled';

export default class Button extends PureComponent {
  render() {
    const { children, color, ...others } = this.props;

    return (
      <Wrapper color={color} {...others}>
        {children}
      </Wrapper>
    );
  }
}
