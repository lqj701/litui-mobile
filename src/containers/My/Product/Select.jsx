import React from 'react';
import propsType from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { updateWxUserProduct, fetchProducts } from '../../../actions/product';

import Cell from '../../../components/Cell';
import PullToRefresh from '../../../components/PullToRefresh';
import Checkbox from '../../../components/Checkbox';
import Button from '../../../components/Button';
import Layout from '../../../components/Layout';
import Image from '../../../components/Image';

import Price from '../../Product/Price';
import ProductName from '../../Product/ProductName';

const StyledButton = styled(Button)`
  margin-top: 0.6rem;
`;

const StyledCell = styled(Cell)`
  padding: 0.3rem 0;
`;

const StyledCheckbox = styled(Checkbox)`
  display: flex;
  margin-right: 0.3rem;
`;

class MySelectProduct extends React.Component {
  static propTypes = {
    dispatch: propsType.func,
    history: propsType.object,
    list: propsType.object,
    userProducts: propsType.object
  };

  static defaultProps = {};

  constructor() {
    super(...arguments);
    this.state = {
      bindIds: [],
      data: [],
      pageSize: 0,
      currentPage: 1
    };
  }
  /**
   * 绑定产品
   */
  handleSaveClick = () => {
    const { bindIds } = this.state;

    const bind = bindIds
      .filter(value => value.checked !== false)
      .map(value => value.value);
    const unbind = bindIds
      .filter(value => value.checked == false)
      .map(value => value.value);

    const params = {};
    if (bind.length !== 0) {
      params['bindIds'] = bind;
    }

    if (unbind.length !== 0) {
      params['unbindIds'] = unbind;
    }

    this.props
      .dispatch(updateWxUserProduct(params))
      .then(() => this.props.history.goBack());
  };

  /**
   * 选中当前的产品 事件
   * @param {object} event 产品
   */
  handleProductChange = event => {
    const { bindIds } = this.state;
    bindIds[event.key] = event;
    this.setState({ bindIds });
  };

  componentWillMount() {
    document.title = '选择我负责的产品';
  }

  componentDidMount() {
    const bindIds = this.getUserProductByIds();
    this.fetchProducts(bindIds);
  }

  /**
   * 下拉刷新
   * @return {Promise} 返回dispatch
   */
  pullDownRefresh = () => {
    this.setState({ currentPage: 1 });
    const bindIds = this.getUserProductByIds();
    return this.fetchProducts(bindIds);
  };

  /**
   * 上拉加载
   * @return {Promise} 返回dispatch
   */
  loadMoreData = () => {
    const { hasNext } = this.state;

    if (hasNext) {
      const bindIds = this.getUserProductByIds();
      return this.fetchProducts(bindIds);
    }

    return Promise.resolve(true);
  };

  /**
   * 获取产品列表
   * @param {Array} bindIds 产品id集合
   * @return {Promise}
   *
   */
  fetchProducts(bindIds) {
    let { currentPage } = this.state;
    return this.props.dispatch(
      fetchProducts({
        page: currentPage,
        row: 20,
        bindIds
      })
    );
  }

  /**
   * 获取我负责的产品id
   * @return 返回id集合
   */
  getUserProductByIds() {
    const { userProducts } = this.props;
    let bindIds = [];

    // 是否有负责产品
    if (userProducts) {
      bindIds = this.filterUserProductByIds(userProducts.products);
    }

    return bindIds;
  }

  /**
   * 取出产品id集合
   * @param {Array} data 数据列表
   * @return {Array} 产品id列表
   */
  filterUserProductByIds(data) {
    return data.map(value => {
      return value.product.id;
    });
  }

  /**
   * 取出需要的产品字段
   * @param {Array} data 数据列表
   * @return {Array} 返回新产品列表
   */
  filterProducts(data) {
    // 上架产品
    const _data = data.filter(value => value.product.onSale === 1);

    return _data.map(value => {
      return {
        id: value.product.id,
        name: value.product.name,
        isBind: value.isBind,
        imageUrl: value.imageUrl,
        price: value.product.price,
        uncertain: value.product.priceUncertain
      };
    });
  }

  componentWillReceiveProps(nextProps) {
    if ('list' in nextProps && nextProps.list !== this.props.list) {
      const { data, currentPage } = this.state;
      const list = this.filterProducts(nextProps.list.data);

      if (currentPage === 1) {
        this.setState({
          data: list,
          currentPage: currentPage + 1,
          hasNext: nextProps.list.hasNext
        });
      } else {
        this.setState({
          data: [...data, ...list],
          currentPage: currentPage + 1,
          hasNext: nextProps.list.hasNext
        });
      }
    }
  }

  render() {
    const { data } = this.state;

    return (
      <PullToRefresh
        offset="0px"
        pullDownRefresh={this.pullDownRefresh}
        pullUpLoad={this.loadMoreData}
      >
        <Cell.Group>
          <Cell title={`共 ${this.props.list.pageSize} 个产品`} />
          {data.map((value, key) => {
            return (
              <StyledCell
                key={key}
                header={
                  <StyledCheckbox
                    defaultChecked={value.isBind}
                    onChecked={checked =>
                      this.handleProductChange({
                        checked,
                        value: value.id,
                        key
                      })
                    }
                  />
                }
                icon={<Image src={value.imageUrl} />}
              >
                <div>
                  <ProductName>{value.name}</ProductName>
                  <Price value={value.price} uncertain={value.uncertain} />
                </div>
              </StyledCell>
            );
          })}
        </Cell.Group>

        <Layout>
          <StyledButton onClick={this.handleSaveClick}>保存</StyledButton>
        </Layout>
      </PullToRefresh>
    );
  }
}

function mapStateToProps(state) {
  const {
    product: { list, userProducts }
  } = state;

  return { list, userProducts };
}

export default connect(mapStateToProps)(withRouter(MySelectProduct));
