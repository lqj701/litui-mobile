import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import find from 'lodash/find';
import {
  fetchCustomerReport,
  fetchForwardReport,
  fetchCustomerInterest,
  fetchInfoAllReport,
  fetchCustomerActionAnalysis,
  fetchInfoCustomerAreaReport,
  fetchInfoCustomerGenderReport,
  fetchFollowReport,
  fetchSaveReport,
  fetchSupportReport,
  fetchConsultReport,
  fetchActiveCustomerReport,
  fetchReadReport,
} from '../../actions/analysis';
import { fetchWxUserDepts, fetchWxUserDeptUsers } from '../../actions/department';

import DropDown, { DropDownGroup } from '../../../components/DropDown';
import Tab from '../../../components/Tab';
import Scroll from '../../../components/Scroll';
import UpdateTime from '../../../components/UpdateTime';
import NavBar from '../NavBar';
import DataCollection from './DataCollection';

import AnalysisChart from './AnalysisChart';
import CustomerAction from './CustomerAction';
import CustomerArea from './CustomerArea';
import CustomerInterest from './CustomerInterest';
import CustomerGender from './CustomerGender';

const StyledTab = styled(Tab)`
  margin-top: 0.3rem;

  .tab-header {
    background: #fff;
  }
`;

const Wrapper = styled.div`
  height: 100%;
`;

const StyledScroll = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 1.1rem;
  top: 2.03rem;
  overflow: scroll;
