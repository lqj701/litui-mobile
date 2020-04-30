import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';

import { redPacketisBinded } from '../../../actions/redpacket';

import Button from '../../../components/Button';
import Confirm from '../../../components/Dialogs/Confirm';
import BindIntro from './BindIntro';

const StyledButton = styled(Button)`
  position: fixed;
  bottom: 0;
`;

const Bind = ({ customer, disabled, onChange, children, dispatch }) => {
  const onClick = () => {
    onChange && onChange(0);
    dispatch(redPacketisBinded({ customer_id: customer.id })).then(action => {
      const name = customer.remark || customer.nickname;

      if (action.payload.code === 0) {
        if (action.payload.data.isBinded === 0) {
          Confirm({
            headerText: '绑定确认',
            bodyText:
              '绑定【' + name + '】，绑定后可以用该微信在小程序中发红包！',
            onOkBtnClick: () => {
              onChange && onChange(1);
            },
            onCancelBtnClick: () => {
              onChange && onChange(-1);
            },
          });
        } else {
          Confirm({
            headerText: '绑定',
            bodyText: '【' + name + '】，已经被绑定！',
          });
        }
      } else if (action.payload.code === 101111) {
        Confirm({
          headerText: '提示',
          bodyText: '该销售客户关系不存在',
        });
      } else {
        Confirm({
          headerText: '提示',
          bodyText: '系统异常，请稍后再试',
        });
      }
    });
  };

  return (
    <div>
      <BindIntro />
      {children}
      <StyledButton disabled={disabled} onClick={onClick}>
        绑定
      </StyledButton>
    </div>
  );
};

Bind.propTypes = {
  onChange: propsType.func,
  dispatch: propsType.func,
  children: propsType.any,
  customer: propsType.any,
  disabled: propsType.bool,
};

export default Bind;
