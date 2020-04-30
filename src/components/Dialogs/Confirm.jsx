import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

const Dialog = styled.div`
  position: absolute;
  top: 35%;
  left: 15%;
  width: 70%;
  background-color: #fff;
  border-radius: 0.1rem;
`;

const Header = styled.div`
  color: #000;
  font-weight: bold;
  font-size: 0.36rem;
  padding: 0.5rem 0 0.18rem;
  text-align: center;
`;

const Body = styled.div`
  padding: 0 0.13rem 0.3rem 0.3rem;
  min-height: 1rem;
  line-height: 1.6;
  text-align: center;
  font-size: 0.3rem;
  color: #888;
  min-width: 90%;
`;

const Footer = styled.div`
  border-top: 0.01rem solid #e5e5e5;
  display: flex;

  & :last-child {
    border-left: 0.01rem solid #e5e5e5;
    color: #4a8cf2;
  }
`;

const Btn = styled.div`
  text-align: center;
  padding: 0.25rem;
  font-size: 0.36rem;
  flex: 1;
`;

export function Confirm({
  headerText,
  bodyText,
  cancelBtn,
  okBtn,
  onCancelBtnClick,
  onOkBtnClick,
  alert
}) {
  return (
    <Wrapper>
      <Dialog>
        {headerText ? <Header>{headerText}</Header> : null}
        <Body dangerouslySetInnerHTML={{ __html: bodyText }} />
        <Footer>
          {!alert && <Btn onClick={onCancelBtnClick}>{cancelBtn}</Btn>}
          <Btn onClick={onOkBtnClick}>{okBtn}</Btn>
        </Footer>
      </Dialog>
    </Wrapper>
  );
}

Confirm.propTypes = {
  headerText: PropTypes.string,
  bodyText: PropTypes.string.isRequired,
  cancelBtn: PropTypes.string.isRequired,
  okBtn: PropTypes.string.isRequired,
  onCancelBtnClick: PropTypes.func.isRequired,
  onOkBtnClick: PropTypes.func.isRequired
};

Confirm.defaultProps = {
  headerText: '提示',
  cancelBtn: '取消',
  okBtn: '确定'
};

export default function confirm({
  headerText,
  bodyText,
  cancelBtn,
  okBtn,
  onCancelBtnClick,
  onOkBtnClick,
  alert
}) {
  const container = document.createElement('div');
  document.body.appendChild(container);

  function handleCancelBtnClick() {
    container.remove();
    if (onCancelBtnClick) onCancelBtnClick();
  }

  function OkBtnClick() {
    container.remove();
    if (onOkBtnClick) onOkBtnClick();
  }

  ReactDOM.render(
    <Confirm
      alert={alert}
      headerText={headerText}
      bodyText={bodyText}
      cancelBtn={cancelBtn}
      okBtn={okBtn}
      onCancelBtnClick={handleCancelBtnClick}
      onOkBtnClick={OkBtnClick}
    />,
    container
  );
}
