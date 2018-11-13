import React from "react";
import ReactDOM from "react-dom";
import copy from "copy-to-clipboard";
import PropTypes from "prop-types";
import Style from "./style.scss";

class Copy extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onCopy: PropTypes.func,
    onChange: PropTypes.func,
    copyButton: PropTypes.any
  };

  ref = null;

  // static defaultProps = {
  //     value: '',
  //     onCopy: () => {},
  //     onChange: () => {},
  // }

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  handleCopy = e => {
    const { onCopy } = this.props;
    const value = this.ref.current.value;
    const result = copy(value);
    if (typeof onCopy === "function") {
      onCopy(result);
    }
  };

  handleChange = e => {
    const { onChange, value } = this.props;
    if (typeof onChange === "function") {
      onChange(e.target.value);
    }
  };

  getInputOptions = () => {
    const { value, defaultValue, onChange } = this.props;
    let options = {};
    if ("defaultValue" in this.props) {
      options.defaultValue = defaultValue;
    }
    if ("value" in this.props) {
      options.value = value;
    }
    if ("onChange" in this.props) {
      options.onChange = this.handleChange;
    }
    return options;
  };

  getBtnOptions = () => {
    const { enterButton } = this.props;
    let options = {
      onClick: this.handleCopy
    };

    if (typeof enterButton === "string") {
      return;
    }

    return options;
  };

  getButton = () => {
    const { enterButton } = this.props;
    if (typeof enterButton === "string") {
      return (
        <button className="copy-btn" onClick={this.handleCopy}>
          {enterButton}
        </button>
      );
    }
    if (React.isValidElement(enterButton)) {
      return enterButton;
    }
    return <button className="copy-btn">copy</button>;
  };

  render() {
    const Button = this.getButton();
    return (
      <div className={Style.copy}>
        <input
          ref={this.ref}
          className="copy-input"
          {...this.getInputOptions()}
        />
        <span className="copy-btn-wrapper">{Button}</span>
      </div>
    );
  }
}

export default Copy;
