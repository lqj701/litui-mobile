// 缓存客户搜索页面搜索的关键字
export const updateCustomerSearchKeyWordAct = 'UPDATE_CUSTOMER_SEARCH_KEYWORD';

export function updateCustomerSearchKeyWord(data) {
  return {
    type: updateCustomerSearchKeyWordAct,
    value: data,
  };
}
