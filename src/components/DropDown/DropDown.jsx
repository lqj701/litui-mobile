import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Title from './Title';
import Panel from './Panel';
import { Wrapper } from './Styled';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';

const getChecked = (props, defaultChecked) => {
  if ('checked' in props && props.checked) {
    return props.checked;
  }
  if ('defaultChecked' in props && props.defaultChecked) {
    return props.defaultChecked;
  }
  return defaultChecked;
};

class DropDown extends PureComponent {
  static getSelectedItem(list, defaultActiveItem) {
    if (!find(list, 'id')) {
      list.forEach((item, idx) => {
        item.id = idx + 1;
      });
    }

    let item = find(list, { active: true });
    if (!item) {
      if (defaultActiveItem) {
        const ItemIdx = findIndex(list, defaultActiveItem);
        item = list[ItemIdx];
        item.active = true;
        return item;
      }

      item = list[0];
      item.active = true;
    }

    return item;
  }

  constructor(props) {
    super(props);

    this.state = {
      show: props.checked,
      currentObj: DropDown.getSelectedItem(props.list, props.activeItem),
      checked: getChecked(props, false),
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClickItem = this.handleClickItem.bind(this);
    this.handleHidePanel = this.handleHidePanel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ('list' in nextProps) {
      const { list, checked } = nextProps;

      this.setState({
        currentObj: DropDown.getSelectedItem(list, this.props.activeItem),
        show: checked,
      });
    }
  }

  handleClick() {
    const { onChange } = this.props;

    this.dataDialog.toggleDisplay(bool => {
      this.setState({ show: bool });
      onChange(bool);
    });
  }

  handleClickItem(result) {
    const { onChange, onHandleEvent } = this.props;

    this.setState({ currentObj: result.selectedItem, show: result.show });
    onChange(false);
    onHandleEvent({ currentObj: result.selectedItem });
  }

  handleHidePanel(bool) {
    this.props.onChange(false);
    this.setState({ show: bool });
  }

  render() {
    const {
      list,
      width,
      customStyle: { topBarStyle, titleStyle, panelStyle },
    } = this.props;
    if (panelStyle && typeof panelStyle.top === 'undefined') {
      panelStyle.top = '0.8rem';
    }

    return (
      <Wrapper width={width} style={topBarStyle}>
        <Title
          customStyle={titleStyle}
          show={this.state.show}
          currentObj={this.state.currentObj}
          onHandleClick={this.handleClick}
        />

        <Panel
          show={this.state.show}
          list={list}
          customStyle={panelStyle}
          ref={comp => (this.dataDialog = comp)}
          onChangeItem={this.handleClickItem}
          onHidePanel={this.handleHidePanel}
        />
      </Wrapper>
    );
  }
}

DropDown.propTypes = {
  activeItem: PropTypes.object,
  list: PropTypes.array,
  onHandleEvent: PropTypes.func,
  identification: PropTypes.any,
  checked: PropTypes.any,
  onChange: PropTypes.func,
  customStyle: PropTypes.object,
  width: PropTypes.string,
};

DropDown.defaultProps = {
  list: [],
  activeItem: null,
  width: '100%',
  checked: false,
  customStyle: {
    topBarStyle: {}, // 顶部下拉条样式
    titleStyle: {}, // 顶部下拉条中显示的 title 样式
    panelStyle: {}, // 下拉面板的样式
  },
  onHandleEvent() {},
};

export default DropDown;
