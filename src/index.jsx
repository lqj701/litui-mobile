import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import Router from './routes';

const store = configureStore({
  conf: {
    apiDomain: AppConf.api.domain,
    apiPathPrefix: AppConf.api.pathPrefix,
    apiAuthorization: AppConf.api.userToken,
    orgInfo: {
      corpId: AppConf.corpId,
      agentId: AppConf.agentId,
      appId: AppConf.appId,
      orgId: AppConf.orgId,
      userId: AppConf.userId
    }
  },
  currentUser: {
    userId: AppConf.userId,
    userToken: AppConf.api.userToken,
    salesToken: AppConf.api.salesToken,
    userRoe: AppConf.userRoe
  }
});

ReactDOM.render(
  <Provider store={store}>{/* <Router /> */}</Provider>,
  document.getElementById('react-container')
);
