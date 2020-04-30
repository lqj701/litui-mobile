import styled from 'styled-components';

export const Wrapper = styled('span')`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  line-height: 1;
`;

export const Sup = styled('sup')`
  display: flex;
  justify-content: center;
  align-items: center;
  top: auto;
  color: #fff;
  font-size: 0.26rem;
  height: 0.36rem;

  padding: 0 5px;
  white-space: nowrap;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  background-color: #f00;

  ${({ color }) => {
    if (color === 'grey') {
      return `background-color: #cfcfcf;`;
    }
  }} ${({ shape }) => {
  if (shape === 'dot') {
    return `width: 8px; height: 8px; padding: 0; border-radius: 50%;`;
  } else if (shape === 'radius') {
    return `border-radius: 4px;`;
  } else if (shape === 'round') {
    return `min-width: 0.36rem;
      border-radius: 1000px;`;
  } else if (shape === 'circle') {
    return `width: 0.36rem; border-radius: 50%; padding: 0;`;
  } else if (shape === 'defect-circle') {
    return `width: 0.60rem; border-radius: 50%; padding: 0;`;
  }

  return ``;
}};

  ${({ sup }) =>
    sup &&
    `position: absolute; top: 0; right: 0; transform: translateX(50%) translateY(-50%);`};

  ${({ position, sup }) =>
    sup && position === 'left' ? `left:-0.36rem` : `right:0`};
`;
