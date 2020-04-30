import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';
//
import Cell from '../../../components/Cell';
import TagSelect from '../../../components/TagSelect';
import { moneyFormatUnit } from '../../../utils/utils';

const StyledCellGroup = styled.div`
  margin: 0 0 0.3rem;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const Col = styled.div`
  flex: 0 0 33.33%;
  margin: 0.2rem 0;
  line-height: 1.5;
`;

const Label = styled.div`
  font-size: 0.3rem;
  color: #999999;
`;
const Value = styled.div`
  font-size: 0.4rem;
  color: #000000;
`;
const Rose = styled.div`
  font-size: 0.24rem;
  // color: #1aad19;

  ${({ status }) => {
    if (status === -0.00001) {
      return `color: #ddd;`;
    } else if (status > 0) {
      return `color: #1aad19;`;
    } else if (status < 0) {
      return `color: #f00;`;
    }
  }};
`;

class DataCollection extends React.Component {
  state = {
    id: 'all',
  };

  handleTagSelectChange = ({ id }) => {
    const { action, dispatch, params, type, onChangeTimeObj } = this.props;

    params.time = id;
    if (!id) delete params.id;

    onChangeTimeObj({ type, id });
    dispatch(action(params));

    this.setState({ id });
  };

  percent(value, value2) {
    return value2 ? (value - value2) / value2 : -0.00001;
  }

  showRoseText(rose) {
    const { id } = this.state;
    let result;
    let flag = '';
    if (rose !== -0.00001) {
      const percent = rose * 100;
      if (percent > 0) {
        flag = '↑';
      }
      if (percent < 0) {
        flag = '↓';
      }
      result = parseInt(Math.abs(percent));
    } else {
      if (id !== 'all') {
        flag = '--';
        result = '';
      } else {
        result = '';
      }
    }

    if (result) {
      result += '%';
    }

    return result + flag;
  }

  renderDataItem(dataTotal) {
    return (
      <Row>
        {dataTotal.map((value, key) => {
          return (
            <Col key={key}>
              <Label>{value.label}</Label>
              <Value>{moneyFormatUnit(value.value)}</Value>
              <Rose status={value.rose}>{this.showRoseText(value.rose)}</Rose>
            </Col>
          );
        })}
      </Row>
    );
  }

  render() {
    const { dataSource } = this.props;
    const { id } = this.state;

    const dataTotal = [
      {
        label: id === 'all' ? '客户总数' : '新增客户数',
        value: dataSource.customerTotal,
        rose: this.percent(
          dataSource.customerTotal,
          dataSource.lastCustomerTotal
        ),
      },
      {
        label: id === 'all' ? '跟进总数' : '新增跟进数',
        value: dataSource.followTotal,
        rose: this.percent(
          dataSource.followTotal,
          dataSource.lastCustomerTotal
        ),
      },
      {
        label: id === 'all' ? '浏览总数' : '浏览数',
        value: dataSource.browseTotal,
        rose: this.percent(dataSource.browseTotal, dataSource.lastBrowseTotal),
      },
      {
        label: id === 'all' ? '被转发总数' : '转发数',
        value: dataSource.forwardTotal,
        rose: this.percent(
          dataSource.forwardTotal,
          dataSource.lastForwardTotal
        ),
      },
      {
        label: id === 'all' ? '被保存总数' : '被保存数',
        value: dataSource.holdTotal,
        rose: this.percent(dataSource.holdTotal, dataSource.lastHoldTotal),
      },
      {
        label: id === 'all' ? '获赞总数' : '获赞数',
        value: dataSource.supportTotal,
        rose: this.percent(
          dataSource.supportTotal,
          dataSource.lastSupportTotal
        ),
      },
    ];

    const list = [
      { id: 'all', name: '全部' },
      { id: 'yesterday', name: '昨天' },
      { id: '7day', name: '近7天' },
      { id: '15day', name: '近15天' },
      { id: '30day', name: '近30天' },
    ];

    return (
      <StyledCellGroup>
        <Cell title="数据汇总" />
        <Cell>
          <div>
            <TagSelect list={list} onChangeItem={this.handleTagSelectChange} />

            {this.renderDataItem(dataTotal)}
          </div>
        </Cell>
      </StyledCellGroup>
    );
  }
}

DataCollection.propTypes = {
  dataSource: propsType.any,
  params: propsType.object,
  type: propsType.string,
  onChangeTimeObj: propsType.func,
};

DataCollection.defaultProps = {
  params: {},
  type: '',
};

export default DataCollection;
