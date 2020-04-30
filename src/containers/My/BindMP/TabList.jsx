import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled('div')`
  display: none;

  ${({ active }) =>
    active &&
    css`
      display: block;
    `};
`;

class ListPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('active' in nextProps) {
      this.setState({
        active: !!nextProps.active,
      });
    }
  }

  render() {
    const { children, ...other } = this.props;
    const { active } = this.state;
    return (
      <Wrapper active={active} {...other}>
        {children}
      </Wrapper>
    );
  }
}

export default class TabList extends PureComponent {
  static defatulProps = {
    disabled: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || this.getActiveIndex(props.children) || 0,
    };
  }

  getActiveIndex(children) {
    let activeIndex;
    React.Children.forEach(children, (item, index) => {
      if (item.props && item.props.active) {
        activeIndex = index;
      }
    });
    return activeIndex;
  }

  handleClick = (tab, index) => {
    const { disabled, onChange } = this.props;

    if (disabled || tab.props.disabled) {
      return;
    }

    this.setState({ value: index });

    if (onChange) {
      onChange(index);
    }
  };

  componentWillReceiveProps(nextProps) {
    // this.setState({ value: index });
  }

  render() {
    const { children, ...other } = this.props;
    const { value } = this.state;

    const renderContent = React.Children.map(children, (items, index) => {
      return <ListPanel active={value === index} {...items.props} />;
    });

    return (
      <div {...other}>
        <div>{renderContent}</div>
      </div>
    );
  }
}

TabList.Panel = ListPanel;
