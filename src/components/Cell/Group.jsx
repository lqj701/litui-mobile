import React, { PureComponent } from 'react';
import { Group } from './Styled';

export default class CellGroup extends PureComponent {
  render() {
    const { children, ...others } = this.props;

    return <Group {...others}>{children}</Group>;
  }
}
