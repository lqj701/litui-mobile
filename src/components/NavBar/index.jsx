import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

//
import HawkeyeImg from '../../assets/images/icon-yingyan_gery.png';
import HawkeyeImgA from '../../assets/images/icon-yingyan_blue.png';

import ChatImg from '../../assets/images/icon-xiaoxi_grey.png';
import ChatImgA from '../../assets/images/icon-xiaoxi_blue.png';

import CustomerImg from '../../assets/images/icon-kehu_grey.png';
import CustomerImgA from '../../assets/images/icon-kehu_blue.png';

import MyImg from '../../assets/images/icon-wode_grey.png';
import MyImgA from '../../assets/images/icon-wode_blue.png';

const TabsWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1.1rem;
  z-index: 10;
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 -1px 0 0 rgba(0, 0, 0, 0.1);

  .ha {
    color: #4a8cf2;
  }
  .ha div:first-child{
    display:inline-block;
    width: 0.4rem;
    height: 0.4rem;
    background: url('${HawkeyeImgA}');
    background-size: cover; 
  }

  .ch {
    color: #4a8cf2;
  }
  .ch div:first-child{
    display:inline-block;
    width: 0.4rem;
    height: 0.4rem;
    background: url('${ChatImgA}');
    background-size: cover; 
  }

  .cu {
    color: #4a8cf2;
  }
  .cu div:first-child{
    display:inline-block;
    width: 0.4rem;
    height: 0.4rem;
    background: url('${CustomerImgA}');
    background-size: cover; 
  }

  .my {
    color: #4a8cf2;
  }
  .my div:first-child{
    display:inline-block;
    width: 0.4rem;
    height: 0.4rem;
    background: url('${MyImgA}');
    background-size: cover; 
  }
`;

const StyledHawkeye = styled.div`
  display:inline-block;
  width: 0.4rem;
  height: 0.4rem;
  background: url('${HawkeyeImg}');
  background-size: cover; 
`;

const StyledChat = styled.div`
  display:inline-block;
  width: 0.4rem;
  height: 0.4rem;
  background: url('${ChatImg}');
  background-size: cover; 
  position: relative;
`;
const StyledCustomer = styled.div`
  display:inline-block;
  width: 0.4rem;
  height: 0.4rem;
  background: url('${CustomerImg}');
  background-size: cover; 
`;
const StyledMyImg = styled.div`
  display:inline-block;
  width: 0.4rem;
  height: 0.4rem;
  background: url('${MyImg}');
  background-size: cover; 
`;

const Tab = styled(NavLink)`
  position: relative;
  flex: 1;
  display: block;
  text-decoration: none;
  text-align: center;
  color: #000;

  font-size: 0.24rem;
  color: #9b9b9b;

  &.active {
    color: #4a8cf2;
    background: #fff;
  }
`;

const UnradBage = styled.span`
  display: inline-block;
  padding: 0.15em 0.4em;
  min-width: 18px;
  border-radius: 18px;
  background-color: #e64340;
  color: #fff;
  line-height: 1.2;
  text-align: center;
  font-size: 0.24rem;
  vertical-align: middle;
  position: absolute;
  top: -0.1rem;
  left: 0.26rem;
  z-index: 11;
`;

export default ({ allUnread }) => {
  const unread = allUnread > 0 ? (
    allUnread > 99 ? (
      <UnradBage>99+</UnradBage>
    ) : (
      <UnradBage>{allUnread}</UnradBage>
    )
  ) : null;

  return (
    <TabsWrapper>
      <Tab to="/Hawkeye" replace activeClassName="ha">
        <StyledHawkeye />
        <div>鹰眼</div>
      </Tab>
      <Tab to="/Chat" replace activeClassName="ch">
        <StyledChat>{unread}</StyledChat>
        <div>消息</div>
      </Tab>
      <Tab to="/Customer" replace activeClassName="cu">
        <StyledCustomer />
        <div>客户</div>
      </Tab>
      <Tab to="/My" replace activeClassName="my">
        <StyledMyImg />
        <div>我的</div>
      </Tab>
    </TabsWrapper>
  );
};
