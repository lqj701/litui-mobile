import React from 'react';
import propsType from 'prop-types';

import Cell from '../Cell';
import Input from '../Input';

export default class InputGroupForm extends React.PureComponent {
  static propTypes = {
    form: propsType.array.isRequired,
    onValueChange: propsType.func,
  };

  static defaultProps = {
    form: [],
  };

  constructor(props) {
    super(props);
    this.state = this.getFormProps(props);
  }

  getFormProps(props) {
    if ('form' in props) {
      let state = {};
      props.form.forEach(field => {
        state[field.field] = field.value;
      });

      return state;
    } else {
      return {};
    }
  }

  handleChange = ({ target: { value } }, field) => {
    this.setState({ [field]: value });

    const { onValueChange } = this.props;
    if (onValueChange) {
      onValueChange({ [field]: value });
    }
  };

  onFieldChange(fieldName) {
    return function(event) {
      this.setState({ [fieldName]: event.target.value });
    };
  }

  componentWillReceiveProps(nexProps) {
    if ('form' in nexProps && this.props.form !== nexProps.form) {
      const state = this.getFormProps(nexProps);
      this.setState(state);
    }
  }

  render() {
    const { form } = this.props;

    // const form = [
    //   {
    //     name: '产品名称',
    //     value: '请输入产品名称',
    //     placeholder: '请输入产品名称',
    //     maxlength: 255,
    //     field: 'name',
    //   },
    // ];

    return (
      <Cell.Group>
        {form.map((value, key) => {
          return (
            <Cell key={key} title={value.name}>
              {value.type === 'textarea' ? (
                <Input
                  type="textarea"
                  placeholder={value.placeholder}
                  value={this.state[value.field] || ''}
                  maxLength={value.maxLength}
                  readOnly={value.readOnly}
                  onChange={event => this.handleChange(event, value.field)}
                />
              ) : (
                <Input
                  placeholder={value.placeholder}
                  value={this.state[value.field] || ''}
                  maxLength={value.maxLength}
                  readOnly={value.readOnly}
                  onChange={event => this.handleChange(event, value.field)}
                />
              )}
            </Cell>
          );
        })}
      </Cell.Group>
    );
  }
}
