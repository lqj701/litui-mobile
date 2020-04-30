import fetch from 'isomorphic-fetch';
import { camelizeKeys } from 'humps';
import { CALL_API } from './api';
// import { NetWorkExpect } from '../containers/Permissions/NetworkContainer';

let timer = null;

function toQueryString(obj) {
  const esc = encodeURIComponent;
  return Object.keys(obj)
    .map(k => `${esc(k)}=${esc(obj[k])}`)
    .join('&');
}

function initUrl(endpoint, params, domain) {
  const pathname = endpoint
    .split('/')
    .map(str => {
      if (str[0] === ':') {
        const fill = params[str.substr(1)];
        delete params[str.substr(1)];
        return fill;
      }

      return str;
    })
    .join('/');

  let host;

  if (domain) {
    if (/^http/.test(domain)) {
      host = domain;
    } else {
      host = AppConf.api.domains[domain];
    }
  } else {
    host = AppConf.api.domain;
  }

  if (pathname[0] === '/') {
    return `${host}${pathname}`;
  }

  return `${host}${AppConf.api.pathPrefix}${pathname}`;
}

function callApi(opts) {
  const { endpoint, state, domain } = opts;
  const params = Object.assign({}, opts.params);
  const fetchInit = {
    headers: {
      Authorization: `Token userToken=${state.conf.apiAuthorization}`,
      'Content-Type': 'application/json; charset=utf-8'
    }
  };

  let { method, dataKey, body } = opts;
  let fullUrl = initUrl(endpoint, params, domain);

  if (!method) {
    method = 'GET';
  }

  if (!dataKey) {
    dataKey = 'data';
  }

  if (method === 'GET' || body) {
    fullUrl += `?${toQueryString(params)}`;
  }

  if (method !== 'GET') {
    fetchInit.method = method;
    fetchInit.body = JSON.stringify(body || params);
  }

  if (method !== 'GET') {
  }

  // 常规的做法，产品想这样做
  clearTimeout(timer);
  timer = setTimeout(() => {
    // NetWorkExpect();
  }, 7 * 1000);

  return fetch(fullUrl, fetchInit).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      clearTimeout(timer);

      if (dataKey === 'response') {
        return camelizeKeys(json);
      }

      return camelizeKeys(json)[dataKey];
    })
  );
}

export default store => next => action => {
  const state = store.getState();
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { method, endpoint, schema, act, params, dataKey, domain } = callAPI;

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if (typeof act !== 'function') {
    throw new Error('Specify an action of redux-actions.');
  }

  const actionExtendOpts = {};

  if (params) {
    actionExtendOpts.params = params;

    if (params.refresh) {
      actionExtendOpts.refresh = params.refresh;
      delete params.refresh;
    }

    if (params.nextPage) {
      actionExtendOpts.nextPage = params.nextPage;
      delete params.nextPage;
    }
  }

  function actionWith(data) {
    // Toast.hide();
    return Object.assign(act(data), actionExtendOpts);
  }

  next(actionWith());
  return callApi({
    method,
    endpoint,
    schema,
    state,
    params,
    dataKey,
    domain
  }).then(response => next(actionWith(response)));
};
