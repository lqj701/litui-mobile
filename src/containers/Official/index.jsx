import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchWebsite, updateWebsite } from '../../actions/official';
import { arrayMove } from 'react-sortable-hoc';

import Toast from '../../components/Toast';
import ActionSheet from '../../components/ActionSheet';

import { SortableList } from './OfficialList';

// todo: 数据的输入与输出需要优化
class OfficialPage extends React.Component {
  blockCompany;

  constructor(props) {
    super(props);

    this.state = {
      blocks: []
    };

    this.cover_image_url;
  }

  showToast(message, onClose) {
    Toast.info(message, 1, onClose, false);
  }

  deletedBlock(blocks, index) {
    return [...blocks.slice(0, index), ...blocks.slice(index + 1)];
  }

  // 保存数据
  onSubmit = () => {
    let { blocks } = this.state;

    // 封面图
    let cover_image_url = blocks.filter(value => value.type === 98)[0].content
      .image;

    if (!cover_image_url) {
      cover_image_url = '';
    }

    // 公司名/简介
    let { introduce, corp_name } = blocks.filter(
      value => value.type === 99
    )[0].content;

    // 过滤掉封面图/公司信息
    blocks = blocks.filter(value => value.type !== 98 && value.type !== 99);

    // 过滤掉区块值全部为空的情况
    blocks = blocks.filter(value => {
      if (
        value.content.name !== '' ||
        value.content.descr !== '' ||
        value.content.images.length !== 0
      ) {
        return value;
      }
    });

    blocks = blocks.filter(value => {
      if (
        value.content.phone !== '' ||
        value.content.address !== '' ||
        value.content.email !== '' ||
        value.content.url !== ''
      ) {
        return value;
      }
    });

    // 过滤视频模块
    blocks = blocks.filter(value => {
      if (value.content.videoUrl !== '') {
        return value;
      }
    });

    // console.log(blocks);

    // 排序
    blocks.forEach((item, key) => {
      item.block_order = key;
    });

    const params = { corp_name, introduce, cover_image_url, blocks };

    // console.log(params);

    this.props.dispatch(updateWebsite(params)).then(action => {
      if (action.payload === 0) {
        this.showToast('保存成功', () => this.props.history.goBack());
      } else {
        this.showToast('保存失败');
      }
    });
  };

