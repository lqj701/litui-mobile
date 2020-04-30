import { createAction } from 'redux-actions';
import { CALL_API } from '../utils/api';

export const fetchWxUserDeptsAct = createAction('FETCH_WX_USER_DEPTS');
export const fetchWxUserDeptUsersAct = createAction('FETCH_WX_USER_DEPT_USERS');

/**
 * 获取所有部门
 * @param {object} params
 */
export function fetchWxUserDepts(params = {}) {
  return {
    [CALL_API]: {
      act: fetchWxUserDeptsAct,
      endpoint: 'api/wx/wxUser/getDepts',
      params,
    },
  };
}

/**
 * 获取所有部门用户
 * @param {object} params
 */
export function fetchWxUserDeptUsers(params = {}) {
  return {
    [CALL_API]: {
      act: fetchWxUserDeptUsersAct,
      endpoint: 'api/wx/wxUser/getDeptWxUsers',
      params,
    },
  };
}