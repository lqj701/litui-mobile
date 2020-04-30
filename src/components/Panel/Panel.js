import React, { PureComponent } from 'react';

export default class Panel extends PureComponent {
  static Header;
  static Body;
  static Footer;

  static defaultProps = {};

  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}
