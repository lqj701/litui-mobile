import React from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';
import Confirm from '../../components/Dialogs/Confirm';

const StyledButton = styled(Button)`
  margin: 0.3rem 0;
`;

export default class ButtonSales extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      status: this.getStatusProps(props),
    };
  }

  getStatusProps(props) {
    if ('status' in props && props.status) {
      return props.status;
    }

    return false;
  }

  handleClick = () => {
    const { status } = this.state;

    if (status) {
      Confirm({
        headerText: '下架',
        bodyText: '确认下架产品？',
        onOkBtnClick: () => {
          this.setState({ status: !status });
        },
      });
    } else {
      this.setState({ status: !status });
    }

    this.props.onChange && this.props.onChange(!status);
  };

  componentWillReceiveProps(nexProps) {
    if ('status' in nexProps) {
      this.setState({ status: nexProps.status });
    }
  }

  render() {
    return (
      <StyledButton color="default" onClick={this.handleClick}>
        {this.state.status ? `下架` : `上架`}
      </StyledButton>
    );
  }
}
