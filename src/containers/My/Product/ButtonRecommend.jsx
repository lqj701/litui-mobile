import React from 'react';
import styled from 'styled-components';
import propsType from 'prop-types';

const is_vivo_x9 = () =>
  /vivo X9/g.test(window.navigator.userAgent) ? true : false;
const RecomButton = styled.button`
  background: #ffffff;
  border: 0.02rem solid rgba(0, 0, 0, 0.1);
  border-radius: 0.08rem;
  font-size: 0.24rem;
  color: rgba(0, 0, 0, 0.65);
  text-align: center;
  outline: none;
  width: 1.48rem;
  height: 0.48rem;
  position: absolute;
  right: 0.3rem;

  ${({ checked }) => {
    if (checked && !is_vivo_x9()) {
      return `background: #ddd;`;
    }
  }};
`;

const ButtonRecommend = ({ checked, ...other }) => (
  <RecomButton checked={checked} {...other}>
    {checked ? '取消主推' : '设为主推'}
  </RecomButton>
);

ButtonRecommend.propTypes = {
  checked: propsType.bool,
};

export default ButtonRecommend;
