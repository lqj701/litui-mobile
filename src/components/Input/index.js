import React, { PureComponent } from 'react';
import { Wrapper } from './Styled';
import InputTextarea from './Textarea';

export default class Input extends PureComponent {
  static defaultProps = {
    type: 'text',
  };
  render() {
    const { type, ...other } = this.props;

    switch (type) {
    case 'textarea':
      return <InputTextarea {...other} />;
    default:
      return (
        <Wrapper>
          <input type="text" {...other} />
        </Wrapper>
      );
    }
  }
}
