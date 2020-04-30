import styled from 'styled-components';

export const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const CropWrapper = styled.div `
  width: 100%;
  height: 100%;
`;

export const StyledAvatar = styled.img`
  background: #ffffff;
  border-radius: 9px;
  height: 1.28rem;
  width: 1.28rem;
  margin: 0.24rem;
`;

export const StyledLoading = styled.div`
  display: ${props => props.loading ? 'block' : 'none'};
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #f2f2f9;
  z-index: 99999;
`;

export const DragBox = styled.div`
  background-color: #000;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 1rem;
  z-index: 999;
`;

export const SaveBtn = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 999;
`;

export const StyledButton = styled.span`
  display: inline-block;
  width: 100%;
  height: 1rem;
  background-color: #4a8cf2;
  color: #fff;
  font-weight: 400;
  font-size: 0.36rem;
  text-align: center;
  line-height: 1rem;
`;