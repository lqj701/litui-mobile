import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';
//
import Badge from '../../../components/Badge';

export default class TagDate extends React.Component {
  static propTypes = {
    data: propsType.any,
  };

  static defaultProps = {
    data: [],
  };

  handleClick = value => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(value);
    }
  };

  render() {
    // const { data } = this.props;
    const data = [
      {
        label: '近7日',
        value: '7',
      },
      {
        label: '近15日',
        value: '15',
      },
      {
        label: '近30日',
        value: '30',
      },
    ];

    return (
      <div>
        {data.map((value, key) => {
          return (
            <Badge
              key={key}
              text={value.label}
              shape="round"
              onClick={() => this.handleClick.bind(value.value)}
            />
          );
        })}
      </div>
    );
  }
}
