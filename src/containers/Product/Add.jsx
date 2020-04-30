import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addProduct } from '../../actions/product';
import { withRouter } from 'react-router-dom';

import Toast from '../../components/Toast';

import Images from './Block/Images';
import ButtonSubmit from './ButtonSubmit';
import ProductInfo from './Block/ProductInfo';

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
`;
class ProductAdd extends React.Component {
  static propTypes = {
    dispatch: propsType.func,
    history: propsType.object
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      productImage: []
    };

    this.productInfo = {};
    this.cover = [];
    this.pictures = [];
    this.isSubmit = false;
  }

  showToast(message, onClose, mask = false) {
    Toast.info(message, 1, onClose, mask);
  }

  handleSaveClick = () => {
    const { name, price, introduce, priceUncertain } = this.productInfo;
    const { cover, pictures } = this;

    const productImage = [...cover, ...pictures];

    const body = {
      name: name,
      price: price,
      introduce: introduce,
      productImage,
      price_uncertain: priceUncertain
    };

    // console.log('body', body);

    if (!productImage.length || !cover.length) {
      this.showToast('产品封面不能为空');
      return;
    }

    if (name === '' || name === undefined) {
      this.showToast('产品名称不能为空');
      return;
    }

    // if (price === '' || price === undefined) {
    //   this.showToast('价格不能为空');
    //   return;
    // }

    Toast.loading('正在保存中', 10, null, true);
    if (!this.isSubmit) {
      this.isSubmit = true;
      this.props.dispatch(addProduct(body)).then(action => {
        if (action.payload === 0) {
          Toast.hide();
          this.props.history.goBack();
        } else {
          this.showToast('保存失败');
        }
      });
    }
  };

  handleCoverUpload = images => {
    const imageUrls = images.map(image => {
      return {
        imageUrl: image.serverData,
        order: 1,
        imageUse: 0
      };
    });

    console.error('handleUploadImageChange', imageUrls);

    this.cover = imageUrls;
  };

  handlePictureUpload = images => {
    const imageUrls = images.map(image => {
      return {
        imageUrl: image.serverData,
        order: 0,
        imageUse: 1
      };
    });

    console.error('handleUploadImageChange', imageUrls);

    this.pictures = imageUrls;
  };

  // 产品信息
  handleInputGroupFromChange = values => {
    // this.setState(values);
    // 保存修改值， 用setState会导致render
    for (let i in values) {
      this.productInfo[i] = values[i];
    }
  };

  render() {
    const form = [
      {
        name: '产品名称',
        value: '',
        placeholder: '请输入产品名称',
        maxlength: 255,
        field: 'name'
      },
      {
        name: '价格面议',
        value: false,
        field: 'priceUncertain',
        type: 'switch'
      },
      {
        name: '价格',
        placeholder: '请输入价格',
        value: '',
        maxlength: 9,
        field: 'price'
      },
      {
        name: '简介',
        placeholder: '请输入简介',
        value: '',
        maxlength: 255,
        field: 'introduce',
        type: 'textarea'
      }
    ];

    return (
      <Wrapper>
        <Images
          title="产品封面"
          cropper
          maxCount={1}
          allowSelectCount={1}
          files={[]}
          onChange={this.handleCoverUpload}
        />

        <ProductInfo
          form={form}
          onValueChange={this.handleInputGroupFromChange}
        />

        <Images
          title="介绍图片"
          maxCount={9}
          allowSelectCount={9}
          files={[]}
          onChange={this.handlePictureUpload}
        />

        <ButtonSubmit onChange={this.handleSaveClick} />
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    Product: {
      name: '',
      price: '',
      introduce: '',
      productImage: []
    }
  };
}
export default connect(mapStateToProps)(withRouter(ProductAdd));
