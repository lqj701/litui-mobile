import { createAction } from 'redux-actions';
import { CALL_API } from '../utils/api';

export const fetchAchieveAnalysisAct = createAction('FETCH_ACHIEVE_ANALY');
export const fetchGroupInfoAnalysisAct = createAction('FETCH_GROUP_INFO_ANALY');
export const fetchGroupForwardAnalysisAct = createAction('FETCH_GROUP_FORWARD_ANALY');
export const fetchGroupCustomerAnalysisAct = createAction('FETCH_GROUP_CUSTOMER_ANALY');
export const fetchCustomerCategoryAnalysisAct = createAction('FETCH_INFO_CUSTOMER_CATE_ANALY');
export const fetchCustomerActionAnalysisAct = createAction('FETCH_INFO_CUSTOMER_ACTION_ANALY');
export const fetchCustomerReportAct = createAction('FETCH_CUSTOMER_REPORT');
export const fetchForwardReportAct = createAction('FETCH_FORWARD_REPORT');
export const fetchCustomerInterestAct = createAction('FETCH_CUSTOMER_INTEREST');
export const fetchFollowReportAct = createAction('FETCH_FOLLOW_REPORT');
export const fetchInfoAllReportAct = createAction('FETCH_INFO_ALL_REPORT');
export const fetchInfoCustomerAreaReportAct = createAction('FETCH_INFO_AREA_REPORT');
export const fetchInfoCustomerGenderReportAct = createAction('FETCH_INFO_GENDER_REPORT');

export const fetchSaveReportAct = createAction('FETCH_CHART_SAVE_REPORT');
export const fetchSupportReportAct = createAction('FETCH_CHART_SUPPORT_REPORT');
export const fetchConsultReportAct = createAction('FETCH_CHART_CONSULT_REPORT');
export const fetchMessageReportAct = createAction('FETCH_CHART_MESSAGE_REPORT');
export const fetchActiveCustomerReportAct = createAction('FETCH_CHART_AC_REPORT');
export const fetchReadReportAct = createAction('FETCH_CHART_READ_REPORT');

/**
 * 绩效分析
 * @param {object} params
 * @return {object}
 */
export function fetchAchieveAnalysis(params = {}) {
  return {
    [CALL_API]: {
      act: fetchAchieveAnalysisAct,
      endpoint: `api/data/achieve`,
      params,
    },
  };
}

/**
 * 群分析情报分析
 * @param {object} params {wx_department_id, wx_user_id, page, row}
 */
export function fetchGroupInfoAnalysis(params = {}) {
  return {
    [CALL_API]: {
      act: fetchGroupInfoAnalysisAct,
      endpoint: 'api/data/group/informationAnalysis',
      params,
    },
  };
}

/**
 * 群分析转发分析
 * @param {object} params {wx_department_id, wx_user_id, page, row}
 */
export function fetchGroupForwardAnalysis(params = {}) {
  return {
    [CALL_API]: {
      act: fetchGroupForwardAnalysisAct,
      endpoint: 'api/data/group/forwardAnalysis',
      params,
    },
  };
}

/**
 * 群分析获客分析
 * @param {object} params {wx_department_id, wx_user_id, page, row}
 */
export function fetchGroupCustomerAnalysis(params = {}) {
  return {
    [CALL_API]: {
      act: fetchGroupCustomerAnalysisAct,
      endpoint: 'api/data/group/customerAnalysis',
      params,
    },
  };
}

/**
 * 客户行为分析、圆图
 * @param {object} params {basis, basis, wx_department_id, wx_user_id}
 */
export function fetchCustomerCategoryAnalysis(params = {}) {
  return {
    [CALL_API]: {
      act: fetchCustomerCategoryAnalysisAct,
      endpoint: 'api/data/customer/category',
      params,
    },
  };
}

/**
 * 客户行为分析、柱状图
 * @param {object} params {time, wx_department_id, wx_user_id}
 */
export function fetchCustomerActionAnalysis(params = {}) {
  return {
    [CALL_API]: {
      act: fetchCustomerActionAnalysisAct,
      endpoint: 'api/data/customer/action',
      params,
    },
  };
}

/**
 * 客户报表
 * @param {object} params {time, wx_department_id, wx_user_id}
 */
