import React from 'react';
import propsType from 'prop-types';
import { connect } from 'react-redux';
import {
  getWxUserProducts,
  updateWxUserProduct,
  updateMyProductIntroduces,
  updateMyProductOrder,
} from '../../../actions/product';
import { withRouter } from 'react-router-dom';
import {
  SortableContainer,
  SortableElement,
  arrayMove,
  SortableHandle,
} from 'react-sortable-hoc';
import Spinner from 'core/components/Spinner';

import Toast from '../../../components/Toast';

import { SortableList } from './EditorList';

class MyProductEditor extends React.Component {
  static propTypes = {
    dispatch: propsType.func,
    history: propsType.object,
    list: propsType.any,
  };

  timer;

  constructor(props) {
    super(props);
    this.state = {
      isWrite: false,
      list: [],
      unbindIds: [],
    };
  }

  getListProps(props) {
    if ('list' in props) {
      return props.list.products;
    }
    return [];
  }

  showToast(message, onClose) {
    Toast.info(message, 1, onClose, false);
  }

  /**
   * 发送请求
   */
  handleSaveClick = () => {
    const { unbindIds } = this.state;

    // 解绑的ID列表
    this.props.dispatch(updateWxUserProduct({ unbindIds })).then(action => {
      if (action.payload === 0) {
        this.showToast('保存成功', () => this.props.history.goBack());
      } else {
        this.showToast('保存失败');
      }
    });

    // 更新排序
    const { list } = this.state;
    const orderIds = list.map(value => {
      return value.product.id;
    });
    this.props.dispatch(updateMyProductOrder({ orderIds }));
  };

  // 更新产品介绍
  handleEditorProductChange = (value, id) => {
    if (!id) {
      return;
    }

    clearTimeout(this.timer);
    this.timer = setTimeout(
      () =>
        this.props.dispatch(
          updateMyProductIntroduces({
            productId: id,
            introduce: value,
          })
        ),
      800
    );
  };

  handleDeleteClick = id => {
    const { list, unbindIds } = this.state;

    const filter = list.filter(value => value.product.id !== id);
    const product = list.find(value => value.product.id === id);

    unbindIds.push(product.product.id);
    this.setState({ list: filter, unbindIds });
  };

  handleSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({ list: arrayMove(this.state.list, oldIndex, newIndex) });
  };

  handleActionClick = e => {
    const menuId = e.currentTarget.dataset.menuId;
    const list = this.state.list.slice().map(menuItem => {
      if (menuId === menuItem.id) {
        return Object.assign({}, menuItem, { visible: !menuItem.visible });
      }

      return menuItem;
    });

    this.setState({ list });
  };

  componentDidMount() {
    this.props.dispatch(
      getWxUserProducts({
        page: 1,
        row: 100,
      })
    );
  }

  componentWillReceiveProps(nextProps) {
    if ('list' in nextProps && this.props.list != nextProps.list) {
      this.setState({ list: nextProps.list.products });
    }
  }

  render() {
    const { list } = this.props;

    if (!list) {
      return <Spinner />;
    }

    return (
      <SortableList
        list={this.state.list}
        onSortEnd={this.handleSortEnd}
        onActionClick={this.handleActionClick}
        onDeleteClick={this.handleDeleteClick}
        onEditorChange={this.handleEditorProductChange}
        onUpdate={this.handleSaveClick}
        lockAxis="y"
        useDragHandle
      />
    );
  }
}

function mapStateToProps(state) {
  const {
    product: { userProducts },
  } = state;
  return {
    list: userProducts,
  };
}
export default connect(mapStateToProps)(withRouter(MyProductEditor));
