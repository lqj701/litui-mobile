import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';

export class NavBarContainer extends Component {
  render() {
    return <NavBar {...this.props} />;
  }
}

const mapStateToProps = state => {
  return { allUnread: state.chat.allUnread };
};

export default connect(mapStateToProps)(NavBarContainer);