export function fetchCustomerReport(params = {}) {
  return {
    [CALL_API]: {
      act: fetchCustomerReportAct,
      endpoint: 'api/data/eagereye/customerReport',
      params,
    },
  };
}

/**
 * 转发报表
 * @param {object} params {time, wx_department_id, wx_user_id}
 */
export function fetchForwardReport(params = {}) {
  return {
    [CALL_API]: {
      act: fetchForwardReportAct,
      endpoint: 'api/data/eagereye/forwardReport',
      params,
    },
  };
}
/**
 * 转发报表
 * @param {object} params {time, wx_department_id, wx_user_id}
 */
export function fetchCustomerInterest(params = {}) {
  return {
    [CALL_API]: {
      act: fetchCustomerInterestAct,
      endpoint: 'api/data/customer/interest',
      params,
    },
  };
}

/**
 * 跟进报表
 * @param {object} params {time, wx_department_id, wx_user_id}
 */
export function fetchFollowReport(params = {}) {
  return {
    [CALL_API]: {
      act: fetchFollowReportAct,
      endpoint: 'api/data/eagereye/followReport',
      params,
    },
  };
}

/**
 * 保存报表
 * @param {object} params {time, wx_department_id, wx_user_id}
 */
export function fetchSaveReport(params = {}) {
  return {
    [CALL_API]: {
      act: fetchSaveReportAct,
      endpoint: 'api/data/eagereye/saveReport',
      params,
    },
  };
}

/**
 * 点赞报表
 * @param {object} params {time, wx_department_id, wx_user_id}
 */
export function fetchSupportReport(params = {}) {
  return {
    [CALL_API]: {
      act: fetchSupportReportAct,
      endpoint: 'api/data/eagereye/supportReport',
      params,
    },
  };
}
/**
 * 咨询报表
 * @param {object} params {time, wx_department_id, wx_user_id}
 */
export function fetchConsultReport(params = {}) {
  return {
    [CALL_API]: {
      act: fetchConsultReportAct,
      endpoint: 'api/data/eagereye/consultReport',
      params,
    },
  };
}
/**
 * 消息报表
 * @param {object} params {time, wx_department_id, wx_user_id}
 */
export function fetchMessageReport(params = {}) {
  return {
    [CALL_API]: {
      act: fetchMessageReportAct,
      endpoint: 'api/data/eagereye/messageReport',
      params,
    },
  };
}
/**
 * 活跃客户报表
 * @param {object} params {time, wx_department_id, wx_user_id}
 */
export function fetchActiveCustomerReport(params = {}) {
  return {
    [CALL_API]: {
      act: fetchActiveCustomerReportAct,
      endpoint: 'api/data/eagereye/activeCustomerReport',
      params,
    },
  };
}
/**
 * 浏览数报表
 * @param {object} params {time, wx_department_id, wx_user_id}
 */
export function fetchReadReport(params = {}) {
  return {
    [CALL_API]: {
      act: fetchReadReportAct,
      endpoint: 'api/data/eagereye/readReport',
      params,
    },
  };
}
/**
 * 鹰眼分析首页，按公司部门、用户或者时间的纬度获取客户总数、跟进在弄归属、浏览数、被转发数、被保存数、获赞数
 * @param {object} params {time, wx_department_id, wx_user_id}
 * 时间纬度：today 今天、 yesterday 昨天 、 7day  近7天、  15day 近15天   、30day  近30天
 */
export function fetchInfoAllReport(params = {}) {
  return {
    [CALL_API]: {
      act: fetchInfoAllReportAct,
      endpoint: 'api/data/eagereye/all',
      params,
    },
  };
}

/**
 * 客户地区分析、柱状图
 * @param {object} params {wx_department_id, wx_user_id}
 */
export function fetchInfoCustomerAreaReport(params = {}) {
  return {
    [CALL_API]: {
      act: fetchInfoCustomerAreaReportAct,
      endpoint: 'api/data/customer/areaAnalysis',
      params,
    },
  };
}
/**
 * 客户性别分析、饼图
 * @param {object} params {wx_department_id, wx_user_id}
 */
export function fetchInfoCustomerGenderReport(params = {}) {
  return {
    [CALL_API]: {
      act: fetchInfoCustomerGenderReportAct,
      endpoint: 'api/data/customer/genderAnalysis',
      params,
    },
  };
}
