import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

const styles = {
  inputStyle: {
    color: 'white'
  }
}

export default class SearchBar extends Component {

  static defaultProps = {
    placeholder: "",
    onFocus: function(){},
    onBlur: function(){},
  }

  state = {
    focus: false
  }

  render() {
    const { placeholder, ...props } = this.props;
    return (
      <div className="search-wrapper">
        <TextField
          className="search-bar"
          type="search"
          placeholder={placeholder}
          inputStyle={styles.inputStyle}
          {...props}/>
      </div>
    );
  }
}
