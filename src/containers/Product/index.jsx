import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions/product';
import { withRouter } from 'react-router-dom';

import PullToRefresh from '../../components/PullToRefresh';
import Cell from '../../components/Cell';
import Button from '../../components/Button';
import Layout from '../../components/Layout';
import Image from '../../components/Image';

import Price from './Price';
import Status from './Status';
import ProductName from './ProductName';

const StyledButton = styled(Button)`
  margin-top: 0.6rem;
`;

const StyledCell = styled(Cell)`
  padding: 0.3rem 0;
`;

class ProductPage extends React.Component {
  static propTypes = {
    dispatch: propsType.func,
    history: propsType.object,
    list: propsType.any
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pageSize: 0,
      currentPage: 1
    };
  }

  handleEditorClick = id => {
    this.props.history.push(`/Product/Editor/${id}`);
  };

  handleAddClick = () => {
    this.props.history.push(`/Product/Add`);
  };

  componentDidMount() {
    document.title = '产品管理';
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
      fetchProducts({
        page: currentPage,
        row: 20
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
      const list = nextProps.list.data;

      if (currentPage === 1) {
        this.setState({
          data: list,
          currentPage: currentPage + 1,
          hasNext: nextProps.list.hasNext,
          pageSize: nextProps.list.pageSize
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
    const { data, pageSize } = this.state;

    if (!this.props.list.pageSize && !this.props.list.isFetching) {
      return (
        <div>
          <Cell.Group>
            <Cell title={`共 0 个产品`} />
            <Status style={{ background: '#fff' }} />
          </Cell.Group>
          <Layout>
            <StyledButton onClick={this.handleAddClick}>新增</StyledButton>
          </Layout>
        </div>
      );
    }

    return (
      <PullToRefresh
        offset="0px"
        pullDownRefresh={this.pullDownRefresh}
        pullUpLoad={this.loadMoreData}
      >
        <Cell.Group>
          <Cell title={`共 ${pageSize} 个产品`} />
          {data.map((value, key) => {
            return (
              <StyledCell
                hasArrow
                key={key}
                icon={<Image src={value.imageUrl} />}
                onClick={() => this.handleEditorClick(value.product.id)}
              >
                <div>
                  <ProductName>{value.product.name}</ProductName>
                  <Price
                    value={value.product.price}
                    uncertain={value.product.priceUncertain}
                  />
                </div>
              </StyledCell>
            );
          })}
        </Cell.Group>

        <Layout>
          <StyledButton onClick={this.handleAddClick}>新增</StyledButton>
        </Layout>
      </PullToRefresh>
    );
  }
}

function mapStateToProps(state) {
  const {
    product: { list }
  } = state;
  return { list };
}
export default connect(mapStateToProps)(withRouter(ProductPage));
