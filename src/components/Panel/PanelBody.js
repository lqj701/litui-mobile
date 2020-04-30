import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  background: #fff;
  color: #333;

  &:after {
    content: '';
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-width: 0;
    border-radius: 0;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;

    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
      width: 200%;
      height: 200%;
      transform: scale(0.5);
      transform-origin: 0 0;
      border-radius: 0;
    }

    @media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 3dppx) {
      width: 300%;
      height: 300%;
      transform: scale(0.33333333);
      border-radius: 0;
    }
  }
`;


export default class PanelBody extends PureComponent {
  static defaultProps = {};

  render() {
    const { children, ...others } = this.props;

    return <Wrapper {...others}>{children}</Wrapper>;
  }
}
