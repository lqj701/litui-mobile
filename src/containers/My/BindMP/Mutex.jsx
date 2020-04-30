import React, { Component } from 'react';
import propsType from 'prop-types';

/**
 * <Mutex value defaultValue={1} onChange={value => console.log(value)}>
 *  <component value={2} onChange={} />
 * </Mutex>
 *
 * 自定义子互斥组件约定：
 * 提供value属性
 * 提供onChange事件
 */

const getChildChecked = children => {
  let checkedValue = null;
  React.Children.forEach(children, element => {
    if (element.props && element.props.checked) {
      checkedValue = element.props.value;
    }
  });
  return checkedValue;
};

const getValue = (props, defaultValue) => {
  if ('value' in props) {
    return props.value;
  }
  if ('defaultValue' in props) {
    return props.defaultValue;
  }
  if (getChildChecked(props.children)) {
    return getChildChecked(props.children);
  }
  return defaultValue;
};

export default class Mutex extends Component {
  static propTypes = {
    children: propsType.any,
    onChange: propsType.any,
    value: propsType.any,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: getValue(props, null),
    };
  }

  onChildChange = value => {
    this.setState({ value });
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps || getChildChecked(nextProps.children)) {
      this.setState({
        value: nextProps.value || getChildChecked(nextProps.children),
      });
    }
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        {React.Children.map(children, (element, index) => {
          return React.cloneElement(element, {
            key: index,
            onChange: () => this.onChildChange(element.props.value),
            checked:
              this.state.value === element.props.value || Number(this.state.value) === Number(element.props.value),
          });
        })}
      </div>
    );
  }
}
