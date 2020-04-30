import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserIntroduceInfo, updateIntroduce } from '../../actions/user';

import Layout from '../../components/Layout';
import Cell from '../../components/Cell';
import Input from '../../components/Input';
import Panel from '../../components/Panel';
import Button from '../../components/Button';
import UploadWx from '../../components/Upload/Weixin';
import Toast from '../../components/Toast';

const StyledButton = styled(Button)`
  margin-top: 0.6rem;
`;

const getImages = images => {
  return images.map(image => {
    return {
      serverData: image.url,
    };
  });
};

const Picture = ({ files, onChange }) => (
  <Panel>
    <Panel.Header title="照片" />
    <Panel.Body>
      <Cell>
        <UploadWx
          files={getImages(files)}
          maxCount={9}
          allowSelectCount={9}
          onChange={onChange}
        />
      </Cell>
    </Panel.Body>
  </Panel>
);

const Signa = ({ value, onChange }) => (
  <Panel>
    <Panel.Header title="个性签名" />
    <Panel.Body>
      <Cell>
        <Input
          showCount
          type="textarea"
          placeholder="请输入您的签名"
          rows={3}
          value={value}
          onChange={onChange}
        />
      </Cell>
    </Panel.Body>
  </Panel>
);

class Signature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.imageUrls = [];
    this.signature = this.getSignaProps(props);
  }

  getSignaProps(props) {
    if ('introduceInfo' in props && props.introduceInfo) {
      return props.introduceInfo.signature;
    }
    return '';
  }

  showToast(message, onClose) {
    Toast.info(message, 1, onClose, false);
  }

  handleSaveClick = () => {
    const params = {
      sign: this.signature,
      imageUrls: this.imageUrls,
    };

    this.props.dispatch(updateIntroduce(params)).then(action => {
      if (action.payload === 0) {
        this.showToast('保存成功', () => this.props.history.goBack());
      } else {
        this.showToast('保存失败');
      }
    });
  };

  handleUploadImageChange = images => {
    const imageUrls = images.map(image => {
      return image.serverData;
    });
    this.imageUrls = imageUrls;
  };

  componentDidMount() {
    document.title = '个人介绍';
    this.props.dispatch(getUserIntroduceInfo());
  }

  componentWillReceiveProps(nextPros) {
    if ('introduceInfo' in nextPros) {
      const { introduceInfo } = nextPros;

      this.imageUrls = introduceInfo.images.map(image => {
        return image.url;
      });

      this.signature = nextPros.introduceInfo.signature;
    }
  }

  handleTextChange = value => {
    this.signature = value;
  };

  render() {
    const { introduceInfo } = this.props;

    if (!introduceInfo) {
      return <div />;
    }

    return (
      <div>
        <Signa
          value={introduceInfo.signature}
          onChange={this.handleTextChange}
        />

        <Picture
          files={introduceInfo.images}
          onChange={this.handleUploadImageChange}
        />

        <Layout>
          <StyledButton onClick={this.handleSaveClick}>保存</StyledButton>
        </Layout>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    user: { introduceInfo },
  } = state;
  return { introduceInfo };
}
export default connect(mapStateToProps)(withRouter(Signature));
