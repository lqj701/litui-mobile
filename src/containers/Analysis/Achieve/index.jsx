import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { fetchAchieveAnalysis } from '../../../actions/analysis';
import { fetchWxUserDepts, fetchWxUserDeptUsers } from '../../../actions/department';

import NavBar from '../NavBar';
import Tab from '../../../components/Tab';
import Cell from '../../../components/Cell';
import DropDown, { DropDownGroup } from '../../../components/DropDown';
import PullToRefresh from '../../../components/PullToRefresh';
import UpdateTime from '../../../components/UpdateTime';
import { moneyFormatUnit } from '../../../utils/utils';
import Toast from '../../../components/Toast';

import firstPng from '../../../assets/images/first@3x.png';
import secondPng from '../../../assets/images/second@3x.png';
import thirdPng from '../../../assets/images/third@3x.png';

const StyledContainer = styled.div`
  height: calc(100% - 0.55rem);
  .b-wrapper {
    top: 2.8rem;
  }
`;

const StyledTab = styled(Tab)`
  height: 100%;
  background: #fff;
  margin-top: 0.3rem;
`;

const TabPanel = styled(Tab.Panel)`
  height: 100%;
`;

const StyledTabPart = styled('div')`
  background: rgb(237, 236, 242);
  font-size: 0.26rem;
  color: #999999;
  height: 0.66rem;
  line-height: 0.66rem;
  padding-left: 0.3rem;
`;

const StyledCell = styled(Cell)`
  padding: 0.2rem 0;
`;

const StyledHeader = styled.div`
  width: 0.4rem;
  text-align: center;
  margin-right: 0.3rem;
`;

const RankImg = styled.img`
  display: inline-block;
  width: 0.4rem;
`;

const StyleName = styled.div`
  font-size: 0.34rem;
  padding: 0.08rem 0;
`;
const StyleResp = styled.div`
  font-size: 0.26rem;
  color: #888888;
  padding: 0.08rem 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 90%;
  overflow: hidden;
`;
const StyledDescription = styled.div`
  font-size: 0.4rem;
  color: #222222;
`;

class AnalysisAchieve extends React.Component {
  static getDateList() {
    //  这里为了数据传输字段名统一，改为 id传递
    return [
      { id: 'all', name: '全部' },
      { id: 'yesterday', name: '昨天' },
      { id: '7day', name: '近7天' },
      { id: '15day', name: '近15天' },
      { id: '30day', name: '近30天' },
    ];
  }

