import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Cell from '../../components/Cell';
import Input from '../../components/Input';
import UploadWx from '../../components/Upload/Weixin';
import Icon from '../../components/Icon';
import confirm from '../../components/Dialogs/Confirm';
import forEach from 'lodash/forEach';

class Cover extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      files: this.getImages(props.dataSource.images),
    };
  }

  handleNameInputChange = event => {
    const { value } = event.target;
    this.setState({ name: value });

    const { onValueChange, index } = this.props;
    if (onValueChange) {
      onValueChange({ name: value, index });
    }
  };

  handleIntroducInputChange = event => {
    const { value } = event.target;
    this.setState({ descr: value });

    const { onValueChange, index } = this.props;
    if (onValueChange) {
      onValueChange({ descr: value, index });
    }
  };

  handleDeleteClick = () => {
    const { dataSource, index, onValueChange } = this.props;

    let hasValue = false;

    forEach(dataSource, value => {
      if (value) hasValue = true;
    });

    if (hasValue) {
      confirm({
        headerText: '提示',
        bodyText: '删除后，内容无法恢复！',
        onOkBtnClick: () => {
          if (onValueChange) {
            onValueChange({ deleted: true, index });
          }
        },
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
          serverData: image,
        };
      });
    }
    return [];
  }

  componentWillReceiveProps(nextProps) {
    // todo: 执行了2次
    if (
      'dataSource' in nextProps &&
      this.props.dataSource !== nextProps.dataSource
    ) {
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
          title="图文"
          description={
            <div>
              <span style={{ padding: '0.2rem 0.4rem' }}>
                <Icon type="delete" onClick={this.handleDeleteClick} />
              </span>
              {dragHangle}
            </div>
          }
        />
        <Cell title="区块名称">
          <Input
            placeholder="请输入名称"
            value={dataSource.name}
            onChange={this.handleNameInputChange}
          />
        </Cell>
        <Cell title="描述">
          <Input
            placeholder="请输入描述"
            value={dataSource.descr}
            onChange={this.handleIntroducInputChange}
          />
        </Cell>
        <Cell>
          {dataSource.images ? (
            <UploadWx
              maxCount={9}
              allowSelectCount={9}
              files={files}
              onChange={this.onUpload}
            />
          ) : (
            <UploadWx
              maxCount={9}
              allowSelectCount={9}
              files={[]}
              onChange={this.onUpload}
            />
          )}
        </Cell>
      </Cell.Group>
    );
  }
}

Cover.propTypes = {
  dragHangle: PropTypes.any,
  dataSource: PropTypes.object.isRequired,
  onValueChange: PropTypes.func,
  index: PropTypes.number.isRequired,
};
Cover.defaultProps = {};

export default Cover;
