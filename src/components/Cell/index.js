import React, { PureComponent } from 'react';
import {
  Wrapper,
  Header,
  Body,
  Footer,
  Title,
  Icon,
  Arrow,
  Inner,
  Content,
} from './Styled';

import CellGroup from './Group';

export default class Cell extends PureComponent {
  static defaultProps = {
    hasArrow: false,
    disabled: false,
  };

  static Group = CellGroup;

  render() {
    const {
      hasArrow,
      header,
      icon,
      title,
      description,
      disabled,
      onClick,
      children,
      ...others
    } = this.props;

    const iconRender = icon && <Icon>{icon}</Icon>;
    const titleRender = title && <Title isLink={!!onClick}>{title}</Title>;
    const contentRender = children && <Content>{children}</Content>;
    const arrowRender = hasArrow && <Arrow />;

    return (
      <Wrapper onClick={onClick} onTouchStart={() => {}} {...others}>
        <Inner isLink={!!onClick}>
          <Header>{header}</Header>
          <Header>{iconRender}</Header>
          <Body>
            {titleRender}
            {contentRender}
          </Body>
          <Footer>{description}</Footer>
          {arrowRender}
        </Inner>
      </Wrapper>
    );
  }
}
