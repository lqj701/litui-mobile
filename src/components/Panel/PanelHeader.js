import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Title } from './Styled';

const Wrapper = styled.div`
  display: flex;
  padding: 0.5rem 0.3rem 0.14rem 0.3rem;
  color: #999;
  font-size: 0.28rem;
`;

export default class PanelHeader extends PureComponent {
  static defaultProps = {
  };

  render() {
    const { title, ...others } = this.props;

    return <Wrapper {...others}>{title && <Title>{title}</Title>}</Wrapper>;
  }
}
