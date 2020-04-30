import React, { PureComponent, cloneElement } from 'react';
import { Wrapper, Actions, Content } from './Styled';
import Drag from '../Drag';
import Events from '../../utils/events';

export default class SwipeAction extends PureComponent {
  isOpen = false;
  touchEnd = true;
  wrap;
  left;
  right;

  constructor(props) {
    super(props);
    this.state = {
      offsetLeft: 0
    };
  }

  componentDidMount() {
    Events.on(document.body, 'touchstart', e => this.onCloseSwipe(e));
  }

  componentWillUnmount() {
    Events.off(document.body, 'touchstart', e => this.onCloseSwipe(e));
  }

  onDragStart = () => {
    if (this.isOpen) {
      this.touchEnd = false;
      this.close();
      return;
    }
    this.touchEnd = true;
  };

  onDragMove = (event, { offsetX, offsetY }) => {
    const { disabled } = this.props;

    if (!this.touchEnd || disabled) {
      return;
    }

    // 拖动距离达到上限
    const { offset } = this.props;
    const { offsetLeft } = this.state;
    const btnsLeftWidth = this.left && this.left.offsetWidth;
    const btnsRightWidth = this.right && this.right.offsetWidth;
    if (
      (offsetX > 0 &&
        (!btnsLeftWidth || offsetLeft >= btnsLeftWidth + offset)) ||
      (offsetX < 0 &&
        (!btnsRightWidth || offsetLeft <= -btnsRightWidth - offset))
    ) {
      return false;
    }

    // 判断滚屏情况
    const distanceX = Math.abs(offsetX);
    const distanceY = Math.abs(offsetY);
    if (distanceX < 5 || (distanceX >= 5 && distanceY >= 0.3 * distanceX)) {
      return false;
    }
    console.error(event.preventDefault());
    // event.preventDefault();

    this.doTransition({ offsetLeft: offsetX, animationDuration: 0 });
    return true;
  };

  onDragEnd = (_event, { offsetX, startTime }) => {
    const { animationDuration, moveDistanceRatio, moveTimeSpan } = this.props;
    const timeSpan = new Date().getTime() - startTime.getTime();
    const btnsLeftWidth = this.left && this.left.offsetWidth;
    const btnsRightWidth = this.right && this.right.offsetWidth;

    let distanceX = 0;
    let isOpen = false;

    if (
      offsetX / btnsLeftWidth > moveDistanceRatio ||
      (offsetX > 0 && timeSpan <= moveTimeSpan)
    ) {
      distanceX = btnsLeftWidth;
      isOpen = true;
    } else if (
      offsetX / btnsRightWidth < -moveDistanceRatio ||
      (offsetX < 0 && timeSpan <= moveTimeSpan)
    ) {
      distanceX = -btnsRightWidth;
      isOpen = true;
    }

    if (isOpen && !this.isOpen) {
      // 打开
      this.open(distanceX);
    } else if (!isOpen && this.isOpen) {
      // 关闭
      this.close();
    } else {
      // 还原
      this.doTransition({ offsetLeft: distanceX, animationDuration });
    }
  };

  onCloseSwipe = e => {
    if (!this.wrap) {
      return;
    }

    if (this.isOpen) {
      const pNode = (node => {
        while (node.parentNode && node.parentNode !== document.body) {
          if (node === this.wrap) {
            return node;
          }
          node = node.parentNode;
        }
      })(e.target);

      if (!pNode) {
        e.preventDefault();
        this.touchEnd = true;
        this.close();
      }
    }
  };

  open = offsetLeft => {
    const { animationDuration, onOpen } = this.props;
    this.isOpen = true;
    this.doTransition({ offsetLeft, animationDuration });
    if (typeof onOpen === 'function') {
      onOpen();
    }
  };

  close = () => {
    const { animationDuration, onClose } = this.props;
    this.isOpen = false;
    this.doTransition({ offsetLeft: 0, animationDuration });
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  doTransition = ({ offsetLeft, animationDuration }) => {
    this.setState({ offsetLeft, animationDuration });
  };

  renderButton = (button, index) => {
    return cloneElement(button, {
      key: +index,
      onClick: e => {
        const onClick = button.props.onClick;

        if (onClick) {
          onClick(e);
        }

        if (this.props.autoClose) {
          this.close();
        }
      }
    });
  };

  renderButtons = (buttons, direction) => {
    if (!buttons || buttons.length === 0) {
      return;
    }

    return (
      <Actions
        innerRef={el => {
          this[direction] = el;
        }}
      >
        {buttons.map(this.renderButton)}
      </Actions>
    );
  };

  close = () => {
    const { animationDuration, onClose } = this.props;
    this.isOpen = false;
    this.doTransition({ offsetLeft: 0, animationDuration });
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  render() {
    const { left, right, children } = this.props;
    const { offsetLeft, animationDuration } = this.state;

    const style = {
      WebkitTransitionDuration: `${animationDuration}ms`,
      transitionDuration: `${animationDuration}ms`,
      WebkitTransform: `translate3d(${offsetLeft}px, 0, 0)`,
      transform: `translate3d(${offsetLeft}px, 0, 0)`
    };

    return left || right ? (
      <Wrapper
        innerRef={wrap => {
          this.wrap = wrap;
        }}
      >
        {this.renderButtons(left, 'left')}
        {this.renderButtons(right, 'right')}
        <Drag
          onDragStart={this.onDragStart}
          onDragMove={this.onDragMove}
          onDragEnd={this.onDragEnd}
        >
          <Content style={style}>{children}</Content>
        </Drag>
      </Wrapper>
    ) : (
      children
    );
  }
}
