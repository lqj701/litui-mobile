import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';

import Cell from 'components/Cell';
import Checkbox from 'components/Checkbox';

const StyledCell = styled(Cell)`
  padding: 0.2rem 0;
`;

const StyleName = styled.div`
  font-size: 0.34rem;
  padding: 0.08rem 0;
`;

const StyleMessafe = styled.div`
  font-size: 0.26rem;
  color: #888888;
  padding: 0.08rem 0;
`;

const Title = ({ name, resp }) => (
  <div>
    <StyleName>{name}</StyleName>
    <StyleMessafe>负责人: {resp}</StyleMessafe>
  </div>
);

const getChecked = (props, defaultChecked) => {
  if ('checked' in props && props.checked) {
    return props.checked;
  }
  if ('defaultChecked' in props && props.defaultChecked) {
    return props.defaultChecked;
  }
  return defaultChecked;
};

class ListItem extends React.Component {
  static propTypes = {
    data: propsType.object.isRequired,
    value: propsType.any,
    checked: propsType.any,
    onChange: propsType.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      value: props.value,
      checked: getChecked(props, false),
    };
  }

  handleChange = () => {
    const { onChange } = this.props;

    const checked = true;
    this.setState({ checked });
    if (typeof onChange === 'function') {
      onChange(checked);
    }
  };

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked,
      });
    }
  }

  render() {
    const { data, checked } = this.state;

    return (
      <StyledCell
        icon={<img src={data.avatarUrl} />}
        title={<Title name={data.remark || data.nickname} resp={data.name} />}
        description={
          <Checkbox checked={checked} onChange={this.handleChange} />
        }
        onClick={()=>{}}
      />
    );
  }
}

export default ListItem;
