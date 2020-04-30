import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #fff;
  border-bottom: 0.01rem solid #ccc;
`;

const getChildChecked = children => {
  let checkedValue = null;
  React.Children.forEach(children, element => {
    if (element.props && element.props.checked) {
      checkedValue = element.props.identification;
    }
  });
  return checkedValue;
};

const getValue = (props, defaultValue) => {
  if ('defaultValue' in props) {
    return props.defaultValue;
  }
  if (getChildChecked(props.children)) {
    return getChildChecked(props.children);
  }
  return defaultValue;
};

class DropDownGroup extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      status: false,
      identification: getValue(props, null),
    };
  }

  onChildChange(status, identification) {
    this.setState({ status, identification });
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(identification);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { children } = nextProps;

    if ('identification' in nextProps || getChildChecked(children)) {
      this.setState({
        identification: nextProps.identification || getChildChecked(children),
      });
    }
  }

  handleChecked(element) {
    const { status, identification } = this.state;

    return (
      status &&
      (identification === element.props.identification ||
        Number(identification) === Number(element.props.identification))
    );
  }

  render() {
    const { children } = this.props;

    return (
      <Wrapper>
        {React.Children.map(children, (element, index) => {
          return React.cloneElement(element, {
            key: index,
            onChange: bool =>
              this.onChildChange(bool, element.props.identification),
            checked: this.handleChecked(element),
            width: `${100 / children.length}%`,
          });
        })}
      </Wrapper>
    );
  }
}

DropDownGroup.propTypes = {
  children: PropTypes.any,
  onChange: PropTypes.any,
  defaultValue: PropTypes.any,
  customStyle: PropTypes.object,
};

DropDownGroup.defaultProps = {
  customStyle: {},
};

export default DropDownGroup;