  static handleRankImg(idx) {
    let imgName = firstPng;
    switch (idx) {
    case 0:
      imgName = firstPng;
      break;
    case 1:
      imgName = secondPng;
      break;
    case 2:
      imgName = thirdPng;
      break;
    default:
      imgName = firstPng;
      break;
    }

    return <RankImg src={imgName} />;
  }

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
      data: [],
      deptList: props.wxDepts,
      deptUserList: props.wxDeptUsers,
      dateList: AnalysisAchieve.getDateList(),
      rankType: 'customer',
      currentTime: AnalysisAchieve.getDateList()[1].id,
      currentWxDepartmentId: '',
      currentWxUserId: '',
      currentPage: 1,
      hasNext: 0,
    };

    this.handleDropDownGroupChange = this.handleDropDownGroupChange.bind(this);
    this.handleWxDeptEvent = this.handleWxDeptEvent.bind(this);
    this.handleWxUserEvent = this.handleWxUserEvent.bind(this);
    this.handleTimeEvent = this.handleTimeEvent.bind(this);
    this.handleTab = this.handleTab.bind(this);

    this.pullDownFreshAction = this.pullDownFreshAction.bind(this);
    this.loadMoreData = this.loadMoreData.bind(this);

    // 防止多次连续操作，发起多次请求
    this.isFetching = false;
  }

  componentWillMount() {
    const { currentPage, rankType, currentTime } = this.state;

    this.getWxDepts({ page: 1 }).then(() => {
      this.getWxDeptUsers({
        page: 1,
      }).then(() => {
        this.getAchieveAnalysis({
          rankType,
          page: currentPage,
          time: currentTime,
        });
      });
    });
  }

  componentDidMount() {
    document.title = '绩效分析';
  }

  componentWillReceiveProps(nextProps) {
    this.isFetching = false;
    // 新增客户排行逻辑
    if (nextProps.newCustomer !== this.props.newCustomer) {
      const { data, currentPage } = this.state;
      const {
        newCustomer: { hasNext, list },
      } = nextProps;

      if (currentPage === 1) {
        this.setState({
          hasNext,
          data: list,
          currentPage: currentPage + 1,
        });
      } else {
        this.setState({
          hasNext,
          data: [...data, ...list],
          currentPage: currentPage + 1,
        });
      }
    }

    // 咨询客户排行逻辑
    if (nextProps.consultCustomer !== this.props.consultCustomer) {
      const { data, currentPage } = this.state;
      const {
        consultCustomer: { hasNext, list },
      } = nextProps;

      if (currentPage === 1) {
        this.setState({
          hasNext,
          data: list,
          currentPage: currentPage + 1,
        });
      } else {
        this.setState({
          hasNext,
          data: [...data, ...list],
          currentPage: currentPage + 1,
        });
      }
    }

    // 个人转发排行逻辑
    if (nextProps.personalCustomer !== this.props.personalCustomer) {
      const { data, currentPage } = this.state;
      const {
        personalCustomer: { hasNext, list },
      } = nextProps;

      if (currentPage === 1) {
        this.setState({
          hasNext,
          data: list,
          currentPage: currentPage + 1,
        });
      } else {
        this.setState({
          hasNext,
          data: [...data, ...list],
          currentPage: currentPage + 1,
        });
      }
    }

    if (nextProps.wxDepts !== this.props.wxDepts) {
      this.setState({
        deptList: nextProps.wxDepts,
      });
    }

    if (nextProps.wxDeptUsers !== this.props.wxDeptUsers) {
      this.setState({
        deptUserList: nextProps.wxDeptUsers,
      });
    }
  }

  getAchieveAnalysis({ page, rankType, time, wx_department_id, wx_user_id }) {
    const params = {
      rankType,
      page,
      time,
      row: 50,
    };

    if (typeof wx_department_id !== 'undefined') {
      params.wx_department_id = wx_department_id;
    } else {
      delete params.wx_department_id;
    }

    if (typeof wx_user_id !== 'undefined') {
      params.wx_user_id = wx_user_id;
    } else {
      delete params.wx_user_id;
    }
    Toast.loading('正在获取数据');
    return this.props.dispatch(fetchAchieveAnalysis(params)).then(() => Toast.hide());
  }

  getWxDepts({ page }) {
    return this.props.dispatch(
      fetchWxUserDepts({
        page,
        row: 50,
        noLimit: true,
      })
    );
  }

  getWxDeptUsers({ page, wx_department_id }) {
    const params = {
      page,
      row: 50,
      noLimit: true,
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
      const { deptUserList, rankType, currentTime } = this.state;
      const defaultUserId = deptUserList[0].id;
      const AchieveAnalysisParams = {
        page: 1,
        rankType,
        time: currentTime,
        wx_department_id: currentWxDepartmentId,
        wx_user_id: defaultUserId,
      };

      AnalysisAchieve.clearParams(AchieveAnalysisParams, {
        currentWxDepartmentId,
        currentWxUserId: defaultUserId,
      });

      this.setState({ currentWxUserId: defaultUserId, currentPage: 1 });
      this.getAchieveAnalysis(AchieveAnalysisParams);
    });
  }

  handleWxUserEvent(result) {
    const { currentWxDepartmentId, currentTime, rankType } = this.state;
    const currentWxUserId = result.currentObj.id;
    const AchieveAnalysisParams = {
      rankType,
      page: 1,
      time: currentTime,
      wx_department_id: currentWxDepartmentId,
      wx_user_id: currentWxUserId,
    };

    AnalysisAchieve.clearParams(AchieveAnalysisParams, {
      currentWxDepartmentId,
      currentWxUserId,
    });

    this.setState({ currentWxUserId, currentPage: 1 });
    this.getAchieveAnalysis(AchieveAnalysisParams);
  }

  handleTimeEvent(result) {
    const { rankType, currentWxDepartmentId, currentWxUserId } = this.state;
    const currentTime = result.currentObj.id;
    const AchieveAnalysisParams = {
      rankType,
      page: 1,
      time: currentTime,
      wx_department_id: currentWxDepartmentId,
      wx_user_id: currentWxUserId,
    };

    AnalysisAchieve.clearParams(AchieveAnalysisParams, {
      currentWxDepartmentId,
      currentWxUserId,
    });

    this.setState({ currentTime, currentPage: 1 });
    this.getAchieveAnalysis(AchieveAnalysisParams);
  }

  pullDownFreshAction() {
    const {
      rankType,
      currentTime,
      currentWxDepartmentId,
      currentWxUserId,
    } = this.state;
    const AchieveAnalysisParams = {
      page: 1,
      rankType,
      time: currentTime,
      wx_department_id: currentWxDepartmentId,
      wx_user_id: currentWxUserId,
    };

    AnalysisAchieve.clearParams(AchieveAnalysisParams, {
      currentWxDepartmentId,
      currentWxUserId,
    });

    this.setState({ currentPage: 1 });
    return this.getAchieveAnalysis(AchieveAnalysisParams);
  }

  loadMoreData() {
    const {
      rankType,
      currentTime,
      currentWxDepartmentId,
      currentWxUserId,
      currentPage,
      hasNext,
    } = this.state;

    const params = {
      page: currentPage,
      rankType,
      time: currentTime,
      wx_department_id: currentWxDepartmentId,
      wx_user_id: currentWxUserId,
    };

    AnalysisAchieve.clearParams(params, {
      currentWxDepartmentId,
      currentWxUserId,
    });

    if (hasNext) {
      return this.getAchieveAnalysis(params);
    } else {
      return Promise.resolve(true);
    }
  }

  handleTab(result) {
    let rankType = 'customer';

    switch (result) {
    case 0:
      rankType = 'customer';
      break;
    case 1:
      rankType = 'consult';
      break;
    case 2:
      rankType = 'forward';
      break;
    default:
      rankType = 'customer';
      break;
    }

    this.setState({ rankType, currentPage: 1 });

    const { currentWxDepartmentId, currentWxUserId, currentTime } = this.state;
    const params = {
      rankType,
      time: currentTime,
      page: 1,
      wx_department_id: currentWxDepartmentId,
      wx_user_id: currentWxUserId,
    };

    AnalysisAchieve.clearParams(params, {
      currentWxDepartmentId,
      currentWxUserId,
    });

    if(!this.isFetching) {
      this.isFetching = true;
      this.getAchieveAnalysis(params);
    }
  }

  renderContent(data) {
    const Title = ({ name, resp }) => (
      <div style={{ width: '100%' }}>
        <StyleName>{name}</StyleName>
        <StyleResp>{resp}</StyleResp>
      </div>
    );
    let content = '';

    if (data) {
      content = (
        <StyledContainer>
          <PullToRefresh
            offset="3rem"
            pullDownRefresh={this.pullDownFreshAction}
            pullUpLoad={this.loadMoreData}
          >
            <UpdateTime />
            {data.map((item, idx) => {
              let rank = idx + 1;
              if (idx < 3) rank = AnalysisAchieve.handleRankImg(idx);

              return (
                <StyledCell
                  key={`__${idx}`}
                  header={<StyledHeader>{rank}</StyledHeader>}
                  icon={<img src={item.avatar} />}
                  title={<Title name={item.name} resp={item.departmentName} />}
                  description={
                    <StyledDescription>
                      {moneyFormatUnit(item.count)}
                    </StyledDescription>
                  }
                  onClick={() => {}}
                />
              );
            })}
          </PullToRefresh>
        </StyledContainer>
      );
    }
    return content;
  }

  handleDropDownGroupChange(result) {
    this.setState({ dropDownId: result });
  }

  render() {
    const { dropDownId } = this.state;
    let dropDownContent = '';

    if (this.state.deptList.length > 0 && this.state.deptUserList.length > 0) {
      dropDownContent = (
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
          <DropDown
            identification="3"
            activeItem={AnalysisAchieve.getDateList()[1]}
            list={this.state.dateList}
            onHandleEvent={this.handleTimeEvent}
          />
        </DropDownGroup>
      );
    }

    return (
      <div style={{ height: '100%' }}>
        {dropDownContent}

        <StyledTab customStyle={{ height: '100%' }} onChange={this.handleTab}>
          <TabPanel style={{ height: '100%' }} title="新增客户排行">
            {this.renderContent(this.state.data)}
          </TabPanel>

          <TabPanel style={{ height: '100%' }} title="咨询客户排行">
            {this.renderContent(this.state.data)}
          </TabPanel>

          <TabPanel style={{ height: '100%' }} title="个人转发排行">
            {this.renderContent(this.state.data)}
          </TabPanel>
        </StyledTab>

        <NavBar />
      </div>
    );
  }
}

function handleData(data, type) {
  let result = [];

  if (type === 'wxDepts') {
    result.push({ id: '', name: '全部部门' });
  } else if (type === 'wxDeptUsers') {
    result = [{ id: '', name: '全部用户' }];
  }

  if (data) {
    result.push(...data.list);
  }

  return result;
}

function mapStateToProps(state) {
  const {
    achieve: { newCustomer, consultCustomer, personalCustomer },
    department: { wxDepts, wxDeptUsers },
  } = state;

  return {
    newCustomer,
    consultCustomer,
    personalCustomer,
    wxDepts: handleData(wxDepts, 'wxDepts'),
    wxDeptUsers: handleData(wxDeptUsers, 'wxDeptUsers'),
  };
}

AnalysisAchieve.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
  newCustomer: PropTypes.object,
  consultCustomer: PropTypes.object,
  personalCustomer: PropTypes.object,
  wxDepts: PropTypes.array,
  wxDeptUsers: PropTypes.array,
};

export default connect(mapStateToProps)(withRouter(AnalysisAchieve));
