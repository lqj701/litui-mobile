import React from 'react';
import propsType from 'prop-types';

import Cell from '../../components/Cell';
import Panel from '../../components/Panel';
import UploadWx from '../../components/Upload/Weixin';

export default class Avatar extends React.Component {
  static propTypes = {
    src: propsType.any,
    onChange: propsType.func,
  };

  static defaultProps = {
    src: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      files: this.getFilesProps(props),
    };
  }

  getFilesProps(props) {
    if ('src' in props) {
      return [
        {
          serverData: props.src,
        },
      ];
    }

    return [];
  }

  componentWillReceiveProps(nextProps) {
    if ('src' in nextProps && this.props.src !== nextProps.src) {
      const files = this.getFilesProps(nextProps);

      this.setState({ files });
    }
  }

  render() {
    const { onChange } = this.props;
    const { files } = this.state;

    return (
      <Panel>
        <Panel.Header title="头像" />
        <Panel.Body>
          <Cell>
            <UploadWx
              maxCount={1}
              allowSelectCount={1}
              files={files}
              onChange={onChange}
            />
          </Cell>
        </Panel.Body>
      </Panel>
    );
  }
}
