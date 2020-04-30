import { handleActions } from 'redux-actions';
import {
  fetchAchieveAnalysisAct,
  fetchGroupInfoAnalysisAct,
  fetchGroupForwardAnalysisAct,
  fetchGroupCustomerAnalysisAct,
  fetchCustomerCategoryAnalysisAct,
  fetchCustomerActionAnalysisAct,
  fetchCustomerReportAct,
  fetchForwardReportAct,
  fetchCustomerInterestAct,
  fetchFollowReportAct,
  fetchInfoAllReportAct,
  fetchInfoCustomerAreaReportAct,
  fetchInfoCustomerGenderReportAct,
  fetchSaveReportAct,
  fetchSupportReportAct,
  fetchConsultReportAct,
  fetchMessageReportAct,
  fetchActiveCustomerReportAct,
  fetchReadReportAct,
} from '../actions/analysis';

// 绩效分析
export const fetchAchieveAnalysis = handleActions(
  {
    [fetchAchieveAnalysisAct](state, action) {
      return action.payload ? action.payload : state;
    },
  },
  null
);

export const fetchGroupInfoAnalysis = handleActions(
  {
    [fetchGroupInfoAnalysisAct](state, action) {
      return action.payload ? action.payload : state;
    },
  },
  null
);

export const fetchGroupForwardAnalysis = handleActions(
  {
    [fetchGroupForwardAnalysisAct](state, action) {
      return action.payload ? action.payload : state;
    },
  },
  null
);

export const fetchGroupCustomerAnalysis = handleActions(
  {
    [fetchGroupCustomerAnalysisAct](state, action) {
      if (action.payload) {
        return Object.assign(
          {},
          {
            isFetching: false,
            list: action.payload.list,
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

export const fetchCustomerCategoryAnalysis = handleActions(
  {
    [fetchCustomerCategoryAnalysisAct](state, action) {
      return action.payload ? action.payload : state;
    },
  },
  null
);

export const fetchCustomerActionAnalysis = handleActions(
  {
    [fetchCustomerActionAnalysisAct](state, action) {
      if (action.payload) {
        return Object.assign(
          {},
          {
            isFetching: false,
            data: action.payload,
          }
        );
      }

      return state;
    },
  },
  {
    isFetching: true,
    data: {},
  }
);

export const fetchCustomerReport = handleActions(
  {
    [fetchCustomerReportAct](state, action) {
      if (action.payload) {
        return Object.assign(
          {},
          {
            isFetching: false,
            data: action.payload.list,
            sum: action.payload.sum,
          }
        );
      }

      return state;
    },
  },
  {
    isFetching: true,
    data: [],
    sum: 0,
  }
);

export const fetchForwardReport = handleActions(
  {
    [fetchForwardReportAct](state, action) {
      if (action.payload) {
        return Object.assign(
          {},
          {
            isFetching: false,
            data: action.payload.list,
            sum: action.payload.sum,
          }
        );
      }

      return state;
    },
  },
  {
    isFetching: true,
    data: [],
    sum: 0,
  }
);

export const fetchCustomerInterest = handleActions(
  {
    [fetchCustomerInterestAct](state, action) {
      if (action.payload) {
        return Object.assign(
          {},
          {
            isFetching: false,
            data: action.payload,
          }
        );
      }

      return state;
    },
  },
  {
    isFetching: true,
    data: {},
  }
);

export const fetchFollowReport = handleActions(
  {
    [fetchFollowReportAct](state, action) {
      if (action.payload) {
        return Object.assign(
          {},
          {
            isFetching: false,
            data: action.payload.list,
            sum: action.payload.sum,
          }
        );
      }

      return state;
    },
  },
  {
    isFetching: true,
    data: [],
    sum: 0,
  }
);

export const fetchInfoAllReport = handleActions(
  {
    [fetchInfoAllReportAct](state, action) {
      if (action.payload) {
        return Object.assign(
          {},
          {
            isFetching: false,
            data: action.payload,
          }
        );
      }

      return state;
    },
  },
  {
    isFetching: true,
    data: {},
  }
);

export const fetchInfoCustomerAreaReport = handleActions(
  {
    [fetchInfoCustomerAreaReportAct](state, action) {
      if (action.payload) {
        return Object.assign(
          {},
          {
            isFetching: false,
            data: action.payload,
            sum: action.payload.sum,
          }
        );
      }

      return state;
    },
  },
  {
    isFetching: true,
    data: [],
    sum: 0,
  }
);

export const fetchInfoCustomerGenderReport = handleActions(
  {
    [fetchInfoCustomerGenderReportAct](state, action) {
      if (action.payload) {
        return Object.assign(
          {},
          {
            isFetching: false,
            data: action.payload,
          }
        );
      }

      return state;
    },
  },
  {
    isFetching: true,
    data: {},
  }
);

export const fetchSaveReport = handleActions(
  {
    [fetchSaveReportAct](state, action) {
      if (action.payload) {
        return Object.assign(
          {},
          {
            isFetching: false,
            data: action.payload.list,
            sum: action.payload.sum,
          }
        );
      }

      return state;
    },
  },
  {
    isFetching: true,
    data: [],
    sum: 0,
  }
);

export const fetchSupportReport = handleActions(
  {
    [fetchSupportReportAct](state, action) {
      if (action.payload) {
        return Object.assign(
          {},
          {
            isFetching: false,
            data: action.payload.list,
            sum: action.payload.sum,
          }
        );
      }

      return state;
    },
  },
  {
    isFetching: true,
    data: [],
    sum: 0,
  }
);

export const fetchConsultReport = handleActions(
  {
    [fetchConsultReportAct](state, action) {
      if (action.payload) {
        return Object.assign(
          {},
          {
            isFetching: false,
            data: action.payload.list,
            sum: action.payload.sum,
          }
        );
      }

      return state;
    },
  },
  {
    isFetching: true,
    data: [],
    sum: 0,
  }
);

export const fetchMessageReport = handleActions(
  {
    [fetchMessageReportAct](state, action) {
      if (action.payload && action.payload.list) {
        return Object.assign(
          {},
          {
            isFetching: false,
            data: action.payload.list,
            sum: action.payload.sum,
          }
        );
      }

      return state;
    },
  },
  {
    isFetching: true,
    data: [],
    sum: 0,
  }
);

export const fetchActiveCustomerReport = handleActions(
  {
    [fetchActiveCustomerReportAct](state, action) {
      if (action.payload) {
        return Object.assign(
          {},
          {
            isFetching: false,
            data: action.payload.list,
            sum: action.payload.sum,
          }
        );
      }

      return state;
    },
  },
  {
    isFetching: true,
    data: [],
    sum: 0,
  }
);

export const fetchReadReport = handleActions(
  {
    [fetchReadReportAct](state, action) {
      if (action.payload) {
        return Object.assign(
          {},
          {
            isFetching: false,
            data: action.payload.list,
            sum: action.payload.sum,
          }
        );
      }

      return state;
    },
  },
  {
    isFetching: true,
    data: [],
    sum: 0,
  }
);
