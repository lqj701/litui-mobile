import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Button from '../../components/Button';

const StyledButton = styled(Button)`
  margin: 0.3rem 0;
`;

export default class ButtonSubmit extends React.Component {
  static propTypes = {
    onChange: propsType.func,
  };

  state = {
    disabled: false,
    text: '保存',
  };

  handleClick = () => {
    // this.setState({ disabled: !this.state.disabled, text: '保存中' });
    const { onChange } = this.props;
    onChange && onChange();
  };

  render() {
    const { disabled, text } = this.state;
    return (
      <Layout>
        <StyledButton disabled={disabled} onClick={this.handleClick}>
          {text}
        </StyledButton>
      </Layout>
    );
  }
}
