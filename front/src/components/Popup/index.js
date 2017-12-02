// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { Text } from '../common';
import Button from 'material-ui/Button';


import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';


class Popup extends Component {

  state = {
    open: false,
  }

  componentWillReceiveProps(props) {
    if (props.open !== this.state.open) {
      this.setState({ open: props.open });
    }
  }

  discard = () => {
    this.setState({ open: false })
  }

  agree = () => {
    this.props.onAccept();
    this.setState({ open: false })
  }

  render() {
    return (
      <Dialog open={this.state.open} onRequestClose={this.discard}>
        <DialogTitle>{this.props.title || 'Titre'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {this.props.description || ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.discard} color="primary">
            Annuler
          </Button>
          <Button onClick={this.agree} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
};

export default Popup;
