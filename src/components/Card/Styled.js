import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  background: #fff;
  padding: 0.3rem;
  margin: 0.3rem 0;
  border-radius: 6px;

  ${({ active }) =>
    active
      ? `&:active {
  background-color: #ddd;
}`
      : ''};
`;
