import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';

import Button from '../../../components/Button';
import Confirm from '../../../components/Dialogs/Confirm';
import BindUser from './BindUser';

const StyledButton = styled(Button)`
  position: fixed;
  bottom: 0;
`;

const UnBind = ({ customer, onChange }) => {
  const handleUnBindClick = () => {
    Confirm({
      headerText: '解除绑定',
      bodyText: '确认解绑？<br />解绑后将不可用该微信发送红包。',
      onOkBtnClick: () => {
        onChange && onChange();
      },
    });
  };

  return (
    <div>
      <BindUser avatar={customer.avatarUrl} name={customer.remark || customer.nickname} />
      <StyledButton onClick={handleUnBindClick}>解除绑定</StyledButton>
    </div>
  );
};

UnBind.propTypes = {
  onChange: propsType.func,
  customer: propsType.any,
};

export default UnBind;
