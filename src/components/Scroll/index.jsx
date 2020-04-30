import React from 'react';
import BScroll from 'better-scroll';

export default class extends React.Component {
  static defaultProps = {
    offset: '0px'
  };

  scroll;

  componentDidMount() {
    this.scroll = new BScroll(this.ref, {
      click: true,
      tap: true,
      preventDefaultException: {
        tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/,
        className: /(^|\s)textarea(\s|$)/
      }
    });

    const { onScroll } = this.props;
    if (onScroll) {
      onScroll(scroll);
    }
  }

  componentDidUpdate() {
    this.scroll.refresh();
  }

  componentWillUnmount() {
    this.scroll = null;
  }

  render() {
    const { children, offset } = this.props;

    const style = {
      height: `calc(100% - ${offset})`,
      overflow: 'hidden'
    };

    return (
      <div ref={ref => (this.ref = ref)} style={style}>
        <div>{children}</div>
      </div>
    );
  }
}
