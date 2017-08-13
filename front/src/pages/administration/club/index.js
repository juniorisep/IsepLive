// @flow

import React, {Component} from 'react';

import Button from 'material-ui/Button';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Slide from 'material-ui/transitions/Slide';

class Club extends Component {
  state = {
    open: false
  };

  handleRequestClose = () => {
    this.setState({open: false});
  };

  render() {
    return (
      <div>
        <Button raised onClick={() => this.setState({open: true})}>
          Ajouter une association
        </Button>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose} transition={Slide}>
          <DialogTitle>
            {"Ajouter une nouvelle association"}
          </DialogTitle>
          <DialogContent>
            <TextField type="text" label="Nom de l'association" fullWidth />
            <TextField type="text" label="date de création" fullWidth />
            <TextField type="text" label="Description" fullWidth />
            <TextField type="text" label="Email" fullWidth />
            <TextField type="text" label="Nom du président" fullWidth />
            <br /><br />
            <input accept="jpg,jpeg,JPG,JPEG" id="file" multiple type="file" style={{
              display: 'none'
            }} />
            <label htmlFor="file">
              <Button raised component="span">
                Télécharger son logo
              </Button>
            </label>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Annuler
            </Button>
            <Button onClick={this.handleRequestClose} color="primary">
              Créer
            </Button>
          </DialogActions>
        </Dialog>
        <br /><br />
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Noms</TableCell>
                <TableCell>Gestion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  Junior ISEP
                </TableCell>
                <TableCell>
                  <Button raised>
                    Modifier
                  </Button>
                  <Button raised>
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  };
};

export default Club;
