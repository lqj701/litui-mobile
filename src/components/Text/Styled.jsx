import styled from 'styled-components';

export const Wrapper = styled('div')`
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
