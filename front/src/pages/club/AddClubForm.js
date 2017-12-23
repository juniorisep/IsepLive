// @flow

import React from 'react';

import { Text } from 'components/common';

import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';

import DatePicker from '../../components/DatePicker';
import AutoComplete from '../../components/Autocomplete';
import * as userData from '../../data/users/student';


export default class AddClubForm extends React.Component {

  state = {
    name: '',
    creation: new Date(),
    president: 0,
    description: '',
    website: '',
    logo: null,
  }

  change = (name, value) => {
    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
  }

  handleInput = name => event =>
    this.change(name, event.target.value);

  search = value => {
    return userData.searchStudents(value, [], 'a', 0)
      .then(res => res.data.content);
  }

  renderSuggestion = sug =>
    `${sug.firstname} ${sug.lastname}`;

  handleSave = e => {
    this.props.onSave(this.state).then(res => {
      this.props.handleRequestClose();
    });
  }

  render() {
    const props = this.props;
    return (
      <Dialog open={props.open} transition={Slide} onRequestClose={props.handleRequestClose} >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nom"
            fullWidth
            margin="normal"
            onChange={this.handleInput('name')}
          />
          <div style={{ margin: '20px 0' }} >
            <Text>Création</Text>
            <DatePicker
              dateonly
              date={this.state.creation}
              startYear={1956}
              endYear={new Date().getFullYear() + 1}
              onChange={date => this.change('creation', date)} />
          </div>
          <AutoComplete
            label="Président"
            search={this.search}
            onSelect={val => this.change('president', val.id)}
            renderSuggestion={sug => `${sug.firstname} ${sug.lastname}`}
            suggestionValue={e => e.id}
          />
          <TextField
            label="Description"
            multiline
            rows="4"
            fullWidth
            margin="normal"
            onChange={this.handleInput('description')} />
          <TextField label="Site Internet" fullWidth margin="normal" onChange={this.handleInput('website')} />
          <div style={{ marginTop: 10 }}>
            <input onChange={(e) => this.change('logo', e.target.files[0])} accept="jpg,jpeg,JPG,JPEG" id="file" type="file" style={{ display: 'none' }} />
            <label htmlFor="file">
              <Button raised component="span">
                Ajouter logo
                </Button>
            </label>
          </div>
          {this.state.logo && <Text>Fichier sélectionné: {this.state.logo.name}</Text>}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleRequestClose} color="primary">
            Annuler
            </Button>
          <Button color="accent" onClick={this.handleSave}>
            Ajouter
            </Button>
        </DialogActions>
      </Dialog>
    );
  }
};