  /**
   * 添加选择类型
   * todo 流程判断需要优化
   */
  handelAddBlockClick = () => {
    const { blockCount, blocks } = this.state;

    const tel = blocks.filter(value => value.type === 0);
    const hasTel = tel.length;

    let BUTTONS = ['图文', '联系方式', '视频', '取消'];

    if (hasTel) {
      BUTTONS = ['图文', '视频', '取消'];
    }

    const video = blocks.filter(value => value.type === 2);
    const hasVideo = video.length;
    if (hasVideo) {
      BUTTONS = ['图文', '联系方式', '取消'];
    }

    if (hasTel && hasVideo) {
      BUTTONS = ['图文', '取消'];
    }

    ActionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        message: '选择新增区块'
      },
      buttonIndex => {
        if (hasTel && !hasVideo) {
          if (buttonIndex === 0) {
            this.handleAddPictureBlockClick();
          } else if (buttonIndex === 1) {
            this.handleAddVideoBlockClick();
          }
        } else if (hasVideo && !hasTel) {
          if (buttonIndex === 0) {
            this.handleAddPictureBlockClick();
          } else if (buttonIndex === 1) {
            this.handleAddTelBlockClick();
          }
        } else if (hasVideo && hasTel) {
          if (buttonIndex === 0) {
            this.handleAddPictureBlockClick();
          }
        } else {
          // ['图文', '联系方式', '视频', '取消']
          if (buttonIndex === 0) {
            this.handleAddPictureBlockClick();
          } else if (buttonIndex === 1) {
            this.handleAddTelBlockClick();
          } else if (buttonIndex == 2) {
            this.handleAddVideoBlockClick();
          }
        }
      }
    );
  };

  handleAddTelBlockClick = () => {
    const { blocks, blockCount } = this.state;

    const Tel = {
      type: 0,
      blockOrder: 2,
      content: {
        phone: '',
        email: '',
        address: '',
        url: ''
      }
    };

    blocks.push(Tel);

    this.setState({ blocks, blockCount: blockCount + 1 });
  };

  // 添加图文
  handleAddPictureBlockClick = () => {
    const { blocks, blockCount } = this.state;

    const picture = {
      type: 1,
      blockOrder: 2,
      content: {
        name: '',
        descr: '',
        images: []
      }
    };

    blocks.push(picture);

    this.setState({ blocks, blockCount: blockCount + 1 });
  };

  // 添加视频
  handleAddVideoBlockClick = () => {
    const { blocks, blockCount } = this.state;

    const Video = {
      type: 2,
      blockOrder: 2,
      content: {
        videoUrl: '',
        videoCover: []
      }
    };

    blocks.push(Video);

    this.setState({ blocks, blockCount: blockCount + 1 });
  };

  /**
   * 公司信息 监听事件
   * @param {object} event 返回：{ index, corp_name, introduce }
   */
  handleCompanyChange = event => {
    console.error(event);
    const { index, corp_name, introduce } = event;
    const { blocks } = this.state;

    let result = blocks.find((value, key) => key === index);

    if (corp_name !== undefined) {
      result.content.corp_name = corp_name;
    }
    if (introduce !== undefined) {
      result.content.introduce = introduce;
    }

    blocks.map((value, key) => {
      if (key === index) {
        value = result;
      }
    });

    this.setState({ blocks });
  };

  /**
   * 联系方式 监听事件
   * @param {object} event 返回：{ index, phone, email, url, address, deleted }
   */
  handleTelChange = event => {
    const { index, phone, email, url, address, deleted } = event;
    let { blocks } = this.state;

    let result = blocks.find((value, key) => key === index);

    if (phone !== undefined) {
      // tel == phone 接口参数变化
      result.content.phone = phone;
    }
    if (email !== undefined) {
      result.content.email = email;
    }
    if (url !== undefined) {
      result.content.url = url;
    }
    if (address !== undefined) {
      result.content.address = address;
    }

    if (deleted) {
      blocks = this.deletedBlock(blocks, index);
      this.setState({ blockCount: this.state.blockCount - 1 });
    }

    blocks.map((value, key) => {
      if (key === index) {
        value = result;
      }
    });

    this.setState({ blocks });
  };

  /**
   * 图文 监听事件
   * @param {object} event 返回：{ index, name, descr, deleted, image, status }
   */
  handlePictureChange = event => {
    const { index, name, descr, deleted, image, status } = event;
    let { blocks } = this.state;

    let result = blocks.find((value, key) => key === index);

    if (name !== undefined) {
      result.content.name = name;
    }
    if (descr !== undefined) {
      result.content.descr = descr;
    }

    if (image) {
      if (status === 'upload') {
        result.content.images = image;
      } else {
        result.content.images = image;
      }
    }

    if (deleted) {
      blocks = this.deletedBlock(blocks, index);
      this.setState({ blockCount: this.state.blockCount - 1 });
    }

    blocks.map((value, key) => {
      if (key === index) {
        value = result;
      }
    });

    this.setState({ blocks });
  };

  handleVideoChange = event => {
    let { blocks } = this.state;
    const { index,image, deleted } = event;
    const { videoUrl } = event;

    let result = blocks.find((value, key) => key === index);

    if (videoUrl !== undefined) {
      result.content.videoUrl = videoUrl;
    }

    if (image) {
      if (status === 'upload') {
        result.content.videoCover = image;
      } else {
        result.content.videoCover = image;
      }
    }

    if (deleted) {
      blocks = this.deletedBlock(blocks, index);
      this.setState({ blockCount: this.state.blockCount - 1 });
    }

    blocks.map((value, key) => {
      if (key === index) {
        value = result;
      }
    });
    this.setState({ blocks });
  };

  /**
   * 封面图 监听事件
   * @param {object} event 返回：{ index, image, deleted }
   */
  handleCoverChange = images => {
    const { index, image } = images;
    let { blocks } = this.state;

    blocks.map((value, key) => {
      if (key === index) {
        value.content.image = image;
      }
    });

    this.setState({ blocks });
  };

  /**
   * 重新排列数据
   * @param {array} oldIndex
   * @param {array} newIndex
   */
  handleSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({ blocks: arrayMove(this.state.blocks, oldIndex, newIndex) });
  };

  mergeBlocks(data) {
    const corpWebsite = data.corpWebsite
      ? data.corpWebsite
      : {
          coverImageUrl: '',
          name: '',
          introduce: ''
        };

    let blockList;
    if (!data.blockList) {
      blockList = [
        {
          type: 1,
          blockOrder: 0,
          content: {
            name: '',
            descr: '',
            images: []
          }
        },
        {
          type: 0,
          blockOrder: 0,
          content: {
            phone: '',
            email: '',
            address: '',
            url: ''
          }
        }
      ];
    } else {
      blockList = data.blockList.map(value => {
        return {
          ...value,
          content: JSON.parse(value.content)
        };
      });

      blockList = blockList.sort((a, b) => a.blockOrder - b.blockOrder);
    }

    const blocks = [
      {
        type: 98,
        blockOrder: 0,
        content: {
          image: corpWebsite.coverImageUrl
        }
      },
      {
        type: 99,
        blockOrder: 0,
        content: {
          corp_name: corpWebsite.name,
          introduce: corpWebsite.introduce
        }
      },
      ...blockList
    ];

    return blocks;
  }

  componentWillReceiveProps(nextProps) {
    if ('list' in nextProps) {
      const blocks = this.mergeBlocks(nextProps.list);

      const {
        list: { blockList }
      } = nextProps;

      this.setState({
        blocks,
        blockCount: blockList ? blockList.length : 1
      });
    }
  }

  componentDidMount() {
    document.title = '编辑官网';
    this.props.dispatch(fetchWebsite());
  }

  render() {
    const { blocks, blockCount } = this.state;

    return (
      <SortableList
        useDragHandle
        lockAxis="y"
        items={blocks}
        size={blockCount}
        onSortEnd={this.handleSortEnd}
        onSubmit={this.onSubmit}
        onAddBlock={this.handelAddBlockClick}
        handleCoverChange={this.handleCoverChange}
        handleCompanyChange={this.handleCompanyChange}
        handleTelChange={this.handleTelChange}
        handlePictureChange={this.handlePictureChange}
        handleVideoChange={this.handleVideoChange}
      />
    );
  }
}

function mapStateToProps(state) {
  const {
    website: { webSite }
  } = state;

  return {
    list: webSite
  };
}
export default connect(mapStateToProps)(withRouter(OfficialPage));
