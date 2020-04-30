import React from 'react';
import propsType from 'prop-types';

import Cell from 'components/Cell';
import Input from 'components/Input';

class InputForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: this.getValueProps(props),
    };
  }

  getValueProps(props) {
    if ('value' in props && props.value) {
      return props.value;
    }
    if ('defaultValue' in props && props.defaultValue) {
      return props.defaultValue;
    }

    return '';
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
    this.props.onChange && this.props.onChange(value);
  };

  componentWillReceiveProps(nexProps) {
    if ('value' in nexProps) {
      this.setState({ value: nexProps.value });
    }
  }

  render() {
    const { placeholder, maxlength } = this.props;
    const { value } = this.state;
    return (
      <Input
        placeholder={placeholder}
        value={value}
        maxLength={maxlength}
        onChange={this.handleChange}
      />
    );
  }
}

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

  handleTextChange = (value, field) => {
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
                  showCount
                  type="textarea"
                  placeholder={value.placeholder}
                  value={value.value}
                  maxLength={value.maxlength}
                  onChange={result =>
                    this.handleTextChange(result, value.field)
                  }
                />
              ) : (
                <InputForm
                  placeholder={value.placeholder}
                  value={value.value}
                  maxLength={value.maxlength}
                  onChange={result =>
                    this.handleTextChange(result, value.field)
                  }
                />
              )}
            </Cell>
          );
        })}
      </Cell.Group>
    );
  }
}
