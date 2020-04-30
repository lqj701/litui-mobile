import { createAction } from 'redux-actions';
import { CALL_API } from '../utils/api';

export const fetchProductsAct = createAction('FETCH_PRODUCT');
export const addProductAct = createAction('ADD_PRODUCT');
export const updateProductAct = createAction('UPDATE_PRODUCT');
export const deleteProductAct = createAction('DELETE_PRODUCT');
export const findProductAct = createAction('FIND_PRODUCT');

export const getWxUserProductsAct = createAction('FIND_PRODUCT_USER');
export const updateWxUserProductAct = createAction('UPDATA_PRODUCT_USER');
export const updateMyProductIntroducesAct = createAction(
  'UPDATA_PRODUCT_My_INTRO'
);
export const updateMyProductOrderAct = createAction('UPDATA_PRODUCT_My_ORDER');

// 获取企业产品列表与首显图片
export function fetchProducts(params = {}) {
  return {
    [CALL_API]: {
      act: fetchProductsAct,
      endpoint: 'api/wx/product/getProducts',
      method: 'POST',
      params,
    },
  };
}

// 企业管理添加产品
export function addProduct(params = {}) {
  return {
    [CALL_API]: {
      act: addProductAct,
      endpoint: 'api/wx/product/add',
      method: 'POST',
      dataKey: 'code',
      params,
    },
  };
}

export function updateProduct(params = {}) {
  return {
    [CALL_API]: {
      act: updateProductAct,
      endpoint: 'api/wx/product/update',
      method: 'POST',
      dataKey: 'code',
      params,
    },
  };
}

export function deleteProduct(params = {}) {
  return {
    [CALL_API]: {
      act: deleteProductAct,
      endpoint: 'api/wx/product/delete',
      dataKey: 'code',
      params,
    },
  };
}

// 获取产品信息
export function findProduct(params = {}) {
  return {
    [CALL_API]: {
      act: findProductAct,
      endpoint: 'api/wx/product/getProduct',
      params,
    },
  };
}

//获取销绑定好的产品列表
export function getWxUserProducts(params = {}) {
  return {
    [CALL_API]: {
      act: getWxUserProductsAct,
      endpoint: 'api/wx/product/getWxUserProducts',
      params,
    },
  };
}

//绑定、解绑产品、主推产品
export function updateWxUserProduct(params = {}) {
  return {
    [CALL_API]: {
      act: updateWxUserProductAct,
      endpoint: 'api/wx/product/bind',
      method: 'POST',
      dataKey: 'code',
      params,
    },
  };
}

// 更改用户自定义的产品介绍
export function updateMyProductIntroduces(params = {}) {
  return {
    [CALL_API]: {
      act: updateMyProductIntroducesAct,
      endpoint: 'api/wx/product/alterIntroduce',
      method: 'POST',
      params,
    },
  };
}

/**
 * 更新产品的显示顺序
 * @param {object} params
 */
export function updateMyProductOrder(params = {}) {
  return {
    [CALL_API]: {
      act: updateMyProductOrderAct,
      endpoint: 'api/wx/product/updateOrder',
      method: 'POST',
      dataKey: 'code',
      params,
    },
  };
}
