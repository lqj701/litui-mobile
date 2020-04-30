import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';

import PanelItem from './PanelItem';
import { ScrollContainer, StyledPanelList } from './Styled';

class Panel extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      list: props.list,
      show: false,
    };

    this.handleWhiteClick = this.handleWhiteClick.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list) {
      const { list, show } = nextProps;

      this.setState({
        list,
        show,
      });
    }
  }

  handleWhiteClick() {
    this.setState({ show: false });
    this.props.onHidePanel(false);
  }

  handleItemClick(item) {
    const currentActiveItem = find(this.state.list, { active: true });

    if (currentActiveItem.id === item.id) {
      this.setState({ show: false });
    } else {
      const list = this.state.list.map(o => {
        o.active = o.id === item.id;
        return o;
      });
      this.setState({ list, show: false });
      this.props.onChangeItem({ selectedItem: item, show: false });
    }
  }

  toggleDisplay(callback) {
    this.setState({ show: !this.state.show });
    if (callback) callback(!this.state.show);
  }

  render() {
    const { customStyle, checkedColor } = this.props;

    return (
      <StyledPanelList
        style={customStyle}
        show={this.state.show}
        onClick={this.handleWhiteClick}
      >
        <ScrollContainer>
          {this.state.list.map((item, idx) => (
            <PanelItem
              key={`__${idx}`}
              item={item}
              checkedColor={checkedColor}
              onHandleItemClick={this.handleItemClick}
            />
          ))}
        </ScrollContainer>
      </StyledPanelList>
    );
  }
}

Panel.propTypes = {
  onChangeItem: PropTypes.func.isRequired,
  show: PropTypes.bool,
  list: PropTypes.array,
  customStyle: PropTypes.object,
  checkedColor: PropTypes.string,
  onHidePanel: PropTypes.func,
  activeItem: PropTypes.object,
};

Panel.defaultProps = {
  show: false,
  list: [],
  customStyle: {},
  activeItem: {},
  checkedColor: '#4A8CF2',
  onHidePanel() {},
};

export default Panel;
