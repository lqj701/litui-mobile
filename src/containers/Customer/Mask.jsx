import React, { Component } from 'react';
import styled from 'styled-components';

import Drag from '../../components/Drag';

const MaskWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.35s ease-in-out;
`;

const OptionsWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -100vh;
  background-color: white;
  transition: bottom 0.35s ease-in-out;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  span {
    display: inline-block;
    padding: 9px 15px;
    font-size: 0.3rem;
    color: #108ee9;
  }
`;

const RealOptionsWrapper = styled.div`
  // display: flex;
  // flex-direction: row;
  // align-items: center;
  // justify-content: center;
  // position: relative;
  // width: 100%;
  // overflow: hidden;
  // touch-action: none;

  position: relative;
  height: 210px;
  bottom: 0;
  background: #fff;
  padding: 20px 0;
`;

const View = styled.div`
  display: block;
  position: relative;
  overflow: hidden;
  height: 170px;
  width: 100%;
`;

const TriggerOption = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  margin: 0 auto;
  width: 100%;
  z-index: 3;
  background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.95),
      rgba(255, 255, 255, 0.6)
    ),
    linear-gradient(to top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));
  background-repeat: no-repeat;
  background-position: top, bottom;
  background-size: 100% 102px;
`;

const SelectedOption = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 34px;
  margin-top: -17px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`;

const Options = styled.div`
  width: 100%;
  margin-top: 68px;
  transition: transform 0ms linear;
`;

const Option = styled.div`
  touch-action: manipulation;
  text-align: center;
  font-size: 16px;
  height: 34px;
  line-height: 34px;
  color: #000;
  white-space: nowrap;
  text-overflow: ellipsis;
  z-index: 1;
`;

const MaskTop = styled.div`
  width: 100%;
  height: 88px;
  pointer-events: none;
  transform: translateZ(0);
  position: absolute;
  top: 0;
  background: linear-gradient(
    0deg,
    hsla(0, 0%, 100%, 0.4),
    hsla(0, 0%, 100%, 0.8)
  );

  &:after {
    content: '';
    display: block;
    position: absolute;
    border-bottom: 1px solid #ebebeb;
    left: 0;
    bottom: 0;
    width: 100%;
    transform-origin: 0 bottom;
  }
`;

const MaskBottom = styled.div`
  width: 100%;
  height: 88px;
  pointer-events: none;
  transform: translateZ(0);
  position: absolute;
  bottom: 0;
  background: linear-gradient(
    180deg,
    hsla(0, 0%, 100%, 0.4),
    hsla(0, 0%, 100%, 0.8)
  );

  &:before {
    content: '';
    display: block;
    position: absolute;
    border-top: 1px solid #ebebeb;
    left: 0;
    top: 0;
    width: 100%;
    transform-origin: 0 top;
  }
`;

class Mask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationStyle: {
        maskWrapper: {},
        optionsWrapper: {}
      },
      startingPoint: null,
      terminalPoint: null,
      initialPoint: 0
    };

    this.onDragStart = this.onDragStart.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentWillMount() {
    const { picked } = this.props;
    window.setTimeout(() => {
      this.setState({
        animationStyle: {
          maskWrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)'
          },
          optionsWrapper: {
            bottom: '0'
          }
        },
        terminalPoint: picked * -34,
        initialPoint: picked * -34
      });
    }, 10);
  }

  onDragStart() {}

  onDragMove(event, { offsetX, offsetY }) {
    event.preventDefault();

    const { startingPoint, initialPoint } = this.state;
    const terminalPoint = initialPoint + (offsetY - startingPoint);
    this.setState({ terminalPoint });

    return true;
  }

  onDragEnd(_event, { offsetX, startTime }) {
    const { terminalPoint } = this.state;
    const { render } = this.props;
    const choicesNum = render.length;
    const times = Math.floor(terminalPoint / 17);
    let final;
    if (times >= -1) {
      final = 0;
    } else {
      final =
        Math.abs(times) > choicesNum
          ? (choicesNum - 1) * -34
          : (Math.abs(times) - 1) * -34;
    }
    
    this.setState({
      terminalPoint: final,
      initialPoint: final
    });
  }

  cancel = e => {
    const { id } = e.target;
    if (id === 'mask-wrapper' || id === 'cancel-btn' || id === 'confirm-btn') {
      let model;
      this.setState({
        animationStyle: {
          maskWrapper: {},
          optionsWrapper: {}
        }
      });
      if (id === 'mask-wrapper' || id === 'cancel-btn') {
        model = 'cancel';
      } else {
        model = 'confirm';
      }
      const { onMaskHide } = this.props;
      const { terminalPoint } = this.state;
      if (onMaskHide) {
        const picked = Math.abs(terminalPoint / 34);
        window.setTimeout(() => onMaskHide(false, picked, model), 400);
      }
    }
  };

  render() {
    const { render } = this.props;
    const {
      animationStyle: { maskWrapper, optionsWrapper }
    } = this.state;
    let { terminalPoint } = this.state;

    const style = {
      transform: `translate3d(0px, ${terminalPoint}px, 0px`
    };

    return (
      <MaskWrapper id="mask-wrapper" style={maskWrapper} onClick={this.cancel}>
        <OptionsWrapper style={optionsWrapper}>
          <Actions>
            <span id="cancel-btn">取消</span>
            <span id="confirm-btn">确定</span>
          </Actions>
          <RealOptionsWrapper>
              <Drag
                onDragStart={this.onDragStart}
                onDragMove={this.onDragMove}
                onDragEnd={this.onDragEnd}
              >
                <View>
                <Options style={style}>
                  {render.map((v, k) => <Option key={k}>{v.label}</Option>)}
                </Options>
                </View>
              </Drag>
           
            <MaskTop />
            <MaskBottom />
          </RealOptionsWrapper>
        </OptionsWrapper>
      </MaskWrapper>
    );
  }
}

export default Mask;
