import React from 'react';
import propsType from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCustomer, getCustomerInfo } from '../../actions/customer';
import moment from 'moment';

import Layout from '../../components/Layout';
import Button from '../../components/Button';
import InputGroupForm from '../../components/Form/InputGroupForm';
import Toast from '../../components/Toast';

import { CityList } from '../../utils/city';

const StyledButton = styled(Button)`
  margin-top: 0.6rem;
`;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
`;

class CustomerEditor extends React.Component {
  static propTypes = {
    dispatch: propsType.func,
    history: propsType.object,
    match: propsType.object,
    customer: propsType.object,
  };

  static defaultProps = {};

  values = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  showToast(message, onClose) {
    Toast.info(message, 1, onClose, false);
  }

  handleSaveButton = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const params = this.values;
    params.customer_wx_user_id = id;

    this.props.dispatch(updateCustomer(params)).then(action => {
      if (action.payload === 0) {
        this.showToast('保存成功', () => this.props.history.goBack());
      } else {
        this.showToast('保存失败');
      }
    });
  };

  findProvince(value) {
    if (!value) return;
    for (let i in CityList) {
      if (value === i) {
        return CityList[i].name;
      }
    }
  }

  findCity(p, c) {
    if (!p && !c) return;
    const province = CityList[p];

    if (!province) return;

    for (let i in province.children) {
      if (c === i) {
        return province.children[i].name;
      }
    }
  }

  handleInputGroupFromChange = values => {
    // this.setState(values);
    // 保存修改值， 用setState会导致render
    for (let i in values) {
      this.values[i] = values[i];
    }
  };

  componentDidMount() {
    document.title = '编辑客户详情';
    const {
      match: {
        params: { id, wx_user_id },
      },
    } = this.props;

    this.props.dispatch(
      getCustomerInfo({
        customer_wx_user_id: id,
      })
    );
  }

  render() {
    const { customer } = this.props;

    if (!customer) {
      return <div />;
    }

    const source = () => {
      switch (customer.getWay) {
      case 0:
        return '扫描小程序码';
      case 1:
        return '好友分享';
      case 2:
        return '群分享';
      case 3:
        return '红包分享';
      case 4:
        return '通过默认名片';
      case 5:
        return customer.sourceName+'推荐';
      default:
        return '';
      }
    };

    const district = () => {
      const country =
        customer.country === 'China' ? '' : customer.country + ' ';
      const province = this.findProvince(customer.province);
      const city = this.findCity(customer.province, customer.city);

      return (
        country +
        (province ? province : customer.province) +
        (city ? city : customer.city)
      );
    };

    const form = [
      {
        name: '客户来源',
        value: source(),
        field: 'source',
        readOnly: true,
      },
      {
        name: '地区',
        value: district(),
        field: 'district',
        readOnly: true,
      },
      {
        name: '备注名',
        value: customer.remark,
        placeholder: '请输入备注名',
        field: 'remark',
      },
      {
        name: '公司名称',
        value: customer.company,
        placeholder: '请输入公司名称',
        field: 'company',
      },
      {
        name: '电话',
        value: customer.phone1,
        placeholder: '请输入电话',
        maxLength: 15,
        field: 'phone1',
      },
      {
        name: '电话',
        value: customer.phone2,
        placeholder: '请输入电话',
        maxLength: 15,
        field: 'phone2',
      },
      {
        name: '微信',
        value: customer.weixinid,
        placeholder: '请输入微信',
        field: 'weixinid',
      },
      {
        name: '邮箱',
        value: customer.email,
        placeholder: '请输入邮箱',
        field: 'email',
      },
      {
        name: '地址',
        value: customer.address,
        placeholder: '请输入地址',
        field: 'address',
      },
      {
        name: '描述',
        value: customer.descr,
        placeholder: '请输入描述',
        field: 'descr',
      },
      {
        name: '创建时间',
        value: moment(customer.createdAt).format('YYYY-MM-DD HH:mm'),
        field: 'createdAt',
        readOnly: true,
      },
    ];

    if (customer.bindphone) {
      form.unshift({
        name: '绑定手机',
        value: customer.bindphone,
        field: 'bindphone',
        readOnly: true,
      });
    }

    return (
      <Wrapper>
        <InputGroupForm
          form={form}
          onValueChange={this.handleInputGroupFromChange}
        />

        <Layout>
          <StyledButton onClick={this.handleSaveButton}>保存</StyledButton>
        </Layout>
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  const {
    customer: { detail },
  } = state;
  return { customer: detail };
}
export default connect(mapStateToProps)(withRouter(CustomerEditor));
