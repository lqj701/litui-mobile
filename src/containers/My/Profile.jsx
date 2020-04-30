import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUserInfo } from '../../actions/user';
import Spinner from 'core/components/Spinner';
import Toast from '../../components/Toast';

import Layout from '../../components/Layout';
import Cell from '../../components/Cell';
import Button from '../../components/Button';
import UploadCrop from '../../components/ImageCrop/UploadCrop';

import Form from './Form';

const CellGroup = styled.div`
  margin-top: 0.31rem;
`;

const StyledButton = styled(Button)`
  margin-top: 0.6rem;
`;

class Profile extends React.Component {
  static propTypes = {
    dispatch: propsType.func,
    history: propsType.object,
    userInfo: propsType.object,
    formData: propsType.array,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      avatar: this.getAvatarProps(props),
      isEditorAvatar: false,
    };
  }

  getAvatarProps(props) {
    if ('userInfo' in props && props.userInfo) {
      return props.userInfo.wxUser.avatar;
    }
  }

  showToast(message, onClose) {
    Toast.info(message, 1, onClose, false);
  }

  // save
  handleSaveClick = () => {
    const {
      // avatar,
      name,
      position,
      phone2,
      phone1,
      weixinid,
      email,
    } = this.state;

    if (name === '') {
      this.showToast('姓名不能为空');
      return;
    }

    this.props
      .dispatch(
        updateUserInfo({
          // avatar,
          name,
          phone1,
          phone2,
          position,
          weixinid,
          email,
        })
      )
      .then(action => {
        if (action.payload === 0) {
          this.showToast('保存成功', () => this.props.history.goBack());
        } else {
          this.showToast('保存失败');
        }
      });
  };

  handleAvatarClick = (avatar) => {
    this.setState({ avatar, isEditorAvatar: !avatar });

    this.props.dispatch(updateUserInfo({
      avatar,
    })).then(action => {
      if (action.payload === 0) {
        this.showToast('修改成功');
      } else {
        this.showToast('修改失败');
      }
    });
  };

  handleForm = value => {
    this.setState(value);
  };

  componentWillReceiveProps(nextProps) {
    if ('userInfo' in nextProps) {
      const avatar = nextProps.userInfo.wxUser.avatar;
      this.setState({ avatar });
    }
  }

  componentDidMount() {
    document.title = '完善我的名片';
  }

  render() {
    const { userInfo, formData } = this.props;
    const { isEditorAvatar, avatar } = this.state;

    if (!userInfo) {
      return <Spinner />;
    }

    const uploadFile = {
      serverData: avatar,
    };

    return (
      <div>
        {!isEditorAvatar && (
          <div>
            <CellGroup>
              <Cell
                hasArrow
                title="头像"
                description={
                  <UploadCrop
                    avatar={uploadFile}
                    onChange={this.handleAvatarClick}
                  />
                }
              />
            </CellGroup>

            <Form input={formData} output={this.handleForm} />

            <Layout>
              <StyledButton onClick={this.handleSaveClick}>保存</StyledButton>
            </Layout>
          </div>
        )}
      </div>
    );
  }
}

function getFormData(userInfo) {
  let data = [];

  if (userInfo) {
    const { wxUser } = userInfo;

    data = [
      {
        name: '姓名 *',
        placeholder: '请输入姓名',
        value: wxUser.name,
        maxlength: 16,
        field: 'name',
      },
      {
        name: '职务',
        placeholder: '请输入职务',
        value: wxUser.position,
        maxlength: 255,
        field: 'position',
      },
      {
        name: '电话',
        placeholder: '请输入电话',
        value: wxUser.phone1,
        maxlength: 15,
        field: 'phone1',
      },
      {
        name: '电话',
        placeholder: '请输入电话',
        value: wxUser.phone2,
        maxlength: 15,
        field: 'phone2',
      },
      {
        name: '微信',
        placeholder: '请输入微信',
        value: wxUser.weixinid,
        maxlength: 64,
        field: 'weixinid',
      },
      {
        name: '邮箱',
        placeholder: '请输入邮箱',
        value: wxUser.email,
        maxlength: 64,
        field: 'email',
      },
    ];
  }

  return data;
}

function mapStateToProps(state) {
  const {
    user: { userInfo },
  } = state;

  return { userInfo: userInfo, formData: getFormData(userInfo) };
}
export default connect(mapStateToProps)(withRouter(Profile));
