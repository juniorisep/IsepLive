// @flow

import React, { Component } from 'react';
import { Flex, Box } from "grid-styled";

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui-icons/Delete';

import { Paper, FluidContent, Title, Text } from "../../../components/common";

import * as userData from '../../../data/users/student';


export default class UpdateStudent extends React.Component {

  onChangeField = name => e => {
    this.props.onChangeField(name, e.target.value);
  }

  render() {
    const { selected } = this.props;
    return (
      <div>
        <TextField
          margin="normal"
          label="Prénom"
          value={selected.firstname || ''}
          fullWidth
          onChange={this.onChangeField('firstname')} />
        <TextField
          margin="normal"
          label="Nom"
          value={selected.lastname || ''}
          fullWidth
          onChange={this.onChangeField('lastname')} />
        <TextField
          margin="normal"
          label="Promotion"
          value={selected.promo || ''}
          fullWidth
          onChange={this.onChangeField('promo')} />
        <TextField
          margin="normal"
          label="Email"
          value={selected.mail || ''}
          fullWidth
          onChange={this.onChangeField('mail')} />
        <TextField
          margin="normal"
          label="Téléphone"
          value={selected.phone || ''}
          fullWidth
          onChange={this.onChangeField('phone')} />
        <TextField
          margin="normal"
          label="Adresse"
          value={selected.address || ''}
          fullWidth
          onChange={this.onChangeField('address')} />
        <TextField
          margin="normal"
          label="Date de naissance"
          value={selected.birthDate || ''}
          fullWidth
          onChange={this.onChangeField('birthDate')} />
        <TextField
          multiline
          rows="4"
          margin="normal"
          label="Bio"
          value={selected.bio || ''}
          fullWidth
          onChange={this.onChangeField('bio')} />
        <TextField
          margin="normal"
          label="Lien Facebook"
          value={selected.facebook || ''}
          fullWidth
          onChange={this.onChangeField('facebook')} />
        <TextField
          margin="normal"
          label="Lien Twitter"
          value={selected.twitter || ''}
          fullWidth
          onChange={this.onChangeField('twitter')} />
        <TextField
          margin="normal"
          label="Lien Instagram"
          value={selected.instagram || ''}
          fullWidth
          onChange={this.onChangeField('instagram')} />
        <TextField
          margin="normal"
          label="Lien Snapchat"
          value={selected.snapchat || ''}
          fullWidth
          onChange={this.onChangeField('snapchat')} />


        <div>
          <IconButton>
            <Delete />
          </IconButton>
        </div>
      </div>
    );
  }
}