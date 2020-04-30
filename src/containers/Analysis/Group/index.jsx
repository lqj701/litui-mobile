import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  fetchGroupInfoAnalysis,
  fetchGroupForwardAnalysis,
  fetchGroupCustomerAnalysis,
} from '../../../actions/analysis';

import Tab from '../../../components/Tab';
import NavBar from '../NavBar';
import GroupCustomer from './Customer';
import GroupForward from './Forward';
import GroupInfo from './Info';

const StyledTab = styled(Tab)`
  background: #fff;
`;

const StyledTabPart = styled('div')`
  background: rgb(237, 236, 242);
  font-size: 0.26rem;
  color: #999999;
  height: 0.66rem;
  line-height: 0.66rem;
  padding-left: 0.3rem;
`;

const Wrapper = styled.div`
  height: 100%;
`;

class AnalysisGroup extends React.Component {
  static propTypes = {
    dispatch: propsType.func,
    history: propsType.object,
  };

  static defaultProps = {};

  componentDidMount() {
    document.title = '群分析';
    this.fetchGroupCustomer(1);
  }

  fetchGroupCustomer = page => {
    return this.props.dispatch(
      fetchGroupCustomerAnalysis({
        wx_department_id: 1,
        wx_user_id: 1,
        page: page,
        row: 50,
      })
    );
  };

  fetchGroupForward() {
    return this.props.dispatch(
      fetchGroupForwardAnalysis({
        wx_department_id: 1,
        wx_user_id: 1,
        page: 1,
        row: 50,
      })
    );
  }

  fetchGroupInfo() {
    return this.props.dispatch(
      fetchGroupInfoAnalysis({
        wx_department_id: 1,
        wx_user_id: 1,
        page: 1,
        row: 50,
      })
    );
  }

  handleTabChange = index => {
    const func = ['fetchGroupCustomer', 'fetchGroupForward', 'fetchGroupInfo'];
    this[func[index]](1);
  };

  render() {
    const { customer, forward, info } = this.props;

    return (
      <Wrapper>
        <StyledTab
          onChange={this.handleTabChange}
          part={<StyledTabPart>以下数据更新至2018-04-10</StyledTabPart>}
        >
          <Tab.Panel title="获客分析">
            {customer && (
              <GroupCustomer
                dataSource={customer}
                dispath={this.fetchGroupCustomer}
              />
            )}
          </Tab.Panel>

          <Tab.Panel title="转发分析">
            {forward && <GroupForward dataSource={forward} />}
          </Tab.Panel>

          <Tab.Panel title="情报分析">
            {info && <GroupInfo dataSource={info} />}
          </Tab.Panel>
        </StyledTab>

        <NavBar />
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  const {
    group: { customer, forward, info },
  } = state;

  return {
    customer,
    forward,
    info,
  };
}

export default connect(mapStateToProps)(AnalysisGroup);
