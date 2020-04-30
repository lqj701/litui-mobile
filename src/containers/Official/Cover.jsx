import React from 'react';

import Cell from '../../components/Cell';
import UploadWx from '../../components/Upload/Weixin';

export default class Cover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [{ serverData: props.dataSource.image }],
    };
  }

  onUpload = images => {
    let image = images.shift();
    if (image) {
      image = image.serverData;
    } else {
      image = '';
    }

    const { onValueChange, index } = this.props;
    if (onValueChange) {
      onValueChange({ image: image, index });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (
      'dataSource' in nextProps 
    ) {
      this.setState({
        files: [
          {
            serverData: nextProps.dataSource.image,
          },
        ],
      });
    }
  }

  render() {
    const { dataSource } = this.props;
    let { files } = this.state;

    if (!dataSource.image) {
      files = [];
    }

    return (
      <Cell.Group>
        <Cell title="官网封面图" />
        <Cell>
          <UploadWx
            maxCount={1}
            allowSelectCount={1}
            files={files}
            onChange={this.onUpload}
          />
        </Cell>
      </Cell.Group>
    );
  }
}
