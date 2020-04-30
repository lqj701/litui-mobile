import {
  createAction,
} from 'redux-actions';
import { CALL_API } from '../utils/api';


export const redPacketBindAct = createAction('RED_PACKET_BIND');
export const redPacketUnBindAct = createAction('RED_PACKET_UNBIND');
export const redPackethaveBindedAct = createAction('RED_PACKET_HAVEBIND');
export const redPacketisBindedAct = createAction('RED_PACKET_ISBIND');

export function redPacketBind(params = {}) {
  return {
    [CALL_API]: {
      act: redPacketBindAct,
      endpoint: `/api/wx/redpacket/bind`,
      method: 'POST',
      dataKey: 'code',
      params,
    },
  };
}

export function redPacketUnBind(params = {}) {
  return {
    [CALL_API]: {
      act: redPacketUnBindAct,
      endpoint: `/api/wx/redpacket/unbind`,
      method: 'POST',
      dataKey: 'code',
      params,
    },
  };
}


export function redPackethaveBinded() {
  return {
    [CALL_API]: {
      act: redPackethaveBindedAct,
      endpoint: `/api/wx/redpacket/haveBinded`,
      method: 'POST',
      dataKey: 'response',
    },
  };
}

export function redPacketisBinded(params = {}) {
  return {
    [CALL_API]: {
      act: redPacketisBindedAct,
      endpoint: `/api/mp/redpacket/isBinded`,
      method: 'POST',
      dataKey: 'response',
      params,
    },
  };
}
