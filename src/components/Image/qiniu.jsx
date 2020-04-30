import React, { Component } from 'react';

export class Qiniu extends Component {
  static defaultProps = {
    width: 100,
    height: 100
  };
  render() {
    const { src, width, height, ...other } = this.props;
    return (
      <img src={`${src}&imageMogr2/thumbnail/${width}x${height}`} {...other} />
    );
  }
}

export default Qiniu;
