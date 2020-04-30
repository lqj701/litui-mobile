import { createAction } from 'redux-actions';
import { CALL_API } from '../utils/api';

export const fetchUserInfoAct = createAction('FETCH_USER');
export const updateUserInfoAct = createAction('UPDATE_USER');

export const getUserIntroduceInfoAct = createAction('FETCH_USER_INTRO');
export const getWxUsersAct = createAction('FETCH_USERS_WX');
export const getWxUserAct = createAction('FETCH_USER_WX');
export const getWxUserQrcodeAct = createAction('FETCH_WX_USER_QRCODE');
export const upateWelcomeTextAct = createAction('UPDATE_WELCOME');

//
export const updateUserStatusAct = createAction('UPDATE_USET_STATUS');

// 2. 获得个人信息
export function getUserInfo() {
  return {
    [CALL_API]: {
      act: fetchUserInfoAct,
      endpoint: 'api/wx/bCard/getUserInfo',
      method: 'POST',
    },
  };
}

// 3. 完善我的名片
export function updateUserInfo(params = {}) {
  return {
    [CALL_API]: {
      act: updateUserStatusAct,
      endpoint: 'api/wx/bCard/editMyCard',
      method: 'POST',
      dataKey: 'code',
      params,
    },
  };
}
// 4. 获得个人介绍信息
export function getUserIntroduceInfo() {
  return {
    [CALL_API]: {
      act: getUserIntroduceInfoAct,
      endpoint: 'api/wx/bCard/getUserIntroduceInfo',
      method: 'POST',
    },
  };
}

// 个人介绍编辑
export function updateIntroduce(params = {}) {
  return {
    [CALL_API]: {
      act: updateUserStatusAct,
      endpoint: 'api/wx/bCard/editIntroduce',
      method: 'POST',
      dataKey: 'code',
      params,
    },
  };
}

// 用户列表
export function getWxUsers(params = {}) {
  return {
    [CALL_API]: {
      act: getWxUsersAct,
      endpoint: 'api/wx/wxUser/getWxUsers',
      params,
    },
  };
}

// 用户详情
export function getWxUser(params = {}) {
  return {
    [CALL_API]: {
      act: getWxUserAct,
      endpoint: 'api/wx/wxUser/getWxUser',
      params,
    },
  };
}

// 更新聊天欢迎语
export function upateWelcomeText(params = {}) {
  return {
    [CALL_API]: {
      act: updateUserStatusAct,
      endpoint:
        'api/wx/bCard/editWelcomeChat?userToken=b64db8ee62e340c4a7a37bf31c487bc9',
      method: 'POST',
      dataKey: 'code',
      params,
    },
  };
}

// 生成小程序二维码
export function getWxUserQrcode(
  wxOrganizationId,
  salesToken = AppConf.api.salesToken
) {
  return {
    [CALL_API]: {
      act: getWxUserQrcodeAct,
      endpoint: `auth/${wxOrganizationId}/mp/qrcode/${salesToken}/detail`,
      dataKey: 'response',
    },
  };
}
