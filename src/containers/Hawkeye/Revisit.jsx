import React from 'react';
import propsType from 'prop-types';
import { getCount, getInformations } from '../../actions/customer';

import PullToRefresh from '../../components/PullToRefresh';

import RevisitLog from './RevisitLog';

class Revisit extends React.Component {
  static propTypes = {
    dispatch: propsType.func,
    history: propsType.object,
    revisitLog: propsType.any,
    report: propsType.any,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pageSize: 0,
      currentPage: 1,
    };
  }

  pullDownRefresh = () => {
    this.setState({ currentPage: 1 });
    return this.props.dispatch(
      getInformations({
        goalsType: 0,
        page: 1,
        row: 50,
      })
    );
  };

  loadMoreData = () => {
    let { currentPage } = this.state;
    return this.props.dispatch(
      getInformations({
        goalsType: 0,
        page: currentPage,
        row: 20,
      })
    );
  };

  componentDidMount() {
    this.props.dispatch(getCount());

    this.props.dispatch(
      getInformations({
        goalsType: 0,
        page: 1,
        row: 20,
      })
    );
  }

  filterRevisitLogs(data) {
    return data.map((value, key) => {
      return {
        id: value.information.fromId,
        goalsId: value.information.goalsId,
        createdAt: value.information.createdAt,
        avatar: value.avatar,
        message: value.message,
        isShowTimer: key ? false : true,
        revisitLog: value.revisitLog,
        direction: value.goalsType ? 'right' : 'left',
      };
    });
  }

  componentWillReceiveProps(nextProps) {
    console.error(nextProps.dataSource !== this.props.dataSource);
    if (
      'dataSource' in nextProps &&
      nextProps.dataSource !== this.props.dataSource
    ) {
      const { currentPage, data } = this.state;
      const { dataSource } = nextProps;
      
      let logs = this.filterRevisitLogs(dataSource);

      // for (let i = 0; i < logs.length; i++) {
      //   const log = logs[i];
      //   const next = logs[i + 1] ? logs[i + 1] : logs[i];

      //   const startTimer = log.createdAt;
      //   const endTimer = next.createdAt;

      //   const interval = Math.abs(startTimer - endTimer);

      //   if (interval >= 60000) {
      //     log.isShowTimer = true;
      //   }

      //   // console.log('informations', i, startTimer, endTimer, interval);
      // }

      var i = 0;
      for (i; i < logs.length; i++) {
        for (var j = i; j < logs.length - 1; j++) {
          const interval = Math.abs(logs[i].createdAt - logs[j + 1].createdAt);

          // console.log('informations', i, j + 1, interval);
          if (interval >= 60000) {
            logs[j + 1].isShowTimer = true;
          } else {
            i = j + 1;
            logs[j + 1].isShowTimer = false;
            continue;
          }
        }
      }

      // debug
      if (currentPage === 1) {
        this.setState({
          data: logs,
          currentPage: currentPage + 1,
        });
      } else {
        this.setState({
          data: [...data, ...logs],
          currentPage: currentPage + 1,
        });
      }
    }
  }

  render() {
    const { data } = this.state;
    // console.error(this.props);

    return (
      <PullToRefresh
        // offset="4.1rem"
        pullDownRefresh={this.pullDownRefresh}
        pullUpLoad={this.loadMoreData}
      >
        <RevisitLog logs={data} {...this.props} />
      </PullToRefresh>
    );
  }
}

export default Revisit;
