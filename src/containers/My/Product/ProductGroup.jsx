import React from 'react';
import propsType from 'prop-types';

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

export default class ProductGroup extends React.Component {
  static propTypes = {
    children: propsType.any,
    onChange: propsType.any,
    value: propsType.any,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: getValue(props, null),
      checked: true,
    };
  }

  onChildChange = (value, checked) => {
    this.setState({ value, checked });
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(value, checked);
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
            onChange: checked =>
              this.onChildChange(element.props.value, checked),
            checked:
              this.state.value === element.props.value && this.state.checked,
          });
        })}
      </div>
    );
  }
}
