import React, { PureComponent } from 'react';
import { Wrapper, Header, Line, Content, Ul, Li } from './Styled';
import TabPanel from './Panel';

export default class Tab extends PureComponent {
  static defatulProps = {
    disabled: false,
    customStyle: {},
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

  render() {
    const { children, part, customStyle, ...other } = this.props;
    const { value } = this.state;
    const renderLi = React.Children.map(children, (items, index) => {
      return (
        <Li
          active={value === index}
          disabled={items.props.disabled}
          onClick={() => this.handleClick(items, index)}
        >
          {items.props.title}
        </Li>
      );
    });

    const renderContent = React.Children.map(children, (items, index) => {
      return <TabPanel active={value === index} {...items.props} />;
    });

    const lineStyle = {
      width: `${100 / children.length}%`,
      left: `${value / children.length * 100}%`,
    };

    return (
      <Wrapper {...other} style={{height: '100%'}}>
        <Header className="tab-header">
          <Ul>{renderLi}</Ul>
          <Line style={lineStyle} />
        </Header>
        {part}
        <Content style={customStyle}>{renderContent}</Content>
      </Wrapper>
    );
  }
}
