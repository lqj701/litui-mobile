import React from 'react';

import Cell from '../../../components/Cell';
import UploadWx from '../../../components/Upload/Weixin';

export default function Images({
  title,
  maxCount,
  allowSelectCount,
  files,
  cropper,
  onChange
}) {
  return (
    <Cell.Group>
      <Cell title={title} />
      <Cell>
        <UploadWx
          cropper={cropper}
          aspectRatio={4 / 3}
          maxCount={maxCount}
          allowSelectCount={1}
          files={files}
          onChange={onChange}
        />
      </Cell>
    </Cell.Group>
  );
}
