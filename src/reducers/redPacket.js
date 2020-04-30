import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import {
  redPacketBindAct,
  redPacketUnBindAct,
  redPackethaveBindedAct,
} from '../actions/redpacket';

export const redPacketBind = handleActions(
  {
    [redPacketBindAct](state, action) {
      if (action.payload) {
        return {
          isFetching: false,
          data: action.payload.customerWxUser,
        };
      }

      return state;
    },
  },
  {
    isFetching: true,
    data: {},
  }
);

export const redPacketUnBind = handleActions(
  {
    [redPacketUnBindAct](state, action) {
      if (action.payload) {
        return {
          isFetching: false,
        };
      }

      return state;
    },
  },
  {
    isFetching: true,
  }
);

export const redPackethaveBinded = handleActions(
  {
    [redPackethaveBindedAct](state, action) {
      if (action.payload) {
        const customer = action.payload;
        if (Object.keys(customer).length) {
          return {
            isFetching: false,
            haveBinded: true,
          };
        } else {
          return {
            isFetching: false,
            haveBinded: false,
          };
        }
      }

      return state;
    },
  },
  {
    isFetching: true,
    haveBinded: false,
  }
);

export const redPacket = combineReducers({
  haveBinded: redPackethaveBinded,
});
