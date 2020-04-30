import { handleActions } from 'redux-actions';
import {
  fetchUserInfoAct,
  getUserIntroduceInfoAct,
  getWxUsersAct,
  getWxUserQrcodeAct,
  getWxUserAct,
  upateWelcomeTextAct,
  updateUserStatusAct,
} from '../actions/user';

export default handleActions(
  {
    [fetchUserInfoAct](state, action) {
      return action.payload ? action.payload : state;
    },
  },
  null
);

export const fetchUserInfo = handleActions(
  {
    [fetchUserInfoAct](state, action) {
      return action.payload ? action.payload : state;
    },
  },
  null
);

export const getUserIntroduceInfo = handleActions(
  {
    [getUserIntroduceInfoAct](state, action) {
      return action.payload ? action.payload : state;
    },
  },
  null
);

export const getWxUsers = handleActions(
  {
    [getWxUsersAct](state, action) {
      return action.payload ? action.payload : state;
    },
  },
  null
);

export const getWxUser = handleActions(
  {
    [getWxUserAct](state, action) {
      return action.payload ? action.payload : state;
    },
  },
  null
);

export const getWxUserQrcode = handleActions(
  {
    [getWxUserQrcodeAct](state, action) {
      if(action.payload) {
        return Object.assign({},state, {
          isFetching: false,
          url: action.payload.data ? action.payload.data.url : null,
          code: action.payload.code,
        });
      }

      return state;
    },
  },
  {
    isFetching: true,
    url: null,
    code: -1,
  }
);

export const upateWelcomeText = handleActions(
  {
    [upateWelcomeTextAct](state, action) {
      return action.payload ? action.payload : state;
    },
  },
  null
);

export const updateUserStatus = handleActions(
  {
    [updateUserStatusAct](state, action) {
      return action.payload ? action.payload : 1000;
    },
  },
  null
);
