import React from 'react';
import PropTypes from 'prop-types';
import Cell from '../../components/Cell';
import Input from '../../components/Input';
import Icon from '../../components/Icon';
import confirm from '../../components/Dialogs/Confirm';
import UploadWx from '../../components/Upload/Weixin';
import forEach from 'lodash/forEach';

export default class Video extends React.Component {
  static propTypes = {
    dataSource: PropTypes.any,
    dragHangle: PropTypes.any,
    onMove: PropTypes.any,
    index: PropTypes.any,
    onValueChange: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      images: [],
      files: this.getImages(props.dataSource.videoCover)
    };
  }

  handleUrlInputChange = event => {
    const { value } = event.target;
    this.setState({ videoUrl: value });

    const { onValueChange, index } = this.props;
    onValueChange && onValueChange({ videoUrl: value, index });
  };

  handleDeleteClick = () => {
    const { dataSource, index, onValueChange } = this.props;
    let hasValue = false;

    forEach(dataSource, value => {
      if (value) hasValue = true;
    });

    if (hasValue) {
      confirm({
        headerText: '删除',
        bodyText: '删除后，内容无法恢复',
        onOkBtnClick: () => {
          if (onValueChange) {
            onValueChange({ deleted: true, index });
          }
        }
      });
    } else {
      if (onValueChange) {
        onValueChange({ deleted: true, index });
      }
    }
  };

  onUpload = images => {
    const { onValueChange, index } = this.props;
    const files = images.map(image => image.serverData);

    if (onValueChange) {
      onValueChange({ image: files, index, status: 'upload' });
    }
  };

  getImages(images) {
    if (images) {
      return images.map(image => {
        return {
          serverData: image
        };
      });
    }
    return [];
  }

  handleMoveClick = () => {
    const { onMove } = this.props;
    onMove && onMove();
  };

  componentWillReceiveProps(nextProps) {
    if ('dataSource' in nextProps) {
      const files = this.getImages(nextProps.dataSource.images);
      this.setState({ files });
    }
  }

  render() {
    const { dataSource, dragHangle } = this.props;
    const { files } = this.state;

    return (
      <Cell.Group>
        <Cell
          title="视频"
          description={
            <div>
              <span style={{ padding: '0.2rem 0.4rem' }}>
                <Icon type="delete" onClick={this.handleDeleteClick} />
              </span>
              {dragHangle}
            </div>
          }
        />
        <Cell
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            color: '#b1b1b1',
            lineHeight: 'normal'
          }}
        >
          <div>
            1.此视频地址不能使用网站的视频链接<br />
            2.视频地址填写错误小程序端将不能正常播放 <br />3.如何正确填写视频地址？<a href="https://www.yuque.com/richard_d/litui/ud7s28">
              点击查看
            </a>
          </div>
        </Cell>

        <Cell title="视频地址">
          <Input
            placeholder="请输入视频地址"
            value={dataSource.videoUrl}
            onChange={this.handleUrlInputChange}
          />
        </Cell>

        {/* <Cell title="视频封面">
          {dataSource.videoCover ? (
            <UploadWx
              maxCount={1}
              allowSelectCount={1}
              files={files}
              onChange={this.onUpload}
            />
          ) : (
            <UploadWx
              maxCount={1}
              allowSelectCount={1}
              files={[]}
              onChange={this.onUpload}
            />
          )}
        </Cell> */}
      </Cell.Group>
    );
  }
}
