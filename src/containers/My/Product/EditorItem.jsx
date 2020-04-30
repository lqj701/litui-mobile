import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';
import {
  SortableContainer,
  SortableElement,
  arrayMove,
  SortableHandle
} from 'react-sortable-hoc';

import Cell from 'components/Cell';
import Badge from 'components/Badge';
import Icon from 'components/Icon';
import Input from 'components/Input';
import Image from 'components/Image';

const StyleImage = styled(Image)`
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 0.2rem;
  flex: 1;
`;

const Container = styled.div`
  padding: 0.3rem 0;
  display: flex;

  ${({ disabled }) =>
    disabled &&
    `
  div {
    color: #ccc
  }
  `};
`;

const Name = styled.div`
  font-size: 0.34rem;
  color: #222222;
  display: flex;
`;
const Price = styled.div`
  font-size: 0.36rem;
  color: #b2b2b2;
  padding: 0.08rem 0;
`;

const DragHandle = SortableHandle(() => <Icon type="headline" />);

export const SortableItem = SortableElement(
  ({ value, onActionClick, onDeleteClick, onEditorChange }) => (
    <div>
      <Cell description={<DragHandle />}>
        <Container>
          <Badge
            text="-"
            shape="circle"
            position="left"
            sup
            onClick={() => onDeleteClick(value.product.id)}
          >
            <StyleImage src={value.imageUrl} />
          </Badge>
          <div>
            <Name>
              <span>{value.product.name}</span>
            </Name>
            <Price>
              {value.product.priceUncertain
                ? '面议'
                : `¥ ${value.product.price / 100}`}
            </Price>
          </div>
        </Container>
      </Cell>

      <Cell>
        <Input
          showCount
          type="textarea"
          value={value.introduce || value.product.productIntroduce}
          onChange={text => onEditorChange(text, value.product.id)}
        />
      </Cell>
    </div>
  )
);
