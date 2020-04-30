import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.16rem;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0.15rem;
  border-radius: 4px;
  background-color: white;
`;

const ContentInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 0.26rem;
  color: #333333;
  padding: 0 0.1rem;
`;

const ClearIcon = styled.i`
  display: inline-block;
  width: 0.25rem;
  height: 0.25rem;
  background-color: #bbb;
  position: relative;
  border-radius: 50%;
  overflow: hidden;

  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 10%;
    width: 0.02rem;
    height: 80%;
    transform: rotate(45deg);
    background-color: #fff;
  }

  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 10%;
    width: 0.02rem;
    height: 80%;
    transform: rotate(-45deg);
    background-color: #fff;
  }
`;

const CancelClick = styled.a`
  font-size: 0.32rem;
  color: #4a8cf2;
  margin-left: 0.2rem;
`;

class SearchBar extends PureComponent {
  static timer = null;

  constructor(props) {
    super(props);

    this.state = {
      value: this.getValueProps(props),
    };

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleClearIcon = this.handleClearIcon.bind(this);
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

  componentDidMount() {
    if (this.inputEl.value.trim()) {
      this.setState({
        value: this.inputEl.value,
      });
    }
  }

  handleSearchInput(e) {
    const { onChange, debounceTime } = this.props;
    const {
      target: { value },
    } = e;

    this.setState({
      value,
    });

    if (onChange) {
      window.clearTimeout(SearchBar.timer);
      SearchBar.timer = window.setTimeout(onChange(value), debounceTime);
    }
  }

  handleClearIcon() {
    const { onChange, debounceTime } = this.props;
    const clearContent = '';

    this.setState({
      value: clearContent,
    });
    this.inputEl.focus();

    if (onChange) {
      window.clearTimeout(SearchBar.timer);
      SearchBar.timer = window.setTimeout(onChange(clearContent), debounceTime);
    }
  }

  renderClearIcon() {
    const { value } = this.state;
    let icon = '';

    if (value) {
      icon = <ClearIcon onClick={this.handleClearIcon} />;
    }

    return icon;
  }

  render() {
    const { placeholder, maxLength, onCancel, hasCancel } = this.props;
    const { value } = this.state;

    return (
      <Wrapper>
        <InputWrapper>
          <Icon type="search" />
          <ContentInput
            innerRef={el => (this.inputEl = el)}
            onChange={e => this.handleSearchInput(e)}
            placeholder={placeholder}
            maxLength={maxLength}
            value={value}
          />{' '}
          {this.renderClearIcon()}
        </InputWrapper>{' '}
        {hasCancel && <CancelClick onClick={onCancel}> 取消</CancelClick>}
      </Wrapper>
    );
  }
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  debounceTime: PropTypes.number,
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  hasCancel: PropTypes.bool,
};

SearchBar.defaultProps = {
  placeholder: '搜索',
  debounceTime: 500,
  hasCancel: true,
};

export default SearchBar;
