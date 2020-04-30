import { handleActions } from 'redux-actions';
import {
  fetchCustomerAct,
  updateCustomerAct,
  fetchCustomerByLastime,
  getInformationsAct,
  getReportCountAct,
  getCustomerDetailAct,
  searchCustomerAct,
  getCustomersOrderByCreateTimeAct,
  getCustomerInformationsAct,
  getCustomersOrderByCreateTimeAscAct,
} from '../actions/customer';

const initState = {
  isFetching: true,
  data: [],
  hasNext: 0,
  pageSize: null,
};

export const fetchCustomer = handleActions(
  {
    [fetchCustomerAct](state, action) {
      return action.payload ? action.payload : state;
    },
  },
  null
);

export const updateCustomer = handleActions(
  {
    [updateCustomerAct](state, action) {
      return action.payload ? action.payload : state;
    },
  },
  null
);

//
export const getCustomersOrderByLastInfoTime = handleActions(
  {
    [fetchCustomerByLastime](state, action) {
      return action.payload ? action.payload : state;
    },
  },
  null
);

export const getCustomersOrderByCreateTime = handleActions(
  {
    [getCustomersOrderByCreateTimeAct](state, action) {
      return action.payload ? action.payload : state;
    },
  },
  null
);

export const getReportCount = handleActions(
  {
    [getReportCountAct](state, action) {
      return action.payload ? action.payload : state;
    },
  },
  null
);

export const getCustomerRevisitLog = handleActions(
  {
    [getInformationsAct](state, action) {
      return action.payload ? action.payload : state;
    },
  },
  null
);

export const getCustomerDetail = handleActions(
  {
    [getCustomerDetailAct](state, action) {
      return action.payload ? action.payload : state;
    },
  },
  null
);

export const searchCustomer = handleActions(
  {
    [searchCustomerAct](state, action) {
      return action.payload ? action.payload : state;
    },
  },
  null
);

export const getCustomerInformations = handleActions(
  {
    [getCustomerInformationsAct](state, action) {
      return action.payload ? action.payload : state;
    },
  },
  null
);

// 2018.05.08 暂时没有使用
export const getCustomersByCreateTime = handleActions(
  {
    [fetchCustomerAct](state, action) {
      if (action.payload) {
        return Object.assign(
          {},
          {
            isFetching: false,
            list: action.payload.customerDtoList,
            hasNext: action.payload.hasNext,
          }
        );
      }

      return state;
    },
  },
  {
    isFetching: true,
    list: [],
    hasNext: 0,
  }
);

export const getCustomersOrderByCreateTimeAsc = handleActions(
  {
    [getCustomersOrderByCreateTimeAscAct](state, action) {
      if (action.payload) {
        return Object.assign(
          {},
          {
            isFetching: false,
            list: action.payload.customerDtoList,
            hasNext: action.payload.hasNext,
          }
        );
      }

      return state;
    },
  },
  {
    isFetching: true,
    list: [],
    hasNext: 0,
  }
);
