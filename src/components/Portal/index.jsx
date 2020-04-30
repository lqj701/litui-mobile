import React, { PureComponent } from 'react';
import {
  unstable_renderSubtreeIntoContainer,
  unmountComponentAtNode
} from 'react-dom';
import { Wrapper } from './Styled';

export default class Portal extends PureComponent {
  componentDidMount() {
    const doc = window.document;
    this.node = doc.createElement('div');
    doc.body.appendChild(this.node);

    this.renderPortal(this.props);
  }

  componentDidUpdate() {
    this.renderPortal(this.props);
  }

  componentWillUnmount() {
    unmountComponentAtNode(this.node);
    window.document.body.removeChild(this.node);
  }

  renderPortal(props) {
    const { transparent, children, ...other } = props;
    unstable_renderSubtreeIntoContainer(
      this,
      <Wrapper className="portal" type={transparent} {...other}>
        {children}
      </Wrapper>,
      this.node
    );
  }

  render() {
    return null;
  }
}
