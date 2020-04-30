import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ItemLabel, StyledArrowDownIcon, StyledArrowUpIcon } from './Styled';

class Title extends PureComponent {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, currentObj) {
    e.stopPropagation();

    this.props.onHandleClick(currentObj);
  }

  render() {
    const { show, currentObj, customStyle } = this.props;

    return (
      <ItemLabel
        style={customStyle}
        onClick={e => this.handleClick(e, currentObj)}
      >
        <span>{currentObj.name}</span>
        {show ? <StyledArrowUpIcon /> : <StyledArrowDownIcon />}
      </ItemLabel>
    );
  }
}

Title.propTypes = {
  show: PropTypes.bool.isRequired,
  currentObj: PropTypes.object.isRequired,
  onHandleClick: PropTypes.func.isRequired,
  customStyle: PropTypes.object,
};

Title.defaultProps = {
  show: false,
};

export default Title;
