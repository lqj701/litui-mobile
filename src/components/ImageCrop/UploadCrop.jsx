import React, { PureComponent } from 'react';
import propsType from 'prop-types';
import fetch from 'isomorphic-fetch';
import { chooseImage, getLocalImgData, uploadImage } from '../../utils/weixin';
import Spinner from 'core/components/Spinner';
import { isiOS } from '../../utils/utils';
import Toast from '../Toast';
import Crop from './Crop';

import {
  Wrapper,
  StyledAvatar,
  StyledLoading,
} from './styled';

/**
 * const avatar = {
 *   localId: 1,
 *   localData: '',
 *   serverId: 2,
 *   serverData: ''
 * }
 */
export default class UploadCrop extends PureComponent {
  static propTypes = {
    avatar: propsType.object,
    onChange: propsType.func,
  };

  static defaultProps = {
    avatar: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      avatar: props.avatar,
      isCropAvatar: false,
      cropImg: null,
      isUploadCorp: false,
    };

    this.url = `${AppConf.api.domain}${AppConf.api.pathPrefix}api/wx/${AppConf.appId}/media/uploadImage`;
    this.uploadCropUrl = `${AppConf.api.domain}${AppConf.api.pathPrefix}api/wx/${AppConf.appId}/media/uploadImImage`;
    this.userToken = AppConf.api.userToken;

    // 记下上传成功的localId
    this.localIds = [];
    this.serverId = [];
  }

  getHeaders() {
    return {
      Authorization: `Token userToken=${this.userToken}`,
      'Content-Type': 'application/json; charset=utf-8',
    };
  }

  ajax(mediaId) {
    const url = this.url;
    const headers = this.getHeaders();
    const body = JSON.stringify({ mediaIds: mediaId });

    return fetch(url, { method: 'POST', headers, body }).then(response =>
      response.json()
    );
  }

  cropAjax(formData) {
    const headers = {
      Authorization: `Token userToken=${this.userToken}`,
    };

    return fetch(this.uploadCropUrl, { method: 'POST', headers, body: formData }).then(response =>
      response.json()
    );
  }

  /**
   * 选择图片
   */
  handleChooseImage = () => {
    chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const localIds = res.localIds;
        // 记下上传成功的localId
        this.localIds = localIds;
        // 本地浏览
        this.wxGetLocalImgData(localIds);
        // 设置进度
        this.setProccess(10);
      },
    });
  };

  /**
   * 获取本地图片
   * @param {array} localIds
   */
  wxGetLocalImgData(localIds) {
    this.serverId = [];

    localIds.forEach((localId, index) => {
      if (isiOS()) {
        getLocalImgData({
          localId: localId,
          success: res => {
            const localData = res.localData;
            this.setState({ isCropAvatar: true, cropImg: localData });
            this.setProccess(100);
          },
        });
      } else {
        this.setState({ isUploadCorp: true });
        // Android
        this.wxUploadImage(localId, localId, index);
      }
    });
  }

  /**
   * 上传图片接口
   * @param {array} localId
   */
  wxUploadImage(localId, localData, index) {
    uploadImage({
      localId: localId,
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success: res => {
        const serverId = res.serverId;
        const avatar = {
          localId,
          localData,
          serverId,
        };
        this.setState({ avatar });

        this.serverId.push(serverId);
        if (this.localIds.length - 1 === index) {
          // 上传图片
          this.uploadImage(this.serverId);
          // 设置进度
          this.setProccess(100);
        }
      },
    });
  }

  /**
   * 上传图片之后，从服务器中下载图片
   * @param {array} serverId
   */
  uploadImage(serverId) {
    const { avatar } = this.state;

    this.ajax(serverId)
      .then(res => {
        const { data } = res;

        for (let i in data) {
          if (i === avatar.serverId) {
            avatar['serverData'] = data[i];
          }
        }

        this.setState({ isUploadCorp: false, isCropAvatar: true, cropImg: avatar.serverData });
      })
      .catch(error => console.error(error));
  }

  /**
   * 上传裁剪图片
   * @param {string} dataUrl
   */
  uploadCropImage(dataUrl) {
    const { onChange } = this.props;

    this.cropAjax(dataUrl).then((res) => {
      if (onChange) onChange(res.data);
    }).catch(error => console.error(error));
  }

  setProccess(proccess) {
    if (proccess === 10) {
      Toast.loading('图片上传中', 120, null, true);
    } else if (proccess === 100) {
      Toast.hide();
    }
  }

  handleImageCropChange = data => {
    this.uploadCropImage(data);
    this.setState({ isCropAvatar: false });
  };

  componentWillReceiveProps(nextProps) {
    if ('avatar' in nextProps && this.props.avatar !== nextProps.avatar) {
      this.setState({ avatar: nextProps.avatar });
    }
  }

  renderCrop() {
    const { avatar } = this.props;
    return avatar ? (<StyledAvatar src={avatar.localData || avatar.serverData} onClick={this.handleChooseImage} />) : null;
  }
 
  render() {
    const { isCropAvatar, cropImg, isUploadCorp } = this.state;

    return (
      <Wrapper>
        <StyledLoading loading={isUploadCorp}>
          <Spinner />
        </StyledLoading>

        {isCropAvatar && cropImg ? <Crop url={cropImg} onChange={this.handleImageCropChange} /> : null}

        {!isCropAvatar ? this.renderCrop() : null}
      </Wrapper>
    );
  }
}
