import React, { Component } from 'react';
import styled from 'styled-components';
import Mask from "./Mask";

const Arrow = styled.span`
  margin-left: 6px;
  &:after {
    display: inline-block;
    content: '';
    border-right: 2px solid rgb(136, 136, 136);
    border-top: 2px solid rgb(136, 136, 136);
    width: 8px;
    height: 8px;
    transform: rotate(135deg);
    position: relative;
    top: -3px;
  }
`;

const Value = styled.div`
  display: inline-flex;
  align-items: center;
  color: rgb(136, 136, 136);
`;

class Picker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMask: false,
      pickedNo: 0,
      choicesData: this.props.data,
    };
  }

  showMask = (e) => {
    e.preventDefault();
    this.setState({
      showMask: true,
    });
  }

  hideMask = (showMask, picked, model) => {
    const { onChange } = this.props;
    if (model === 'confirm') {
      this.setState({ showMask, pickedNo: picked });
      if (onChange) {
        onChange(picked);
      }
    } else {
      this.setState({ showMask });
    } 
  }

  render() {
    const { showMask, pickedNo, choicesData } = this.state;
    return (
      <div>
        <Value onClick={this.showMask}>
          {choicesData[pickedNo].label}<Arrow />
        </Value>

        {
          showMask &&
          <Mask
            onMaskHide={this.hideMask}
            picked={pickedNo}
            render={choicesData}
          />
        }
      </div>
    );
  }
}

export default Picker;