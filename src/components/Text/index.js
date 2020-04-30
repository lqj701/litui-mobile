import React, { PureComponent } from 'react';
import { Wrapper } from './Styled';

export default class Text extends PureComponent {
  static defaultProps = {
    align: 'left',
  }
  render() {
    const { children, align, color } = this.props;
    return (
      <Wrapper color={color} align={align}>
        {children}
      </Wrapper>
    );
  }
}
