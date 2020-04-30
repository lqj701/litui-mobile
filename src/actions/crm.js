import { createAction } from 'redux-actions';
import { CALL_API } from '../utils/api';

export const generateUrlAct = createAction('GENERATEURLACT');
export const enterCrmAct = createAction('ENTERCRMACT');
export const getCrmUrlAct = createAction('GETCRMURLACT');

export function generateUrl(params = {}) {
  return {
    [CALL_API]: {
      act: generateUrlAct,
      endpoint: `/api/crm/generateUrl`,
      dataKey: 'response',
      params
    }
  };
}

export function enterCrm(params = {}) {
  return {
    [CALL_API]: {
      act: enterCrmAct,
      endpoint: `/api/crm/enterCrm`,
      dataKey: 'response',
      method: 'POST',
      params
    }
  };
}

export function getCrmUrl(params = {}) {
  return {
    [CALL_API]: {
      act: getCrmUrlAct,
      endpoint: `/api/crm/crmUrl/get`,
      dataKey: 'response',
      params
    }
  };
}
