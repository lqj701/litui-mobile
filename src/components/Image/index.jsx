import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Qiniu from './qiniu';

export default class Image extends Component {
  static defaultProps = {
    type: 'qiniu'
  };

  render() {
    const { type, ...other } = this.props;
    if (type === 'qiniu') {
      return <Qiniu {...other} />;
    }
    return <img {...other} />;
  }
}
