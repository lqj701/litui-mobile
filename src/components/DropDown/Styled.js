import styled from 'styled-components';
import ArrowDownIcon from '../../assets/svgs/arrow-down.svg';
import CheckIcon from '../../assets/svgs/icon-check.svg';

export const Wrapper = styled.div`
  flex: 1;
  width: ${props => props.width};
`;

export const ScrollContainer = styled.div`
  height: calc(100% - 2rem);
  overflow-y: scroll;
`;

export const ItemLabel = styled.div`
  text-align: center;
  height: 0.8rem;
  line-height: 0.8rem;
  background-color: #fff;
  font-size: 0.26rem;
  color: #888888;
  padding-left: 0.2rem;
  padding-right: 0.55rem;
  position: relative;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  & > svg {
    position: absolute;
    top: 0.3rem;
    right: 0.05rem;
  }
`;

export const StyledPanelList = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const StyledPanelItem = styled.div`
  position: relative;
  padding: 0.2rem 0.6rem 0.2rem 0.12rem;
  background-color: #fff;
  line-height: normal;
  border-top: 0.005rem solid #ddd;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledPanelText = styled.span`
  font-size: 0.26rem;
  margin-left: 0.12rem;
  color: ${props => (props.checked ? props.checkedColor : 'inherit')};
`;

export const StyledArrowDownIcon = styled(ArrowDownIcon)`
  width: 0.5rem;
  height: 0.3rem;
`;

export const StyledArrowUpIcon = StyledArrowDownIcon.extend`
  transform: rotate(180deg);
`;

export const StyledCheckIcon = styled(CheckIcon)`
  display: ${props => (props.checked ? 'block' : 'none')};
  width: 0.5rem;
  height: 0.3rem;
  position: absolute;
  right: 0.1rem;
  top: 0.2rem;
`;
