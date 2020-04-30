import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';

import Card from '../../components/Card';
import Button from '../../components/Button';
import { shareWechatMessage } from '../../utils/weixin';
import confirm from '../../components/Dialogs/Confirm';

import CardBgImg from 'assets/images/bg-card1.png';

const Wrapper = styled.div`
  background: #fff;
  height: 100%;
  padding: 0.3rem 0.3rem 0 0.3rem;
`;

const StyledButton = styled(Button)`
  margin-top: 0.6rem;
  width: 60%;
  display: inline-block;
`;

const StyedCard = styled(Card)`
  font-size: 0.28rem;
  color: #999999;
  line-height: 1.8;
  background:url('${CardBgImg}');
  background-size: cover;
  margin-top:0
`;
const Name = styled.div`
  font-size: 0.4rem;
  color: #2d3034;
  font-weight: bold;
`;
const Avatar = styled.img`
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
  width: 1rem;
  height: 1rem;
`;
const TextCenter = styled.div`
  text-align: center;
  margin-top: 0.7rem;
`;

const Remark = styled.div`
  margin-top: 0.16rem;
  font-size: 0.28rem;
  color: #999999;
`;

const Placeholder = styled.div`
  height: 0.5rem;
`;

export default class UserCard extends React.Component {
  static propTypes = {
    name: propsType.string,
    job: propsType.string,
    phone: propsType.string,
    company: propsType.string,
    avatar: propsType.string,
    qcode: propsType.any
  };

  getUserAgent() {
    return window.navigator.userAgent.toLowerCase();
  }

  iswxWork() {
    const userAgent = this.getUserAgent();
    if (/wxwork/.test(userAgent)) {
      return true;
    }

    return false;
  }

  handleShareClick = () => {
    const { name, job, company, avatar, qcode } = this.props;
    const title = name + '的智能名片，请扫码惠存';
    const imgUrl = avatar;

    let desc = '';
    if (job) {
      desc = '职位：' + job + '；';
    }

    if (company) {
      desc += '公司名称：' + company;
    }

    if (!qcode.url) {
      confirm({
        headerText: '注意',
        bodyText: '励推还未绑定小程序，请联系管理员绑定小程序。',
        onOkBtnClick: () => {}
      });
      return;
    }

    shareWechatMessage('shareWechatMessage', {
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: qcode.url
        ? qcode.url
        : window.location.origin + window.location.pathname, // 分享链接
      imgUrl: imgUrl // 分享封面
    });
  };

  handleImgClick = () => {
    const { qcode } = this.props;
    if (!this.iswxWork()) {
      console.warn('浏览器不支持该操作，请在企业微信端重新尝试该操作！');
      return;
    }

    const urls = [qcode.url];
    window.wx.previewImage({
      current: qcode.url,
      urls // 需要预览的图片http链接列表
    });
  };

  render() {
    const { name, job, phone, company, avatar, qcode } = this.props;

    const Share = () =>
      this.iswxWork() && (
        <StyledButton onClick={this.handleShareClick}>分享到微信</StyledButton>
      );

    const ShowQrcode = () => {
      if (qcode.isFetching) {
        return <div />;
      } else {
        if (qcode.code === 0) {
          return (
            <TextCenter>
              <img
                width="200rem"
                height="200rem"
                src={qcode.url}
                onClick={this.handleImgClick}
              />
              <Remark>微信扫一扫，查看我名片</Remark>

              <Share />
            </TextCenter>
          );
        } else {
          // code:41030
          return (
            <TextCenter>
              <div style={{ margin: '2rem 0' }}>
                您暂时没有开通小程序，请前往应用后台查看
              </div>
              <Share />
            </TextCenter>
          );
        }
      }
    };

    return (
      <Wrapper>
        <StyedCard>
          <Name>{name}</Name>
          <div>{job}</div>
          <div>{phone}</div>
          <Placeholder />
          <div>{company}</div>

          <Avatar src={avatar} />
        </StyedCard>

        <ShowQrcode />
      </Wrapper>
    );
  }
}
