import { createAction } from 'redux-actions';
import { CALL_API } from '../utils/api';

export const fetchWebsiteAct = createAction('FETCH_WEBSITE');
export const updateWebsiteAct = createAction('UPDATE_WEBSITE');

// 查看
export function fetchWebsite(params = {}) {
  return {
    [CALL_API]: {
      act: fetchWebsiteAct,
      endpoint: 'api/wx/website/query',
    },
  };
}

// 2. 官网编辑
export function updateWebsite(params = {}) {
  return {
    [CALL_API]: {
      act: updateWebsiteAct,
      endpoint: 'api/wx/website/editWebsite',
      method: 'POST',
      dataKey: 'code',
      params,
    },
  };
}
