// @flow

import React from 'react';

import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';

export default class Autocomplete extends React.Component {

  state = {
    results: [],
    value: '',
    focus: false,
  }

  componentWillReceiveProps(props) {
    if (props !== null) {
      this.setState({ value: props.value });
    }
  }

  renderResults = (val) => {
    return (
      <MenuItem key={val.id} onMouseDown={this.handleSelect(val)}>
        {this.props.renderSuggestion(val)}
      </MenuItem>
    )
  }

  handleSelect = (val) => (event) => {
    const fullName = val.firstname + ' ' + val.lastname;
    this.setState({ value: fullName });
    this.props.onSelect(val, fullName);
  }

  handleSuggestionsFetchRequested = (value) => {
    this.props.search(value).then(list => {
      this.setState({ results: list })
    });
  }

  handleChange = (event) => {
    const val = event.target.value;
    this.setState({ value: val });
    this.handleSuggestionsFetchRequested(val);
  }

  render() {
    const { label } = this.props;
    const { results, value, focus } = this.state;
    const showResults = (focus && value.length > 0 && results.length > 0);
    const autocompleteStyle = {
      position: 'relative',
    };
    const resStyle = {
      position: 'absolute',
      top: 10,
      padding: 10,
      width: '100%',
      background: 'white',
      zIndex: 1,
      overflow: 'auto',
      maxHeight: 200,
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    };
    return (
      <div>
        <TextField
          autoFocus
          fullWidth
          label={label}
          value={value}
          onFocus={() => this.setState({ focus: true })}
          onBlur={(e) => this.setState({ focus: false })}
          onChange={this.handleChange}
        />
        {
          showResults &&
          <div style={autocompleteStyle}>
            <div style={resStyle}>
              {results.map(this.renderResults)}
            </div>
          </div>
        }

      </div>
    )
  }

}
