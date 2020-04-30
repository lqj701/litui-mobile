import { updateCustomerSearchKeyWordAct } from '../actions/syncStateStore';

const initialState = {
  customer: {
    searchKeyWord: '',
  },
};

export default function syncStateStore(state = initialState, action) {
  switch (action.type) {
  case updateCustomerSearchKeyWordAct: {
    return Object.assign({}, state, {
      customer: { searchKeyWord: action.value },
    });
  }
  default:
    return state;
  }
}
