import { combineReducers } from 'redux';

import product from './product';
import chat from './chat';

import { fetchWebsite } from './official';

import {
  getCustomerRevisitLog,
  getReportCount,
  getCustomerDetail,
  updateCustomer,
  searchCustomer,
  getCustomersOrderByCreateTime,
  getCustomersOrderByLastInfoTime,
  fetchCustomer,
  getCustomerInformations,
  getCustomersByCreateTime,
  getCustomersOrderByCreateTimeAsc,
} from './customer';

import {
  fetchUserInfo,
  getUserIntroduceInfo,
  getWxUsers,
  getWxUser,
  getWxUserQrcode,
} from './user';

import {
  fetchAchieveAnalysis,
  fetchGroupInfoAnalysis,
  fetchGroupForwardAnalysis,
  fetchGroupCustomerAnalysis,
  fetchCustomerCategoryAnalysis,
  fetchCustomerActionAnalysis,
  fetchCustomerReport,
  fetchForwardReport,
  fetchFollowReport,
  fetchCustomerInterest,
  fetchInfoAllReport,
  fetchInfoCustomerAreaReport,
  fetchInfoCustomerGenderReport,
  fetchSaveReport,
  fetchSupportReport,
  fetchConsultReport,
  fetchMessageReport,
  fetchActiveCustomerReport,
  fetchReadReport,
} from './analysis';

import { fetchWxUserDepts, fetchWxUserDeptUsers } from './department';

import syncStateStore from './syncStateStore';

import { redPacket } from './redPacket';

const user = combineReducers({
  userInfo: fetchUserInfo,
  introduceInfo: getUserIntroduceInfo,
  wxUsers: getWxUsers,
  wxUser: getWxUser,
  qrcode: getWxUserQrcode,
});

const website = combineReducers({
  webSite: fetchWebsite,
});

const customer = combineReducers({
  orderyByCreateTime: getCustomersOrderByCreateTime,
  orderyByLastTime: getCustomersOrderByLastInfoTime,
  list: fetchCustomer,
  searchlist: searchCustomer,
  detail: getCustomerDetail,
  bindList: getCustomersOrderByCreateTimeAsc,
});

const revisit = combineReducers({
  customerLog: getCustomerInformations,
});

// 绩效分析
const achieve = combineReducers({
  newCustomer: fetchAchieveAnalysis,
  consultCustomer: fetchAchieveAnalysis,
  personalCustomer: fetchAchieveAnalysis,
});

const group = combineReducers({
  info: fetchGroupInfoAnalysis,
  forward: fetchGroupForwardAnalysis,
  customer: fetchGroupCustomerAnalysis,
});

const information = combineReducers({
  customerCategory: fetchCustomerCategoryAnalysis,
  customerAction: fetchCustomerActionAnalysis,
  customer: fetchCustomerReport,
  forward: fetchForwardReport,
  customerFollow: fetchFollowReport,
  interest: fetchCustomerInterest,
  all: fetchInfoAllReport,
  customerArea: fetchInfoCustomerAreaReport,
  customerGender: fetchInfoCustomerGenderReport,
  customerSave: fetchSaveReport,
  customerSupport: fetchSupportReport,
  customerConsult: fetchConsultReport,
  customerMessage: fetchMessageReport,
  customerActive: fetchActiveCustomerReport,
  customerRead: fetchReadReport,
});

const department = combineReducers({
  wxDepts: fetchWxUserDepts,
  wxDeptUsers: fetchWxUserDeptUsers,
});

export default combineReducers({
  revisitLog: getCustomerRevisitLog,
  report: getReportCount,
  customerDetail: getCustomerDetail,
  updateCustomer,
  searchCustomer,

  website,
  user,
  product,
  customer,
  revisit,
  chat,
  department,

  achieve,
  group,
  information,

  redPacket,

  syncStateStore,

  conf: (state = {}) => state,
  orgInfo: (state = {}) => state,
  currentUser: (state = {}) => state,
});
