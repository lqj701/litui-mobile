import { handleActions } from 'redux-actions';
import { fetchWebsiteAct } from '../actions/official';


export const fetchWebsite = handleActions(
  {
    [fetchWebsiteAct](state, action) {
      return action.payload ? action.payload : state;
    },
  },
  null
);
