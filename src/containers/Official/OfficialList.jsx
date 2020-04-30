import React from 'react';
import styled from 'styled-components';
import { SortableContainer } from 'react-sortable-hoc';

import Layout from '../../components/Layout';
import Button from '../../components/Button';

import Cover from './Cover';
import Company from './Company';
import { SortabelTel, SortabelVideo, SortabelPicture } from './OfficialItem';

const StyledButton = styled(Button)`
  margin: 0.3rem 0;
`;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: scroll;
`;

export const SortableList = SortableContainer(
  ({
    items,
    size,
    onSubmit,
    onAddBlock,
    handleCoverChange,
    handleCompanyChange,
    handleTelChange,
    handlePictureChange,
    handleVideoChange
  }) => {
    return (
      <Wrapper>
        {items.map((value, key) => {
          switch (value.type) {
            case 0:
              return (
                <SortabelTel
                  key={`tel-${key}`}
                  index={key}
                  idx={key}
                  value={value}
                  handleTelChange={handleTelChange}
                />
              );
            case 1:
              return (
                <SortabelPicture
                  key={`picture-${key}`}
                  index={key}
                  idx={key}
                  value={value}
                  onValueChange={handlePictureChange}
                />
              );
            case 2:
              return (
                <SortabelVideo
                  key={`video-${key}`}
                  index={key}
                  idx={key}
                  value={value}
                  onValueChange={handleVideoChange}
                />
              );
            case 98:
              return (
                <Cover
                  key={`cover-${key}`}
                  index={key}
                  dataSource={value.content}
                  onValueChange={handleCoverChange}
                />
              );
            case 99:
              return (
                <Company
                  key={`company-${key}`}
                  index={key}
                  dataSource={value.content}
                  onValueChange={handleCompanyChange}
                />
              );
          }
        })}

        <Layout>
          {size < 9 && (
            <StyledButton color="default" onClick={onAddBlock}>
              新增区块
            </StyledButton>
          )}
          <StyledButton onClick={onSubmit}>保存</StyledButton>
        </Layout>
      </Wrapper>
    );
  }
);
