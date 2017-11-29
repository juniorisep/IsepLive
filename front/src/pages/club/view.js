// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'grid-styled';
import { Link } from 'react-router-dom';
import {
  Text,
  Banner,
  Filler,
  FluidContent,
  Header,
  Image,
  SearchBar,
} from 'components/common';

import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';

import Auth from 'components/Auth/AuthComponent';
import * as roles from '../../constants';

import DatePicker from '../../components/DatePicker';
import AutoComplete from '../../components/Autocomplete';

import * as userData from '../../data/users/student';

const ClubTile = (props) => {
  const ClubStyle = styled.div`
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

    > img {
      width: 100%;
    }

    > p {
      padding: 10px;
      margin: 0;
      text-align: center;
      font-size: 1.2em;
      font-weight: 500;
      color: ${props => props.theme.main};
    }
  `;
  return (
    <ClubStyle>
      <Image src={props.url} mb="5px" />
      <p>{props.name}</p>
    </ClubStyle>
  );
};

export default class Club extends Component {
  state = {
    open: false,
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Header url="/img/background.jpg">
          <Filler h={50} />
          <Banner>
            <h1>Associations</h1>
            <p>Participez à la vie étudiante de l'ISEP</p>
          </Banner>
          <FluidContent p="0">
            <SearchBar placeholder="Rechercher des associations" />
          </FluidContent>
        </Header>
        <FluidContent>
          <Auth roles={[roles.ADMIN, roles.CLUB_MANAGER]}>
            <Flex>
              <Box ml="auto">
                <Button fab color="primary" aria-label="add" onClick={() => this.setState({ open: true })}>
                  <AddIcon />
                </Button>
              </Box>
              <AddClubForm
                open={this.state.open}
                handleRequestClose={this.handleRequestClose}
                onAdd={this.props.addClub}
              />
            </Flex>
          </Auth>
          <Flex wrap>
            {
              this.props.clubs.map(e => {
                return (
                  <Box key={e.id} w={[1, 1 / 3, 1 / 4]} p={2}>
                    <Link to={`/associations/${e.id}`}>
                      <ClubTile url={e.logoUrl} name={e.name} />
                    </Link>
                  </Box>
                );
              })
            }
          </Flex>
        </FluidContent>
      </div>
    );
  };
};

class AddClubForm extends React.Component {

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

  handleAdd = e => {
    this.props.onAdd(this.state).then(res => {
      this.props.handleRequestClose();
    });
  }

  render() {
    const props = this.props;
    return (
      <Dialog open={props.open} transition={Slide} onRequestClose={props.handleRequestClose} >
        <DialogTitle>Ajouter une association</DialogTitle>
        <DialogContent>
          <TextField label="Nom" fullWidth margin="normal" onChange={this.handleInput('name')} />
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
          <TextField label="Description" multiline rows="4" fullWidth margin="normal" onChange={this.handleInput('description')} />
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
          <Button color="accent" onClick={this.handleAdd}>
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
};
