import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CustomerLine from './CustomerLine';

class AnalysisChart extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(id) {
    const { dispatch, onChangeTimeObj, action, params, type } = this.props;

    params.time = id;
    if (!id) delete params.id;

    onChangeTimeObj({ type, id });
    dispatch(action(params));
  }

  render() {
    const { dataSource, title, sum } = this.props;

    const xAxis = dataSource.map(value => {
      const date = value.day.split('-');
      return `${date[1]}-${date[2]}`;
    });

    const data = dataSource.map(value => {
      return value.num;
    });

    return (
      <CustomerLine
        title={title}
        sum={sum}
        xAxis={xAxis}
        data={data}
        onChange={this.handleChange}
      />
    );
  }
}

AnalysisChart.propTypes = {
  dispatch: PropTypes.func,
  action: PropTypes.func.isRequired,
  dataSource: PropTypes.array.isRequired,
  params: PropTypes.object,
  title: PropTypes.string,
  type: PropTypes.string,
  sum: PropTypes.number,
  onChangeTimeObj: PropTypes.func,
};

AnalysisChart.defaultProps = {
  params: {},
  title: '',
  type: '',
  sum: 0,
};

export default AnalysisChart;
