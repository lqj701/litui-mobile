import styled from 'styled-components';
import Badge from '../Badge';

export const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const Card = styled('div')`
  border: 1px solid #cccccc;
  width: 1.16rem;
  height: 1.16rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.56rem;
  color: #ccc;

  > img {
    width: 100%;
    height: 100%;
  }
`;

export const StyledCard = Card.extend`
margin: 0.2rem 0.13rem;

`;

export const StyledBadge = styled(Badge)`
  margin: 0.2rem 0.13rem;
`;
