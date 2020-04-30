import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';
import {
  SortableContainer,
  SortableElement,
  arrayMove,
  SortableHandle,
} from 'react-sortable-hoc';

import Layout from 'components/Layout';
import Cell from 'components/Cell';
import Button from 'components/Button';

import { SortableItem } from './EditorItem';

const ScrollWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
`;

const StyledButton = styled(Button)`
  margin: 0.3rem 0;
`;

export const SortableList = SortableContainer(
  ({ list, onActionClick, onDeleteClick, onEditorChange, onUpdate }) => (
    <ScrollWrapper>
      <Cell.Group>
        <Cell title={`共 ${list.length} 个产品`} />
        {list.map((menu, index) => (
          <SortableItem
            key={index}
            index={index}
            value={menu}
            onActionClick={onActionClick}
            onDeleteClick={onDeleteClick}
            onEditorChange={onEditorChange}
          />
        ))}
      </Cell.Group>
      <Layout>
        <StyledButton onClick={onUpdate}>保存</StyledButton>
      </Layout>
    </ScrollWrapper>
  )
);
