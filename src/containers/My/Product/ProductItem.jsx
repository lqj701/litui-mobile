import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';

import Cell from 'components/Cell';
import Radio from 'components/Radio';
import Image from 'components/Image';

import Price from '../../Product/Price';
import ButtonRecommend from './ButtonRecommend';

const Container = styled.div`
  padding: 0.3rem 0;
  display: flex;
  flex: 1;
  align-items: center;

  ${({ disabled }) =>
    disabled &&
    `
  div {
    color: #ccc
  }
  `};
`;

const StyleImage = styled(Image)`
  width: 1.2rem;
  height: 1.2rem;
  margin: 0 0.2rem;
`;

const Name = styled.div`
  font-size: 0.34rem;
  color: #222222;
  display: flex;
`;

const Intro = styled.div`
  font-size: 0.26rem;
  color: #b2b2b2;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const DonwSalesButton = styled.div`
  position: absolute;
  right: 0.3rem;
  width: 1.48rem;
  height: 0.48rem;
  font-size: 0.34rem;
  color: #b2b2b2;
  text-align: center;
`;

const getChecked = (props, defaultChecked) => {
  if ('checked' in props && props.checked) {
    return props.checked;
  }
  if ('defaultChecked' in props && props.defaultChecked) {
    return props.defaultChecked;
  }
  return defaultChecked;
};

export default class ProductItem extends React.Component {
  static propTypes = {
    item: propsType.object.isRequired,
    value: propsType.any,
    checked: propsType.any,
    onChange: propsType.func
  };

  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      value: props.value,
      checked: getChecked(props, false)
    };
  }

  onValueChange = () => {
    const { onChange } = this.props;

    const checked = !this.state.checked;
    this.setState({ checked });
    if (typeof onChange === 'function') {
      onChange(checked);
    }
  };

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked
      });
    }
  }

  render() {
    const { item, checked } = this.state;

    const SalesButton = () => {
      return item.onSale ? (
        <ButtonRecommend checked={checked} onClick={this.onValueChange} />
      ) : (
        <DonwSalesButton>已下架</DonwSalesButton>
      );
    };

    return (
      <Cell>
        <Container disabled={!item.onSale}>
          <Radio checked={checked} disabled />
          <StyleImage src={item.imageUrl} />
          <Box>
            <Name>
              <span style={{ marginRight: '1.48rem' }}>{item.name}</span>
              <SalesButton />
            </Name>
            <Price value={item.price} uncertain={item.priceUncertain} />
            <Intro>{item.productIntroduce}</Intro>
          </Box>
        </Container>
      </Cell>
    );
  }
}
