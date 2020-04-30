import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import HawkeyeImg from 'assets/images/icon-yingyanfenxi_grey.png';
import HawkeyeImgA from 'assets/images/icon-yingyanfenxi_blue.png';

import AchieveImg from 'assets/images/icon-jixiaofenxi_grey.png';
import AchieveImgA from 'assets/images/icon-jixiaofenxi_blue.png';

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
    background: url('${HawkeyeImgA}') no-repeat;
    background-size: contain; 
  }

  .cu {
    color: #4a8cf2;
  }
  .cu div:first-child{
    display:inline-block;
    width: 0.4rem;
    height: 0.4rem;
    background: url('${AchieveImgA}') no-repeat;
    background-size: contain; 
  }
`;

const StyledHawkeye = styled.div`
  display:inline-block;
  width: 0.4rem;
  height: 0.4rem;
  background: url('${HawkeyeImg}') no-repeat;
  background-size: contain; 
`;

const StyledAchieve = styled.div`
  display:inline-block;
  width: 0.4rem;
  height: 0.4rem;
  background: url('${AchieveImg}') no-repeat;
  background-size: contain; 
`;

const Tab = styled(NavLink)`
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

const Hawk = styled(NavLink)`
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

const NavBar = () => {
  return (
    <TabsWrapper>
      <Hawk to="/Analysis/Information" replace activeClassName="ha">
        <StyledHawkeye />
        <div>鹰眼分析</div>
      </Hawk>
      <Tab to="/Analysis/Achieve" replace activeClassName="cu">
        <StyledAchieve />
        <div>绩效分析</div>
      </Tab>
    </TabsWrapper>
  );
};

export default NavBar;
