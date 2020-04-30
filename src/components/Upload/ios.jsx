import React, { PureComponent } from 'react';
import propsType from 'prop-types';
import { Wrapper, Card, StyledBadge, StyledCard } from './Styled';
import fetch from 'isomorphic-fetch';
import { chooseImage, getLocalImgData, uploadImage } from '../../utils/weixin';
import { isiOS } from '../../utils/utils';
import Toast from '../../components/Toast';
import Crop from '../ImageCrop/Crop';

import { uploadImageData, uploadMediaId } from './common';

/**
 * const files = [
 *    {
 *        localId: 1,
 *        localData: '',
 *        serverId: 2,
 *        serverData: ''
 *    }
 * ]
 */
export default class UploadWx extends PureComponent {
  static propTypes = {
    cropper: propsType.bool,
    aspectRatio: propsType.any,
    children: propsType.any,
    maxCount: propsType.any,
    allowSelectCount: propsType.any,
    files: propsType.array,
    onUploadFinish: propsType.func,
    onDeleted: propsType.func,
    onChange: propsType.func,
    onProccess: propsType.func
  };

  static defaultProps = {
    maxCount: 9,
    allowSelectCount: 1,
    files: []
  };

  constructor(props) {
    super(props);

    this.state = {
      files: props.files,
      cropper_visible: false,
      cropper_url: ''
    };

    // 记下上传成功的localId
    this.localIds = [];
    this.serverId = [];
    // 模拟上传进度
    this.proccess = 0;
  }

  /**
   * 选择图片
   */
  handleChooseImage = () => {
    const { files } = this.state;

    chooseImage({
      count: this.props.allowSelectCount - files.length,
      // sizeType: ['compressed'],
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: res => {
        const localIds = res.localIds;
        // 记下上传成功的localId
        this.localIds = localIds;
        // 本地浏览
        this.wxGetLocalImgData(localIds);
        // 设置进度
        this.setProccess(10);
      }
    });
  };

  /**
   * 获取本地图片
   * @param {array} localIds
   */
  wxGetLocalImgData(localIds) {
    this.serverId = [];
    const { cropper } = this.props;

    localIds.forEach((localId, index) => {
      // debug
      if (isiOS()) {
        // Ios
        getLocalImgData({
          localId: localId,
          success: res => {
            const localData = res.localData;

            if (cropper) {
              this.setProccess(100);
              this.setState({ cropper_visible: true, cropper_url: localData });
            } else {
              this.wxUploadImage(localId, localData, index);
            }
          }
        });
      } else {
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
    const { files } = this.state;
    uploadImage({
      localId: localId,
      isShowProgressTips: 0, // 默认为1，显示进度提示
      success: res => {
        const serverId = res.serverId;
        if (!this.props.cropper) {
          files.push({
            localId,
            localData,
            serverId
          });

          this.setState({ files: [...files] });
        }

        this.serverId.push(serverId);
        if (this.localIds.length === this.serverId.length) {
          // 上传图片
          this.uploadImage(this.serverId);

          // 设置进度
          this.setProccess(50);
        }
      }
    });
  }

  /**
   * 上传图片之后，从服务器中下载图片
   * @param {array} serverId
   */
  uploadImage(serverId) {
    const { files } = this.state;

    uploadMediaId(serverId).then(res => {
      const { data } = res;

      for (let i in data) {
        files.forEach(file => {
          if (i === file.serverId) {
            file['serverData'] = data[i];
          }
        });
      }

      this.proccess = 100;

      if (this.props.cropper) {
        let cropper_url;
        for (let i in data) {
          cropper_url = data[i];
        }

        this.setState({
          cropper_visible: true,
          cropper_url: cropper_url
        });
      }

      const { onUploadFinish, onChange, onProccess } = this.props;
      if (onUploadFinish) {
        onUploadFinish(files);
      }

      if (onChange) {
        onChange(files);
      }

      // 设置进度
      this.setProccess(100);
    });
  }

  /**
   * 上传裁剪图片
   * @param {string} dataUrl
   */

  setProccess(proccess) {
    if (proccess === 10) {
      Toast.loading('图片上传中', 9999, null, true);
    } else if (proccess === 100) {
      Toast.hide();
    }

    this.proccess = proccess;
    const { onProccess } = this.props;
    if (onProccess) {
      onProccess(proccess);
    }
  }

  /**
   * 删除指定图片
   * @param {init} key 索引
   */
  handleDeleteImage = key => {
    const { files } = this.state;

    let newFiles = [...files.slice(0, key), ...files.slice(key + 1)];

    this.setState({
      files: newFiles
    });

    // 删除图片数据
    const { onDeleted, onChange } = this.props;
    if (onDeleted) {
      onDeleted(newFiles);
    }

    if (onChange) {
      onChange(newFiles);
    }
  };

  uploadCropImage(formData) {
    const { files } = this.state;

    uploadImageData(formData).then(res => {
      const _files = [
        ...files,
        {
          localId: +new Date(),
          localData: res.data,
          serverId: +new Date(),
          serverData: res.data
        }
      ];

      this.setState({ files: _files });
      const { onUploadFinish, onChange } = this.props;
      if (onUploadFinish) {
        onUploadFinish(_files);
      }
      onChange && onChange(_files);
    });
  }

  handleCropChange = data => {
    this.uploadCropImage(data);
    this.setState({ cropper_visible: false });
  };

  componentWillReceiveProps(nextProps) {
    if ('files' in nextProps && this.props.files !== nextProps.files) {
      this.setState({ files: nextProps.files });
    }
  }

  componentWillUnmount() {
    Toast.hide();
  }

  render() {
    const { maxCount } = this.props;
    const { files } = this.state;

    return (
      <Wrapper>
        {files.map((file, key) => {
          return (
            <StyledBadge
              key={key}
              text="x"
              shape="circle"
              sup
              position="right"
              onClick={() => this.handleDeleteImage(key)}
            >
              <Card>
                <img src={file.localData || file.serverData} />
              </Card>
            </StyledBadge>
          );
        })}
        {this.state.cropper_visible ? (
          <Crop
            aspectRatio={this.props.aspectRatio}
            url={this.state.cropper_url}
            onChange={this.handleCropChange}
          />
        ) : null}
        {maxCount > files.length ? (
          <StyledCard onClick={this.handleChooseImage}>+</StyledCard>
        ) : null}
      </Wrapper>
    );
  }
}
