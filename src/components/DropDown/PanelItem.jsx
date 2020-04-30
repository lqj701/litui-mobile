import React from 'react';
import PropsType from 'prop-types';

import { StyledPanelItem, StyledPanelText, StyledCheckIcon } from './Styled';

function PanelItem({ item, checkedColor, onHandleItemClick }) {
  function handleClickItem(e, item) {
    e.stopPropagation();
    if (onHandleItemClick) onHandleItemClick(item);
  }

  return (
    <StyledPanelItem onClick={e => handleClickItem(e, item)}>
      <StyledPanelText checked={item.active} checkedColor={checkedColor}>
        {item.name}
      </StyledPanelText>
      <StyledCheckIcon checked={item.active} />
    </StyledPanelItem>
  );
}

PanelItem.propTypes = {
  item: PropsType.object.isRequired,
  onHandleItemClick: PropsType.func.isRequired,
  checkedColor: PropsType.string,
};

export default PanelItem;
