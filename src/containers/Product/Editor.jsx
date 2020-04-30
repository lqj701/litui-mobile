import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateProduct, deleteProduct, findProduct } from '../../actions/product';
import { withRouter } from 'react-router-dom';
import Spinner from 'core/components/Spinner';

import Layout from '../../components/Layout';
import Button from '../../components/Button';
import Confirm from '../../components/Dialogs/Confirm';
import Toast from '../../components/Toast';

import Images from './Block/Images';
import EditorButtonSales from './EditorButtonSales';
import ProductInfo from './Block/ProductInfo';

const StyledButton = styled(Button)`
  margin: 0.3rem 0;
`;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
`;

class ProductEditor extends React.Component {
  static propTypes = {
    dispatch: propsType.func,
    history: propsType.object,
    match: propsType.object,
    row: propsType.any
  };

  static defaultProps = {};

  productInfo = {};

  constructor(props) {
    super(props);
    this.state = {
      cover: [],
      pictures: [],
      product: []
    };

    this.onSale = false;
    this.cover = [];
    this.pictures = [];
  }

  showToast(message, onClose) {
    Toast.info(message, 1, onClose, false);
  }

  handleSaveClick = () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const { name, price, introduce, priceUncertain } = this.productInfo;
    const { cover, pictures, onSale } = this;

    const productImage = [...cover, ...pictures];

    const body = {
      productId: id,
      name,
      price,
      introduce,
      onSale,
      productImage,
      price_uncertain: priceUncertain
    };

    // console.error(body);

    if (!productImage.length) {
      this.showToast('产品封面不能为空');
      return;
    }

    if (name === '') {
      this.showToast('产品名称不能为空');
      return;
    }

    // if (price === '') {
    //   this.showToast('价格不能为空');
    //   return;
    // }

    this.props.dispatch(updateProduct(body)).then(action => {
      if (action.payload === 0) {
        this.showToast('保存成功', () => this.props.history.goBack());
      } else {
        this.showToast('保存失败');
      }
    });
  };

  // 删除操作
  handleDeleteClick = () => {
    Confirm({
      headerText: '删除',
      bodyText: '确认删除产品？',
      onOkBtnClick: () => {
        this.deleteProduct();
      }
    });
  };

  deleteProduct() {
    const { id } = this.props.match.params;
    this.props
      .dispatch(
        deleteProduct({
          productIds: id
        })
      )
      .then(action => {
        if (action.payload === 0) {
          this.showToast('删除成功', () => this.props.history.goBack());
        } else {
          this.showToast('删除失败');
        }
      });
  }

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

  componentDidMount() {
    document.title = '编辑产品';
    this.props.dispatch(
      findProduct({
        productId: this.props.match.params.id
      })
    );
  }

  componentWillReceiveProps(nextProps) {
    if ('row' in nextProps) {
      const {
        row: { product }
      } = nextProps;

      this.onSale = product.onSale;
      this.cover = nextProps.row.showImage.map(value => {
        return {
          imageUrl: value,
          order: 0,
          imageUse: 0
        };
      });

      this.pictures = nextProps.row.detail.map((value, key) => {
        return {
          imageUrl: value,
          order: key,
          imageUse: 1
        };
      });
    }
  }

  // 产品信息
  handleInputGroupFromChange = values => {
    for (let i in values) {
      this.productInfo[i] = values[i];
    }
  };

  // 产品上下架
  handleSalesChange = status => {
    this.onSale = status;
  };

  render() {
    const { row } = this.props;

    if (!this.props.row) {
      return <Spinner />;
    }

    const { product } = row;

    const showImage = row.showImage.map(image => {
      return {
        serverData: image
      };
    });

    const showDetail = row.detail.map(image => {
      return {
        serverData: image
      };
    });

    const form = [
      {
        name: '产品名称',
        value: product.name,
        placeholder: '请输入产品名称',
        maxlength: 255,
        field: 'name'
      },
      {
        name: '价格面议',
        value: product.priceUncertain,
        field: 'priceUncertain',
        type: 'switch'
      },
      {
        name: '价格',
        placeholder: '请输入价格',
        value: product.price / 100,
        maxlength: 9,
        field: 'price'
      },
      {
        name: '简介',
        placeholder: '请输入简介',
        value: product.productIntroduce,
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
          files={showImage}
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
          files={showDetail}
          onChange={this.handlePictureUpload}
        />

        <Layout>
          <StyledButton color="default" onClick={this.handleDeleteClick}>
            删除
          </StyledButton>

          <EditorButtonSales
            status={product.onSale}
            onChange={this.handleSalesChange}
          />

          <StyledButton onClick={this.handleSaveClick}>保存</StyledButton>
        </Layout>
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  const {
    product: { row }
  } = state;
  return { row };
}
export default connect(mapStateToProps)(withRouter(ProductEditor));
