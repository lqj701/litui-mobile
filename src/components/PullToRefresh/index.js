import React from 'react';
import propTypes from 'prop-types';
import BScroll from 'better-scroll';

import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const StylePullDown = styled.div`
  position: absolute;
  top: -0.8rem;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  color: #555;
`;
export const StylePullUpLoad = styled.div`
  width: 100%;
  height: 0.7rem;
  line-height: 0.7rem;
  text-align: center;
  color: #777;
`;

export default class PullToRefresh extends React.Component {
  static propTypes = {
    children: propTypes.any,
    pullUpLoad: propTypes.func,
    pullDownRefresh: propTypes.func,
    offset: propTypes.string,
    bindScroll: propTypes.func,
  };

  static defaultProps = {
    offset: '1.1rem',
    probeType: 1,
    click: false,
  };

  scroll = null;

  constructor(props) {
    super(props);

    this.scroll = null;

    this.state = {
      pullUpLoadText: '',
      pullDownRefreshText: '',
      isPullUpLoad: false,
      isPullDownRefresh: false,
      beforePullDownRefresh: true,
      beforePullUpLoad: false,
    };
  }

  componentDidMount() {
    const { pullUpLoad, pullDownRefresh, bindScroll } = this.props;

    const scroll = new BScroll(this.ref, {
      click: true,
      probeType: 1,
      pullDownRefresh: true,
      pullUpLoad: typeof pullUpLoad === 'function',
    });

    if (bindScroll) {
      bindScroll(scroll);
    }

    scroll.on('pullingDown', () => {
      this.setState({
        isPullDownRefresh: true,
        beforePullDownRefresh: false,
      });

      if (pullDownRefresh) {
        const dispatch = pullDownRefresh(scroll);
        if (dispatch.then) {
          dispatch.then(() => {
            setTimeout(() => {
              scroll.finishPullDown();
              scroll.refresh();
              this.setState({
                isPullDownRefresh: false,
                beforePullDownRefresh: true,
              });
            }, 1000);
          });
        } else {
          setTimeout(() => {
            scroll.finishPullDown();
            scroll.refresh();
            this.setState({
              isPullDownRefresh: false,
              beforePullDownRefresh: true,
            });
          }, 1000);
        }
      }
    });

    scroll.on('pullingUp', () => {
      this.setState({
        isPullUpLoad: true,
        beforePullUpLoad: false,
      });

      if (pullUpLoad) {
        const dispatch = pullUpLoad(scroll);
        if (dispatch.then) {
          dispatch.then(() => {
            setTimeout(() => {
              scroll.finishPullUp();
              scroll.refresh();
              this.setState({
                isPullUpLoad: false,
                beforePullUpLoad: false,
              });
            }, 1000);
          });
        }
      }
    });
  }

  componentWillUnmount() {
    this.scroll = null;
  }

  renderPullUpDown() {
    const { isPullDownRefresh, beforePullDownRefresh } = this.state;

    if (beforePullDownRefresh) {
      return (
        <StylePullDown>
          <span>释放立即刷新</span>
        </StylePullDown>
      );
    }

    if (isPullDownRefresh) {
      return (
        <StylePullDown>
          <span>刷新完成</span>
        </StylePullDown>
      );
    }
  }

  renderPullUpLoad() {
    const { isPullUpLoad, beforePullUpLoad } = this.state;

    if (beforePullUpLoad) {
      return (
        <StylePullUpLoad>
          <span>加载更多</span>
        </StylePullUpLoad>
      );
    }

    if (isPullUpLoad) {
      return (
        <StylePullUpLoad>
          <span>加载中...</span>
        </StylePullUpLoad>
      );
    }
  }

  render() {
    const { children, offset, pullUpLoad } = this.props;

    const style = {
      height: `calc(100% - ${offset})`,
      overflow: 'hidden',
    };

    return (
      <div
        ref={ref => (this.ref = ref)}
        className="scroll-wrapper"
        style={style}
      >
        <div>
          {this.renderPullUpDown()}

          <div>{children}</div>

          {pullUpLoad ? this.renderPullUpLoad() : null}
        </div>
      </div>
    );
  }
}
