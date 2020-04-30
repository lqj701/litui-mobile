import React from 'react';
import propsType from 'prop-types';
import Echarts from 'echarts';

const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.echartsElement = null;
  }

  componentDidMount() {
    this.rerender();
    window.addEventListener('resize', this.rerender);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.option, this.props.option)) {
      this.dispose();
      this.rerender();
      return;
    }
  }

  rerender = () => {
    this.renderEchartDom();
  };

  renderEchartDom = () => {
    const echartObj = this.getEchartsInstance();
    echartObj.setOption(this.props.option);
    echartObj.resize({ width: window.innerWidth - 20 });
    return echartObj;
  };

  getEchartsInstance = () =>
    Echarts.getInstanceByDom(this.echartsElement) ||
    Echarts.init(this.echartsElement, this.props.opts);

  dispose = () => {
    if (this.echartsElement) {
      Echarts.dispose(this.echartsElement);
    }
  };

  render() {
    const chartStyle = {
      height: 300,
    };

    return (
      <div
        ref={e => {
          this.echartsElement = e;
        }}
        style={chartStyle}
      />
    );
  }
}

Chart.propTypes = {
  option: propsType.object.isRequired,
  opts: propsType.object,
};
