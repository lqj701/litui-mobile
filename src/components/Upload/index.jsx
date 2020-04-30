import React, { PureComponent } from 'react';
import { Wrapper, Card, StyledBadge, StyledCard } from './Styled';
import fetch from 'isomorphic-fetch';

export default class Upload extends PureComponent {
  static defaultProps = {
    count: 1,
  };

  constructor(props) {
    super(props);

    this.state = {
      imgList: props.imgList || [],
    };
  }

  handleChooseImage = () => {
    const self = this;

    // 选图片
    window.wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，
        self.wxUploadImage(localIds[0]);
      },
    });
  };

  // wxGetLocalImgData(localId) {
  //   const self = this;

  //   window.wx.getLocalImgData({
  //     localId: localId, // 图片的localID
  //     success: function(res) {
  //       var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
  //       self.setState({
  //         imgList: this.state.imgList.push({
  //           id: localId,
  //           link: localData,
  //         }),
  //       });
  //     },
  //   });
  // }

  wxUploadImage(localId) {
    const self = this;

    window.wx.uploadImage({
      localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success: function(res) {
        var serverId = res.serverId; // 返回图片的服务器端ID
        self.uploadImage(res.serverId);
      },
    });
  }

  uploadImage(serverId) {
    // 上传到我们服务器中
    const { imgList } = this.state;
    let action = {
      url: `${AppConf.api.domain}${AppConf.api.pathPrefix}api/wx/${
        AppConf.appId
      }/media/uploadImage`,
      userToken: AppConf.api.userToken,
    };

    fetch(action.url + '?mediaId=' + serverId, {
      headers: {
        Authorization: `Token userToken=${action.userToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        this.setState({
          imgList: [
            {
              link: data.data,
            },
          ],
        });

        const { onUpload } = this.props;
        if (onUpload) {
          onUpload(data.data);
        }
      });
  }

  handleDeleteImage = key => {
    const { imgList } = this.state;

    let list = [...imgList.slice(0, key), ...imgList.slice(key + 1)];

    this.setState({
      imgList: list,
    });

    // 删除图片数据
    const { onDelete } = this.props;
    if (onDelete) {
      onDelete(list);
    }
  };

  componentWillReceiveProps(nextProps) {
    if ('imgList' in nextProps) {
      this.setState({ imgList: nextProps.imgList });
    }
  }

  render() {
    const { children, position, count } = this.props;
    const { imgList } = this.state;
    return (
      <Wrapper>
        {imgList.map((value, key) => {
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
                <img src={value.link} />
              </Card>
            </StyledBadge>
          );
        })}
        {count > imgList.length ? (
          <StyledCard onClick={this.handleChooseImage}>+</StyledCard>
        ) : null}
      </Wrapper>
    );
  }
}
