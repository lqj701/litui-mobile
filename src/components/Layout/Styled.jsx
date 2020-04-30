import styled from 'styled-components';

export const Wrapper = styled('div')`
  padding: 0 0.3rem;

  ${({ align }) => {
    switch (align) {
      case 'center':
        return `text-align: center`;
      case 'right':
        return `text-align: right`;
      case 'left':
      default:
        return `text-align: left`;
    }
  }};
`;

export const Container = styled.div`
  height: 100%;
  overflow: hidden;
`;
