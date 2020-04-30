// 用于 api-redux-middleware 的关键词，根据这个来判断是否是 api 类型的 action
export const CALL_API = 'callApi';
const initPage = 1;
const initPerPage = 15;

function checkParamsIfChanged(newParams, oldParams) {
  const newParamsKeys = Object.keys(newParams);
  const oldParamsKeys = Object.keys(oldParams);

  if (newParamsKeys.length !== oldParamsKeys.length) {
    return true;
  }

  let result = false;

  for (let i = 0; i < newParamsKeys.length; i += 1) {
    const key = newParamsKeys[i];

    if (newParams[key] !== oldParams[key]) {
      result = true;
      break;
    }
  }

  return result;
}

/**
 * @name loadDataIfNeed
 * @param req {Function} API 请求的 action
 * @param statusKey {String} Redux store 里 status 的 key
 * @param itemKey {String} Item 的唯一标识，通常是 id
 * @param fromList {Boolean} 是否先从列表中读取数据，如果为 true 则列表中有数据的话就不会发起 API 请求
 * @param pageable {Boolean} 标识此请求是否是分页类型
 * @param cacheTime {Integer} 缓存时间，单位是秒，默认 5 分钟
 */
export function loadDataIfNeed({ req, statusKey, itemKey = null, fromList = false, pageable = false, cacheTime = 300 }) {
  function checkIfExpired(respTime) {
    return (respTime + (cacheTime * 1000)) < new Date().getTime();
  }

  function checkIfNeedLoad(reqParams, params, respTime) {
    return checkParamsIfChanged(reqParams, params) || checkIfExpired(respTime);
  }

  return (reqParams = {}) => (dispatch, getState) => {
    const statusItem = getState().status[statusKey];
    const newReqParams = Object.assign({}, reqParams);
    const reload = newReqParams.reload;
    const nextPage = newReqParams.nextPage;

    delete newReqParams.reload;

    if (reload || reqParams.refresh) {
      if (pageable) {
        Object.assign(newReqParams, statusItem.params); // refresh 时继承上次的参数
        newReqParams.page = reqParams.page || initPage; // 如果没传页数，重置为第一页

        if (!newReqParams.perPage) {
          newReqParams.perPage = initPerPage;
        }
      }

      return dispatch(req(newReqParams));
    }

    if (itemKey) {
      const id = newReqParams[itemKey];

      if (fromList) {
        const { respTime, ids } = statusItem;

        if (!checkIfExpired(respTime) && ids.indexOf(/^[0-9]*$/.test(id) ? Number(id) : id) > -1) {
          return Promise.resolve();
        }
      } else if (statusItem[id]) {
        const { respTime, params } = statusItem[id];

        if (!checkIfNeedLoad(newReqParams, params, respTime)) {
          return Promise.resolve();
        }
      }
    } else {
      const { respTime, params } = statusItem;

      if (pageable) {
        if (nextPage) {
          Object.assign(newReqParams, params); // 加载下一页时继承上一次的参数
          newReqParams.page = params.page + 1;

          if (!newReqParams.perPage) {
            newReqParams.perPage = initPerPage;
          }
        } else {
          newReqParams.page = initPage;
          newReqParams.perPage = initPerPage;
        }
      }

      if (!nextPage && !checkIfNeedLoad(newReqParams, params, respTime)) {
        return Promise.resolve();
      }
    }

    return dispatch(req(newReqParams));
  };
}
