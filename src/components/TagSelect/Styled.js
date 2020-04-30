import styled from 'styled-components';
import ArrowDownIcon from '../../assets/svgs/arrow-down.svg';

export const StyledWrapper = styled.div`
  width: 100%;
  padding: 0.2rem 0;
  background-color: #fff;
  font-size: 0.2rem;
`;

export const StyledGroup = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const StyledBadge = styled.div`
  float: left;
  border-radius: 1rem;
  text-align: center;
  width: 1.3rem;
  height: 0.5rem;
  line-height: 0.5rem;
  border: 1px solid #e1e1e1;
  margin: 0.1rem 0.06rem;
  color: ${props => (props.active ? '#fff' : '#888')};
  background-color: ${props => (props.active ? props.bgColor : '#fff')};
`;

export const StyledTakeUp = styled.div`
  float: right;
  width: 1.5rem;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  margin: 0.1rem 0.06rem;
  color: ${props => props.color};
  position: relative;

  & > svg {
    fill: ${props => props.color};
    position: absolute;
    left: 0;
    top: 0.1rem;
  }
`;

export const StyledArrowDownIcon = styled(ArrowDownIcon)`
  width: 0.5rem;
  height: 0.3rem;
`;

export const StyledArrowUpIcon = StyledArrowDownIcon.extend`
  transform: rotate(180deg);
`;
