import React from 'react';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';

import Icon from '../../components/Icon';

import Picture from './Picture';
import Tel from './Tel';
import Video from './Video';

const DragHandle = SortableHandle(() => (
  <span style={{ padding: '0.2rem 0.4rem' }}>
    <Icon type="headline" />
  </span>
));

export const SortabelTel = SortableElement(
  ({ value, idx, handleTelChange }) => {
    return (
      <Tel
        index={idx}
        dataSource={value.content}
        onValueChange={handleTelChange}
        dragHangle={<DragHandle />}
      />
    );
  }
);

export const SortabelPicture = SortableElement(
  ({ value, idx, onValueChange }) => {
    return (
      <Picture
        index={idx}
        dataSource={value.content}
        onValueChange={onValueChange}
        dragHangle={<DragHandle />}
      />
    );
  }
);

export const SortabelVideo = SortableElement(
  ({ value, idx, onValueChange }) => {
    return (
      <Video
        index={idx}
        dataSource={value.content}
        onValueChange={onValueChange}
        dragHangle={<DragHandle />}
      />
    );
  }
);
