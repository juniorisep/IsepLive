// @flow

import React, {Component} from 'react';

import {Banner, Filler, FluidContent, Header, SearchBar} from 'components/common';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

// API_KEY_GOOGLE: AIzaSyA2PjbZfTlgzBMgpuPUuJ0_9kFf-_nOxdM
// Google_Maps: https://github.com/tomchentw/react-google-maps

class Contact extends Component {
  render() {
    return (
      <div>
        <Header url="/img/background.jpg">
          <Filler h={50} />
          <Banner>
            <h1>Contact</h1>
            <p>Comment nous contacter</p>
          </Banner>
          <FluidContent p="0">
            <SearchBar placeholder="Rechercher" />
          </FluidContent>
        </Header>
        <FluidContent>
          <TextField
            id="Nom"
            label="Nom"
            InputProps={{ placeholder: 'Nom' }}
            fullWidth
            margin="normal"
          />
          <TextField
            id="Adresse email"
            label="Adresse email"
            InputProps={{ placeholder: 'Adresse email' }}
            fullWidth
            margin="normal"
          />
          <TextField
            id="Téléphone"
            label="Téléphone"
            InputProps={{ placeholder: 'Téléphone' }}
            fullWidth
            margin="normal"
          />
          <TextField
            id="Message"
            label="Message"
            InputProps={{ placeholder: 'Message' }}
            fullWidth
            multiline
            rows="4"
            margin="normal"
          />
          <p>Adresse</p>
          <p>Mail</p>
          <Button raised color="accent">Envoyer</Button>
          <h1>Mettre google maps ici ou avant le formulaire</h1> {/* TODO Mettre google maps ici ou avant le formulaire*/}
        </FluidContent>
      </div>
    );
  };
};

export default Contact;
