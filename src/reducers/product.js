import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import {
  updateProductAct,
  fetchProductsAct,
  findProductAct,
  getWxUserProductsAct,
  updateMyProductIntroducesAct,
} from '../actions/product';

const initState = {
  isFetching: true,
  data: [],
  hasNext: 0,
  pageSize: null,
};

export const getProducts = handleActions(
  {
    [fetchProductsAct](state, action) {
      if (action.payload) {
        return Object.assign({}, state, {
          isFetching: false,
          hasNext: action.payload.hasNext,
          data: action.payload.products,
          pageSize: action.payload.count,
        });
      }

      return state;
    },
  },
  initState
);

export const findProduct = handleActions(
  {
    [findProductAct](state, action) {
      return action.payload ? action.payload : state;
    },
  },
  null
);

export const getWxUserProducts = handleActions(
  {
    [getWxUserProductsAct](state, action) {
      return action.payload ? action.payload : state;
    },
  },
  null
);

export const updateMyProductIntroduces = handleActions(
  {
    [updateMyProductIntroducesAct](state, action) {
      return action.payload ? action.payload : state;
    },
  },
  null
);

// export default handleActions(
//   {
//     [updateProductAct](state, action) {
//       return action.payload ? action.payload : state;
//     },
//   },
//   { products: {} }
// );

export default combineReducers({
  list: getProducts,
  row: findProduct,
  userProducts: getWxUserProducts,
  myProductIntroduces: updateMyProductIntroduces,
});
