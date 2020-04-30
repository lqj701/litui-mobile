import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getWxUserProducts, updateWxUserProduct } from '../../../actions/product';
import { withRouter } from 'react-router-dom';

import Layout from '../../../components/Layout';
import PullToRefresh from '../../../components/PullToRefresh';
import Cell from '../../../components/Cell';
import Button from '../../../components/Button';
import Toast from '../../../components/Toast';

import ProductItem from './ProductItem';
import ProductGroup from './ProductGroup';

const StyledButton = styled(Button)`
  margin: 0.3rem 0;
`;

const StyledTitle = styled.div`
  color: #999;
`;

const StyledDesc = styled.span`
  color: #f00;
`;

class MyProduct extends React.Component {
  static propTypes = {
    dispatch: propsType.func,
    history: propsType.object,
    list: propsType.any
  };

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      mainProductId: null,
      unMainProductId: null,
      data: [],
      pageSize: 0,
      currentPage: 1
    };
  }

  showToast(message, onClose) {
    Toast.info(message, 1, onClose, false);
  }

  handleSaveClick = () => {
    let { mainProductId, unMainProductId } = this.state;

    // console.log(
    //   'mainProductId,unMainProductId',
    //   mainProductId,
    //   unMainProductId
    // );

    // if (!mainProductId) {
    //   this.showToast('保存成功', () => this.props.history.goBack());
    //   return;
    // }

    this.props
      .dispatch(
        updateWxUserProduct({
          unMainProductId,
          mainProductId
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

  handleProductGroupChange = (value, checked) => {
    if (checked) {
      this.setState({
        mainProductId: value,
        unMainProductId: this.state.mainProductId
      });
    } else {
      this.setState({
        mainProductId: '',
        unMainProductId: this.state.mainProductId
      });
    }
  };

  componentDidMount() {
    document.title = '我的产品';
    this.fetchProducts();
  }

  /**
   * 获取产品列表
   * @return {Promise}
   *
   */
  fetchProducts() {
    let { currentPage } = this.state;
    return this.props.dispatch(
      getWxUserProducts({
        page: currentPage,
        row: 50
      })
    );
  }

  /**
   * 下拉刷新
   * @return {Promise} 返回dispatch
   */
  pullDownRefresh = () => {
    this.setState({ currentPage: 1 });
    return this.fetchProducts();
  };

  /**
   * 上拉加载
   * @return {Promise} 返回dispatch
   */
  loadMoreData = () => {
    const { hasNext } = this.state;

    if (hasNext) {
      return this.fetchProducts();
    }

    return Promise.resolve(true);
  };

  componentWillReceiveProps(nextProps) {
    if ('list' in nextProps && nextProps.list !== this.props.list) {
      const { data, currentPage } = this.state;
      let mainProductId;

      const list = nextProps.list.products.map(value => {
        if (value.isMain) {
          mainProductId = value.product.id;
        }

        return {
          id: value.product.id,
          name: value.product.name,
          price: value.product.price,
          imageUrl: value.imageUrl,
          onSale: value.product.onSale,
          isMain: value.isMain,
          checked: !!value.product.onSale,
          productIntroduce: value.introduce || value.product.productIntroduce,
          priceUncertain: value.product.priceUncertain
        };
      });

      if (currentPage === 1) {
        this.setState({
          data: list,
          currentPage: currentPage + 1,
          hasNext: nextProps.list.hasNext,
          pageSize: nextProps.list.count,
          mainProductId
        });
      } else {
        this.setState({
          data: [...data, ...list],
          currentPage: currentPage + 1,
          hasNext: nextProps.list.hasNext,
          mainProductId
        });
      }
    }
  }

  render() {
    const { data, pageSize, mainProductId } = this.state;

    const Title = () => <StyledTitle>共 {pageSize} 个产品</StyledTitle>;
    const Descritpion = () =>
      data.length !== 0 && (
        <StyledDesc
          onClick={() => this.props.history.push('/My/Product/Editor')}
        >
          编辑
        </StyledDesc>
      );

    return (
      <PullToRefresh
        offset="0px"
        pullDownRefresh={this.pullDownRefresh}
        pullUpLoad={this.loadMoreData}
      >
        <Cell.Group>
          <Cell title={<Title />} description={<Descritpion />} />

          <ProductGroup
            onChange={this.handleProductGroupChange}
            value={mainProductId}
          >
            {data.map((value, key) => (
              <ProductItem key={key} item={value} value={value.id} />
            ))}
          </ProductGroup>
        </Cell.Group>

        <Layout>
          <StyledButton
            color="default"
            onClick={() => this.props.history.push('/My/Product/Select')}
          >
            选择我负责的产品
          </StyledButton>
          <StyledButton onClick={this.handleSaveClick}>保存</StyledButton>
        </Layout>
      </PullToRefresh>
    );
  }
}

function mapStateToProps(state) {
  const {
    product: { userProducts }
  } = state;

  return {
    list: userProducts
  };
}
export default connect(mapStateToProps)(withRouter(MyProduct));
