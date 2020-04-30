import { handleActions } from 'redux-actions';

import {
  fetchWxUserDeptsAct,
  fetchWxUserDeptUsersAct,
} from '../actions/department';

export const fetchWxUserDepts = handleActions(
  {
    [fetchWxUserDeptsAct](state, action) {
      return action.payload ? action.payload : state;
    },
  },
  null
);

export const fetchWxUserDeptUsers = handleActions(
  {
    [fetchWxUserDeptUsersAct](state, action) {
      return action.payload ? action.payload : state;
    },
  },
  null
);