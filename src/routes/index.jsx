import React from 'react';
import { Route, Redirect, HashRouter, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';
import asyncComp from '../components/Loadable';

// const NavBarContainer = asyncComp(() => import('../containers/index'));

const HawkeyePage = asyncComp(() => import('../containers/Hawkeye'));

// // 聊天
// const ChatPage = asyncComp(() => import('../containers/Chat'));
// const Communication = asyncComp(() => import('../containers/Chat/Communication'));
// const ChatLoading = asyncComp(() => import('../containers/Chat/ChatLoading'));

// // 客户
// const CustomerPage = asyncComp(() => import('../containers/Customer'));
// const CustomerDetail = asyncComp(() => import('../containers/Customer/Detail'));
// const CustomerEditor = asyncComp(() => import('../containers/Customer/Editor'));
// const CustomerSearch = asyncComp(() => import('../containers/Customer/Search'));

// // 我的
// const MyPage = asyncComp(() => import('../containers/My'));
// const MyCard = asyncComp(() => import('../containers/My/Card'));
// const MyProfile = asyncComp(() => import('../containers/My/Profile'));
// const MyProfileAvatar = asyncComp(() => import('../containers/My/Avatar'));
// // 个人签名
// const MySignature = asyncComp(() => import('../containers/My/Signature'));
// // 聊天欢迎语
// const MyWelcom = asyncComp(() => import('../containers/My/Welcom'));
// const MyProduct = asyncComp(() => import('../containers/My/Product'));
// const MyProducSelect = asyncComp(() => import('../containers/My/Product/Select'));
// const MyProductEditor = asyncComp(() => import('../containers/My/Product/Editor'));
// const MyBindMP = asyncComp(() => import('../containers/My/BindMP'));
// const MyHelp = asyncComp(() => import('../containers/My/Help'));

// // 系统设置
// const SettingPage = asyncComp(() => import('../containers/Setting'));
// const UserList = asyncComp(() => import('../containers/Setting/UserList'));
// const UserDetail = asyncComp(() => import('../containers/Setting/UserDetail'));

// // 产品管理
// const ProductPage = asyncComp(() => import('../containers/Product'));
// // 编辑产品
// const ProductEditor = asyncComp(() => import('../containers/Product/Editor'));
// const ProductAdd = asyncComp(() => import('../containers/Product/Add'));
// // 编辑官网
// const Official = asyncComp(() => import('../containers/Official'));

// //
// const AnalysisInformation = asyncComp(() => import('../containers/Analysis/Information'));
// const AnalysisGroup = asyncComp(() => import('../containers/Analysis/Group'));
// const AnalysisAchieve = asyncComp(() => import('../containers/Analysis/Achieve'));

const Wrapper = styled.div`
  height: 100%;
`;

const redirectToCustomerList = () => <Redirect to={`/${AppConf.fragment}`} />;

function Router() {
  return (
    <HashRouter>
      <Wrapper>
        <Route exact path="/" render={redirectToCustomerList} />
       <Route exact path="/Hawkeye" component={HawkeyePage} />
         {/* <Route exact path="/Chat" component={ChatPage} />
        <Route exact path="/Customer" component={CustomerPage} />
        <Route exact path="/My" component={MyPage} />

        <Switch>
          <Route exact path="/Chat/:id" component={Communication} />
          <Route exact path="/Chat/:id/Loading" component={ChatLoading} />
          
          <Route exact path="/Customer/Detail/:id/:wx_user_id" component={CustomerDetail} />
          <Route exact path="/Customer/Editor/:id/:wx_user_id" component={CustomerEditor} />
          <Route exact path="/Customer/Search" component={CustomerSearch} />

          <Route exact path="/My/Card/:id" component={MyCard} />
          <Route exact path="/My/Profile" component={MyProfile} />
          <Route exact path="/My/Profile/Avatar" component={MyProfileAvatar} />
          <Route exact path="/My/Signature" component={MySignature} />
          <Route exact path="/My/Welcom" component={MyWelcom} />
          <Route exact path="/My/Help" component={MyHelp} />
          <Route exact path="/My/Product" component={MyProduct} />
          <Route exact path="/My/Product/Select" component={MyProducSelect} />
          <Route exact path="/My/Product/Editor" component={MyProductEditor} />
          <Route exact path="/My/Bind/MP" component={MyBindMP} />

          <Route exact path="/Setting" component={SettingPage} />
          <Route exact path="/Setting/UserList" component={UserList} />
          <Route exact path="/Setting/UserList/:id" component={UserDetail} />
          <Route exact path="/Setting/Official" component={Official} />

          <Route exact path="/Product/List/:id" component={ProductPage} />
          <Route exact path="/Product/Editor/:id" component={ProductEditor} />
          <Route exact path="/Product/Add" component={ProductAdd} />
          // <NavBarContainer />
        </Switch>

        <Route exact path="/Analysis/Information" component={AnalysisInformation} />
        <Route exact path="/Analysis/Group" component={AnalysisGroup} />
        <Route exact path="/Analysis/Achieve" component={AnalysisAchieve} /> */}

      </Wrapper>
    </HashRouter>
  );
}

export default hot(module)(Router);
