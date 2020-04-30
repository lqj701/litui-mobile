import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: calc(100% - ${props => props.offset});
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
`;

const Scroll = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`;

class ScrollRoot extends PureComponent {
  // 初始化手指坐标点
  startPos = {};
  endPos = {};
  isScrolling = 1; //这个参数判断是垂直滚动还是水平滚动
  // disableElement = ['TEXTAREA', 'INPUT', 'SELECT', 'BUTTON'];
  disableElement = /^(TEXTAREA|INPUT|SELECT|BUTTON)$/;

  constructor(props) {
    super(props);

    this.state = {};
  }

  // componentDidMount() {
  //   this.scrollRef.addEventListener(
  //     'touchstart',
  //     e => this.handleTouchStart(e),
  //     false
  //   );
  // }

  // 手指按下
  handleTouchStart(e) {
    //touches数组对象获得屏幕上所有的touch，取第一个touch
    const touch = e.targetTouches[0];
    const targetNodeName = e.target.nodeName;
    // if (this.disableElement.test(targetNodeName)) {}
    console.log(e.target.nodeName, this.disableElement.test(targetNodeName));
    //取第一个touch的坐标值
    this.startPos = { x: touch.pageX, y: touch.pageY, time: +new Date() };
    this.isScrolling = 1;

    this.scrollRef.addEventListener(
      'touchmove',
      event => this.handleTouchMove(event),
      false
    );

    this.scrollRef.addEventListener(
      'touchend',
      event => this.handleTouchEnd(event),
      false
    );
  }

  //手指滑动
  handleTouchMove(e) {
    if (e.targetTouches.length > 1) return;

    const touch = e.targetTouches[0];

    this.endPos = {
      x: touch.pageX - this.startPos.x,
      y: touch.pageY - this.startPos.y,
    };
    console.log(this.endPos);
    //isScrolling为1时，表示纵向滑动，0为横向滑动
    this.isScrolling =
      Math.abs(this.endPos.x) < Math.abs(this.endPos.y) ? 1 : 0;
    if (this.isScrolling === 1) {
      e.preventDefault(); //阻止触摸事件的默认行为，即阻止滚屏
      console.log('垂直滚动');
      this.scrollRef.style.top = this.endPos.y + 'px';
    } else {
      e.preventDefault();
      console.log('水平滚动');
    }
  }

  // 当手指抬起的时候，判断滚动离上下的距离
  handleTouchEnd(e) {
    const top = this.scrollRef.offsetTop;

    console.log('offset top', top);

    // 解绑事件
    this.scrollRef.removeEventListener(
      'touchmove',
      event => this.handleTouchMove(event),
      false
    );

    this.scrollRef.removeEventListener(
      'touchend',
      event => this.handleTouchEnd(event),
      false
    );
  }

  render() {
    const { offset, children } = this.props;

    return (
      <Wrapper offset={offset}>
        <Scroll innerRef={el => (this.scrollRef = el)}>{children}</Scroll>
      </Wrapper>
    );
  }
}

ScrollRoot.propTypes = {
  children: PropTypes.array.isRequired,
  offset: PropTypes.string,
  pullDownRefresh: PropTypes.func,
  pullUpLoad: PropTypes.func,
};

ScrollRoot.defaultProps = {
  offset: '0px',
};

export default ScrollRoot;
