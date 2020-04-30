import React, { Component } from 'react';
import propTypes from 'prop-types';

import PullToRefresh from '../PullToRefresh';

export default function ListContainer(WrappedComponent) {
  return class Hoc extends Component {
    static propTypes = {
      action: propTypes.func,
      dispatch: propTypes.func,
      dataSource: propTypes.any,
      pageSize: propTypes.any,
    };

    constructor(props) {
      super(props);

      this.state = {
        currentPage: this.getCurrentPageProps(props),
        data: this.getDataSourecProps(props),
      };

      this.pullDown = false;
      this.pullUp = false;
    }

    getDataSourecProps(props) {
      if ('dataSource' in props) {
        return props.dataSource.list;
      }
      return [];
    }

    getCurrentPageProps(props) {
      if ('currentPage' in props) {
        return props.currentPage;
      }
      return 1;
    }

    componentWillReceiveProps(nextProps) {
      if (
        'dataSource' in nextProps &&
        this.props.dataSource.list !== nextProps.dataSource.list
      ) {
        const { data, currentPage } = this.state;
        const { dataSource, pageSize } = nextProps;

        if (currentPage === 1) {
          this.setState({
            data: dataSource.list,
            pageSize: pageSize,
            currentPage: currentPage + 1,
          });
        } else {
          this.setState({
            data: [...data, ...dataSource.list],
            pageSize: pageSize,
            currentPage: currentPage + 1,
          });
        }
      }
    }

    pullDownRefresh = () => {
      this.pullDown = true;

      const { dispatch, action } = this.props;
      this.setState({ currentPage: 1 });

      return dispatch(
        action({
          page: 1,
          row: 20,
        })
      );
    };

    loadMoreData = () => {
      this.pullUp = true;

      const { currentPage } = this.state;
      const { dispatch, action, dataSource } = this.props;

      if (dataSource.hasNext) {
        return dispatch(
          action({
            page: currentPage,
            row: 20,
          })
        );
      }

      return Promise.resolve(true);
    };

    render() {
      const { data } = this.state;
      return (
        <PullToRefresh
          offset="0px"
          pullDownRefresh={this.pullDownRefresh}
          pullUpLoad={this.loadMoreData}
        >
          <WrappedComponent data={data} {...this.props} />
        </PullToRefresh>
      );
    }
  };
}
