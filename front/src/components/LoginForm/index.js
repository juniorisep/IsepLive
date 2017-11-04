// @flow

import React from 'react';

import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

export default function LoginForm(props) {
  return (
    <Dialog open={props.open} transition={Slide} onRequestClose={props.handleRequestClose}>
      <DialogTitle style={{
        textAlign: 'center'
      }}>
        <img alt="Isep Live" src="/img/iseplive.jpg" style={{
          height: '200px'
        }} />
      </DialogTitle>
      <DialogContent>
        <TextField type="text" label="Nom d'utilisateur" fullWidth onChange={(e) => props.onChange('username', e)} />
        <TextField type="password" label="Mot de passe" fullWidth onChange={(e) => props.onChange('password', e)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleRequestClose} color="primary">
          Mot de passe oublié
        </Button>
        <Button onClick={props.onConnexion} color="accent">
          Connexion
        </Button>
      </DialogActions>
    </Dialog>
  );
};
