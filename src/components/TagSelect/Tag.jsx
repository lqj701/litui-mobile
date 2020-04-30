import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';

import {
  StyledWrapper,
  StyledGroup,
  StyledBadge,
  StyledTakeUp,
  StyledArrowDownIcon,
  StyledArrowUpIcon,
} from './Styled';

class Tag extends PureComponent {
  static getActiveItem(list, defaultActiveItem) {
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
      list: props.list,
      active: Tag.getActiveItem(props.list, props.defaultActiveItem),
      show: false,
    };

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleTakeUp = this.handleTakeUp.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list) {
      this.setState({ active: Tag.getActiveItem(nextProps.list, null) });
    }
  }

  handleItemClick(e, item) {
    e.stopPropagation();
    const currentActiveItem = find(this.state.list, { active: true });

    if (currentActiveItem.id === item.id) return;

    const list = this.state.list.map(o => {
      o.active = o.id === item.id;
      return o;
    });
    this.setState({ list });

    const { onChangeItem } = this.props;
    if (onChangeItem) {
      onChangeItem(item);
    }
  }

  handleTakeUp() {
    this.setState({ show: !this.state.show });
  }

  renderTakeUpContent(show, length) {
    let content = '';

    if (length > 5) {
      content = (
        <StyledTakeUp onClick={this.handleTakeUp} color={this.props.bgColor}>
          {show ? <StyledArrowUpIcon /> : <StyledArrowDownIcon />}
          {show ? '收起' : '展开'}
        </StyledTakeUp>
      );
    }

    return content;
  }

  render() {
    const { bgColor } = this.props;
    const { show, list } = this.state;

    return (
      <StyledWrapper>
        <StyledGroup>
          {list.map((item, key) => {
            return (
              <StyledBadge
                key={key}
                active={item.active}
                bgColor={bgColor}
                onClick={e => this.handleItemClick(e, item)}
              >
                {item.name}
              </StyledBadge>
            );
          })}

          {/* {this.renderTakeUpContent(show, list.length)} */}
        </StyledGroup>
      </StyledWrapper>
    );
  }
}

Tag.propTypes = {
  list: PropTypes.array.isRequired,
  defaultActiveItem: PropTypes.object,
  onChangeItem: PropTypes.func,
  bgColor: PropTypes.string,
};

Tag.defaultProps = {
  list: [],
  defaultActiveItem: {},
  bgColor: '#108ee9',
};

export default Tag;