`;

class AnalysisInformation extends PureComponent {
  // 选择全部字段，则删除该条参数
  static clearParams(params, { currentWxDepartmentId, currentWxUserId }) {
    if (typeof currentWxDepartmentId !== 'undefined' && !currentWxDepartmentId)
      delete params.wx_department_id;
    if (typeof currentWxUserId !== 'undefined' && !currentWxUserId)
      delete params.wx_user_id;
  }

  constructor(props) {
    super(props);

    this.state = {
      deptList: props.wxDepts,
      deptUserList: props.wxDeptUsers,
      currentWxDepartmentId: '',
      currentWxUserId: '',
      chartDataList: [],
      dateList: props.dateList,
      isClickTab: false,
      currentTabItem: 0,
    };

    this.handleDropDownGroupChange = this.handleDropDownGroupChange.bind(this);
    this.handleWxDeptEvent = this.handleWxDeptEvent.bind(this);
    this.handleWxUserEvent = this.handleWxUserEvent.bind(this);
    this.handleChangeTimeObj = this.handleChangeTimeObj.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  componentWillMount() {
    this.getWxDepts({ page: 1 }).then(() => this.getWxDeptUsers({ page: 1 }));
    this.fetchCustomerData({ dateList: this.state.dateList });
  }

  componentWillReceiveProps(nextProps) {
    // 部门
    if (nextProps.wxDepts !== this.props.wxDepts) {
      this.setState({
        deptList: nextProps.wxDepts,
      });
    }

    // 部门用户
    if (nextProps.wxDeptUsers !== this.props.wxDeptUsers) {
      this.setState({
        deptUserList: nextProps.wxDeptUsers,
      });
    }

    if ('chartDataList' in nextProps) {
      this.setState({ chartDataList: nextProps.chartDataList });
    }
  }

  componentDidMount() {
    document.title = '鹰眼分析';
  }

  fetchCustomerData(opts) {
    // 数据汇总
    this.handleTypeAction(fetchInfoAllReport, opts, 'infoAll');
    // 客户报表
    this.handleTypeAction(fetchCustomerReport, opts, 'customer');
    // 转发报表
    this.handleTypeAction(fetchForwardReport, opts, 'forward');
    // 点赞
    this.handleTypeAction(fetchSupportReport, opts, 'customerSupport');
    // 跟进
    this.handleTypeAction(fetchFollowReport, opts, 'customerFollow');
    // 保存
    this.handleTypeAction(fetchSaveReport, opts, 'customerSave');
    // 咨询
    this.handleTypeAction(fetchConsultReport, opts, 'customerConsult');
    // 活跃
    this.handleTypeAction(fetchActiveCustomerReport, opts, 'customerActive');
    // 浏览
    this.handleTypeAction(fetchReadReport, opts, 'customerRead');
  }

  fetchCustomerPortrait(params) {
    this.props.dispatch(fetchCustomerInterest(params));
    // 客户行为分析、圆图
    this.props.dispatch(fetchCustomerActionAnalysis(params));
    // 客户地区分析、柱状图
    this.props.dispatch(fetchInfoCustomerAreaReport(params));
    // 客户性别分析、饼图
    this.props.dispatch(fetchInfoCustomerGenderReport(params));
  }

  handleTypeAction(action, opts, type) {
    const params = opts.params || {};
    const timeObj = find(opts.dateList, { type });
    if (timeObj && timeObj.id) params.time = timeObj.id;
    return this.props.dispatch(action(params));
  }

  // 获取所有部门
  getWxDepts({ page }) {
    return this.props.dispatch(
      fetchWxUserDepts({
        page,
        row: 50,
      })
    );
  }

  // 获取所有部门用户
  getWxDeptUsers({ page, wx_department_id }) {
    const params = {
      page,
      row: 50,
    };

    if (typeof wx_department_id !== 'undefined') {
      params.wx_department_id = wx_department_id;
    } else {
      delete params.wx_department_id;
    }

    return this.props.dispatch(fetchWxUserDeptUsers(params));
  }

  handleWxDeptEvent(result) {
    const currentWxDepartmentId = result.currentObj.id;
    const deptUserParams = {
      page: 1,
      wx_department_id: currentWxDepartmentId,
    };

    if (!currentWxDepartmentId) {
      delete deptUserParams.wx_department_id;
    }
    this.setState({ currentWxDepartmentId });

    this.getWxDeptUsers(deptUserParams).then(() => {
      const { deptUserList, dateList, currentTabItem } = this.state;
      const defaultUserId = deptUserList[0].id;
      const params = {
        wx_department_id: currentWxDepartmentId,
        wx_user_id: defaultUserId,
      };

      AnalysisInformation.clearParams(params, {
        currentWxDepartmentId,
        currentWxUserId: defaultUserId,
      });

      this.setState({ currentWxUserId: defaultUserId, currentPage: 1 });

      if (currentTabItem === 0) {
        this.fetchCustomerData({ params, dateList });
        this.setState({ isClickTab: false });
      }
      if (currentTabItem === 1) {
        this.fetchCustomerPortrait(params);
      }
    });
  }

  handleWxUserEvent(result) {
    const { currentWxDepartmentId, dateList, currentTabItem } = this.state;
    const currentWxUserId = result.currentObj.id;
    const params = {
      wx_department_id: currentWxDepartmentId,
      wx_user_id: currentWxUserId,
    };

    AnalysisInformation.clearParams(params, {
      currentWxDepartmentId,
      currentWxUserId,
    });

    this.setState({ currentWxUserId });

    if (currentTabItem === 0) {
      this.fetchCustomerData({ params, dateList });
      this.setState({ isClickTab: false });
    }
    if (currentTabItem === 1) {
      this.fetchCustomerPortrait(params);
    }
  }

  handleChangeTimeObj(result) {
    const dateList = [...this.state.dateList];
    dateList.forEach(item => {
      if (item.type === result.type) {
        item.id = result.id;
      }
    });

    this.setState({
      dateList: [...dateList],
    });
  }

  handleTabChange(item) {
    const {
      isClickTab,
      currentTabItem,
      currentWxDepartmentId,
      currentWxUserId,
    } = this.state;
    this.setState({ currentTabItem: item });

    if (currentTabItem !== item && item === 1) {
      if (!isClickTab) {
        const params = {
          wx_department_id: currentWxDepartmentId,
          wx_user_id: currentWxUserId,
        };

        AnalysisInformation.clearParams(params, {
          currentWxDepartmentId,
          currentWxUserId,
        });

        this.fetchCustomerPortrait(params);
      }
      this.setState({ isClickTab: true });
    }
  }

  renderAll() {
    const { all } = this.props;
    const { currentWxUserId, currentWxDepartmentId } = this.state;

    const params = {
      wx_department_id: currentWxDepartmentId,
      wx_user_id: currentWxUserId,
    };

    AnalysisInformation.clearParams(params, {
      currentWxDepartmentId,
      currentWxUserId,
    });

    return (
      !all.isFetching && (
        <DataCollection
          type="infoAll"
          dataSource={all.data}
          action={fetchInfoAllReport}
          onChangeTimeObj={this.handleChangeTimeObj}
          params={params}
          {...this.props}
        />
      )
    );
  }

  renderCustomerActionBar() {
    const { customerAction } = this.props;
    if (customerAction.isFetching) {
      return;
    }

    return <CustomerAction dataSource={customerAction.data} />;
  }

  renderCustomerInterestBar() {
    const { interest } = this.props;
    if (interest.isFetching) {
      return;
    }
    return <CustomerInterest dataSource={interest.data} />;
  }

  renderCustomerAreaBar() {
    const { customerArea } = this.props;
    if (customerArea.isFetching) {
      return;
    }

    return <CustomerArea dataSource={customerArea.data} />;
  }

  renderGender() {
    const { customerGender } = this.props;
    const dataSource = customerGender.data;
    if (customerGender.isFetching) {
      return;
    }

    return <CustomerGender dataSource={dataSource} />;
  }

  handleDropDownGroupChange(result) {
    this.setState({ dropDownId: result });
  }

  renderDropDownContent() {
    const { dropDownId } = this.state;
    let content = '';

    if (this.state.deptList.length > 0 && this.state.deptUserList.length > 0) {
      content = (
        <DropDownGroup
          onChange={this.handleDropDownGroupChange}
          defaultValue={dropDownId}
        >
          <DropDown
            identification="1"
            list={this.state.deptList}
            onHandleEvent={this.handleWxDeptEvent}
          />
          <DropDown
            identification="2"
            list={this.state.deptUserList}
            onHandleEvent={this.handleWxUserEvent}
          />
        </DropDownGroup>
      );
    }

    return content;
  }

  renderAnalysisChart() {
    const { dispatch } = this.props;
    const {
      currentWxUserId,
      currentWxDepartmentId,
      chartDataList,
    } = this.state;

    const params = {
      wx_department_id: currentWxDepartmentId,
      wx_user_id: currentWxUserId,
    };

    AnalysisInformation.clearParams(params, {
      currentWxDepartmentId,
      currentWxUserId,
    });

    return chartDataList.map((item, idx) => {
      let html = '';
      if (!item.result.isFetching) {
        html = (
          <AnalysisChart
            key={`__${idx}`}
            action={item.action}
            title={item.title}
            type={item.type}
            sum={item.result.sum}
            dataSource={item.result.data}
            onChangeTimeObj={this.handleChangeTimeObj}
            params={params}
            dispatch={dispatch}
          />
        );
      }

      return html;
    });
  }

  render() {
    return (
      <Wrapper>
        {this.renderDropDownContent()}

        <StyledTab onChange={this.handleTabChange}>
          <Tab.Panel title="概览">
            <StyledScroll>
              <Scroll>
              <UpdateTime />
              {this.renderAll()}
              {this.renderAnalysisChart()}
              </Scroll>
            </StyledScroll>
          </Tab.Panel>
          <Tab.Panel title="客户画像">
            <StyledScroll>
            <Scroll>
              <UpdateTime />
              {this.renderCustomerActionBar()}
              {this.renderCustomerInterestBar()}
              {this.renderCustomerAreaBar()}
              {this.renderGender()}
              </Scroll>
            </StyledScroll>
          </Tab.Panel>
        </StyledTab>

        <NavBar />
      </Wrapper>
    );
  }
}

function handleData(data, type) {
  let result = [];

  if (type === 'wxDepts') {
    result.push({ id: '', name: '全部部门' });
  } else if (type === 'wxDeptUsers' && window.AppConf.userRoe === '1') {
    result = [{ id: '', name: '全部用户' }];
  }

  if (data) {
    result.push(...data.list);
  }

  return result;
}

function handleAnalysisChartData(opts) {
  const list = [];

  if (opts.customer) {
    list.push({
      result: opts.customer,
      title: '新增客户数',
      action: fetchCustomerReport,
      type: 'customer',
    });
  }

  if (opts.forward) {
    list.push({
      result: opts.forward,
      title: '新增转发数',
      action: fetchForwardReport,
      type: 'forward',
    });
  }

  if (opts.customerFollow) {
    list.push({
      result: opts.customerFollow,
      title: '新增跟进数',
      action: fetchFollowReport,
      type: 'customerFollow',
    });
  }

  if (opts.customerSave) {
    list.push({
      result: opts.customerSave,
      title: '新增保存数',
      action: fetchSaveReport,
      type: 'customerSave',
    });
  }

  if (opts.customerSupport) {
    list.push({
      result: opts.customerSupport,
      title: '新增点赞数',
      action: fetchSupportReport,
      type: 'customerSupport',
    });
  }

  if (opts.customerConsult) {
    list.push({
      result: opts.customerConsult,
      title: '咨询客户数',
      action: fetchConsultReport,
      type: 'customerConsult',
    });
  }

  if (opts.customerActive) {
    list.push({
      result: opts.customerActive,
      title: '活跃客户数',
      action: fetchActiveCustomerReport,
      type: 'customerActive',
    });
  }

  if (opts.customerRead) {
    list.push({
      result: opts.customerRead,
      title: '新增浏览数',
      action: fetchReadReport,
      type: 'customerRead',
    });
  }

  return list;
}

function getTimeList() {
  return [
    { type: 'infoAll', id: 'all' },
    { type: 'customer', id: '7day' },
    { type: 'forward', id: '7day' },
    { type: 'customerFollow', id: '7day' },
    { type: 'customerSave', id: '7day' },
    { type: 'customerSupport', id: '7day' },
    { type: 'customerConsult', id: '7day' },
    { type: 'customerActive', id: '7day' },
    { type: 'customerRead', id: '7day' },
  ];
}

function mapStateToProps(state) {
  const {
    information: {
      customer,
      forward,
      interest,
      customerAction,
      customerCategory,
      all,
      customerFollow,
      customerConsult,
      customerArea,
      customerGender,
      customerSave,
      customerSupport,
      customerActive,
      customerRead,
    },
    department: { wxDepts, wxDeptUsers },
  } = state;

  return {
    interest,
    customerAction,
    customerCategory,
    all,
    customerArea,
    customerGender,
    chartDataList: handleAnalysisChartData({
      customer,
      forward,
      customerFollow,
      customerSave,
      customerSupport,
      customerConsult,
      customerActive,
      customerRead,
    }),
    dateList: getTimeList(),
    wxDepts: handleData(wxDepts, 'wxDepts'),
    wxDeptUsers: handleData(wxDeptUsers, 'wxDeptUsers'),
  };
}

AnalysisInformation.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
  wxDepts: PropTypes.array,
  wxDeptUsers: PropTypes.array,
  chartDataList: PropTypes.array,
  dateList: PropTypes.array,
};

export default connect(mapStateToProps)(withRouter(AnalysisInformation));
