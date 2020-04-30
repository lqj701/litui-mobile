import React from 'react';
import propsType from 'prop-types';

import Cell from 'components/Cell';
import Input from 'components/Input';
import Switch from 'components/Switch';

export default class ProductInfo extends React.PureComponent {
  static propTypes = {
    form: propsType.array.isRequired,
    onValueChange: propsType.func
  };

  static defaultProps = {
    form: []
  };

  constructor(props) {
    super(props);

    this.state = {
      switch_status: this.getSwitchProps(props),
      form: this.getFormProps(props)
    };
  }

  getSwitchProps(props) {
    return props.form[1].value;
  }

  getFormProps(props) {
    if ('form' in props) {
      return props.form;
    }

    return [];
  }

  handleTextChange = (value, field) => {
    const { form } = this.state;

    const result = form.map(v => {
      if (v.field === field) {
        v.value = value;
      }
      return v;
    });

    this.setState({ form: result });

    const { onValueChange } = this.props;
    if (onValueChange) {
      onValueChange({ [field]: value });
    }
  };

  handleSwitchChange = checked => {
    const { form } = this.props;

    this.setState({ switch_status: checked });

    const { onValueChange } = this.props;
    if (onValueChange) {
      onValueChange({ [form[1].field]: checked });
    }
  };

  componentWillReceiveProps(nexProps) {
    if ('form' in nexProps) {
      console.error(nexProps.form[1]);
      this.setState({
        form: nexProps.form,
        switch_status: nexProps.form[1].value
      });
    }
  }

  render() {
    const { form, switch_status } = this.state;

    return (
      <Cell.Group>
        <Cell title={form[0].name}>
          <Input
            placeholder={form[0].placeholder}
            value={form[0].value}
            onChange={({ target: { value } }) =>
              this.handleTextChange(value, form[0].field)
            }
          />
        </Cell>
        <Cell
          title={form[1].name}
          description={
            <Switch
              checked={switch_status}
              onChange={this.handleSwitchChange}
            />
          }
        />
        {!switch_status && (
          <Cell title={form[2].name}>
            <Input
              placeholder={form[2].placeholder}
              value={form[2].value}
              maxLength={form[2].maxlength}
              onChange={({ target: { value } }) =>
                this.handleTextChange(value, form[2].field)
              }
            />
          </Cell>
        )}
        <Cell title={form[3].name}>
          <Input
            showCount
            type="textarea"
            placeholder={form[3].placeholder}
            value={form[3].value}
            onChange={result => this.handleTextChange(result, form[3].field)}
          />
        </Cell>
      </Cell.Group>
    );
  }
}
