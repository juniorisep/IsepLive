// @flow

import React from 'react';

import type {Node} from 'react';

import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';

import type { AxiosPromise } from 'axios';

import type { Student } from '../../data/users/type';

type Props = {
  renderSuggestion: (value: Student) => Node,
  onSelect: (value: Student, fullname: string) => mixed,
  search: () => AxiosPromise<Student[]>,
}

type State = {
  results: Student[],
  value: string,
  focus: boolean,
}

export default class Autocomplete extends React.Component<Props, State> {

  state = {
    results: [],
    value: '',
    focus: false,
  }

  componentWillReceiveProps(props) {
    if (props.value || props.value === '') {
      this.setState({ value: props.value });
    }
  }

  renderResults = (val: Student) => {
    return (
      <MenuItem key={val.id} onMouseDown={this.handleSelect(val)}>
        {this.props.renderSuggestion(val)}
      </MenuItem>
    );
  }

  handleSelect = (val: Student) => () => {
    const fullName = val.firstname + ' ' + val.lastname;
    this.setState({ value: fullName });
    this.props.onSelect(val, fullName);
  }

  handleSuggestionsFetchRequested = (value) => {
    this.props.search(value).then(list => {
      this.setState({ results: list });
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
    const showResults = (value && focus && value.length > 0 && results.length > 0);
    const autocompleteStyle = {
      position: 'relative',
      width: 300,
    };
    const resStyle = {
      position: 'absolute',
      top: 10,
      padding: 10,
      width: '100%',
      background: 'white',
      zIndex: 2,
      overflow: 'auto',
      maxHeight: 200,
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    };
    return (
      <div>
        <TextField
          autoFocus
          fullWidth
          type="text"
          autoComplete="off"
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
    );
  }

}
