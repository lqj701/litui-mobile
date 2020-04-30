import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Spinner from 'core/components/Spinner';
import Cropper from 'cropperjs';

import 'cropperjs/dist/cropper.css';

import {
  CropWrapper,
  StyledLoading,
  DragBox,
  SaveBtn,
  StyledButton
} from './styled';

class Crop extends PureComponent {
  cropper = null;

  static defaultProps = {
    aspectRatio: 1 / 1
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };

    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  componentDidMount() {
    this.cropper = new Cropper(this.dragImg, {
      viewMode: 1, // 限制裁剪框不超过画布的大小
      dragMode: 'move', // 拖动模式
      aspectRatio: this.props.aspectRatio || 1 / 1, // 裁剪框比例
      autoCropArea: 0.8, // 默认值0.8（图片的80%）。0-1之间的数值，定义自动剪裁框的大小
      background: false, // 默认值true。是否在容器上显示网格背景
      restore: false, // 是否调整窗口大小后恢复裁剪区域
      guides: true, // 是否在剪裁框上显示虚线
      center: true, // 是否显示裁剪框 中间的+
      highlight: true, // 是否在剪裁框上显示白色的模态窗口
      cropBoxMovable: false, // 是否允许拖动裁剪框
      cropBoxResizable: false, // 是否允许拖动 改变裁剪框大小
      toggleDragModeOnDblclick: false, // 是否允许 拖动模式 “crop” 跟“move” 的切换状态, 即当点下为crop 模式，如果未松开拖动这时就是“move”模式。放开后又为“crop”模式
      ready: () => {
        this.setState({ isLoading: false });
      }
    });
  }

  componentWillUnmount() {
    this.cropper = null;
  }

  handleSaveClick() {
    const { onChange } = this.props;

    const cropper = this.cropper;
    const cropData = cropper.cropBoxData;
    const canvas = cropper.getCroppedCanvas({
      width: cropData.width,
      height: cropData.height
    });

    const dataUrl = canvas.toDataURL();
    const $Blob = this.dataURLtoBlob(dataUrl, 'image/jpeg');
    var formData = new FormData();
    formData.append('file', $Blob, `file_${Date.parse(new Date())}.jpeg`);

    if (onChange) {
      onChange(formData);
    }
  }

  /**
   * 根据base64 内容 取得 bolb
   *
   * @param {string} dataurl
   * @param {string} type
   * @returns Blob
   */
  dataURLtoBlob(dataurl, type) {
    const arr = dataurl.split(',');
    const bstr = window.atob(arr[1]);
    const mime = arr[0].match(/:(.*?);/)[1];
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: type ? type : mime });
  }

  render() {
    const { url } = this.props;

    return (
      <CropWrapper>
        <StyledLoading loading={this.state.isLoading}>
          <Spinner />
        </StyledLoading>

        <DragBox>
          <img ref={el => (this.dragImg = el)} src={url} />
        </DragBox>

        <SaveBtn>
          <StyledButton onClick={this.handleSaveClick}>使用</StyledButton>
        </SaveBtn>
      </CropWrapper>
    );
  }
}

Crop.propTypes = {
  url: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
Crop.defaultProps = {};

export default Crop;
