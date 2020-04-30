import React from 'react';
import propsType from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { getCount, getInformations } from '../../actions/customer';

import { Container } from '../../components/Layout';
import PullToRefresh from '../../components/PullToRefresh';

import { Report } from './Report';
import RevisitLog from './RevisitLog';
import Revisit from './Revisit';
import BackTopSvg from 'assets/svgs/back-top.svg';

const BackTop = styled(BackTopSvg)`
  position: absolute;
  right: 10px;
  bottom: 80px;
  border-radius: 50%;
  background: #999;
  width: 32px;
  height: 32px;
  padding: 5px;
  z-inde: 20;
`;

class HawkeyePage extends React.Component {
  static propTypes = {
    dispatch: propsType.func,
    history: propsType.object,
    revisitLog: propsType.any,
    report: propsType.any
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pageSize: 0,
      currentPage: 1
    };

    this.scroll = undefined;
  }

  pullDownRefresh = () => {
    this.setState({ currentPage: 1 });
    return this.props.dispatch(
      getInformations({
        goalsType: 0,
        page: 1,
        row: 50
      })
    );
  };

  loadMoreData = () => {
    let { currentPage } = this.state;
    return this.props.dispatch(
      getInformations({
        goalsType: 0,
        page: currentPage,
        row: 20
      })
    );
  };

  handleBackTopClick = () => {
    this.scroll.scrollTo(0, 0);
    this.scroll.refresh();
  };

  handleScroll = scroll => {
    this.scroll = scroll;
  };

  componentDidMount() {
    document.title = '鹰眼';

    this.props.dispatch(getCount());

    this.props.dispatch(
      getInformations({
        goalsType: 0,
        page: 1,
        row: 20
      })
    );
  }

  filterRevisitLogs(data) {
    return data.map((value, key) => {
      return {
        id: value.information.fromId,
        goalsId: value.information.goalsId,
        createdAt: value.information.sentAt, // 字段更换
        avatar: value.avatar,
        message: value.message,
        isShowTimer: key ? false : true
      };
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      'revisitLog' in nextProps &&
      nextProps.revisitLog !== this.props.revisitLog
    ) {
      const { currentPage, data } = this.state;
      const {
        revisitLog: { informations }
      } = nextProps;

      let logs = this.filterRevisitLogs(informations);

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
          currentPage: currentPage + 1
        });
      } else {
        this.setState({
          data: [...data, ...logs],
          currentPage: currentPage + 1
        });
      }
    }
  }

  render() {
    const { report } = this.props;
    const { data } = this.state;

    // console.error(this.props.revisitLog);

    return (
      <Container>
        {report && <Report dataSource={report} />}

        {/* {this.props.revisitLog ? (
          <Revisit
            dataSource={this.props.revisitLog.informations}
            {...this.props}
          />
        ) : null} */}

        <PullToRefresh
          offset="4.1rem"
          pullDownRefresh={this.pullDownRefresh}
          pullUpLoad={this.loadMoreData}
          bindScroll={this.handleScroll}
        >
          <RevisitLog logs={data} {...this.props} />
        </PullToRefresh>

        <BackTop onClick={this.handleBackTopClick} />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { revisitLog, report } = state;
  return {
    revisitLog,
    report
  };
}
export default connect(mapStateToProps)(withRouter(HawkeyePage));
