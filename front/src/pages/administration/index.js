// @flow

import React, {Component} from 'react';

import Paper from 'material-ui/Paper';
import Tabs, {Tab} from 'material-ui/Tabs';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Slide from 'material-ui/transitions/Slide';

import {FluidContent} from '../../components/common';

const TabContainer = props => <div style={{
  padding: 20
}}>
  {props.children}
</div>;

let id = 0;
function createData(name, promotion, association) {
  id += 1;
  return {
    id,
    name,
    promotion,
    association,
  };
}

const data = [
  createData('Victor ELY', 2018, 'Junior ISEP'),
  createData('Guillaume CARRE', 2018, 'Junior ISEP'),
  createData('Arnaud RIBEYROLLES', 2018, 'Junior ISEP'),
  createData('Aurélien SCHILTZ', 2018, 'Junior ISEP'),
  createData('Nicolas DE CHEVIGNE', 2018, )
];

class Admin extends Component {
  state = {
    index: 0,
     open: false,
  };

  handleChange = (event, index) => {
    this.setState({index});
  };

  handleRequestClose = () => {
  this.setState({ open: false });
};
  render() {
    return (
      <div>
        <FluidContent>
          <Paper>
            <Tabs index={this.state.index} onChange={this.handleChange} indicatorColor="primary" textColor="primary" centered>
              <Tab label="Utilisateurs"/>
              <Tab label="Associations"/>
              <Tab label="ISEP D'OR"/>
            </Tabs>
          </Paper>
          {this.state.index === 0 && <TabContainer>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Noms</TableCell>
                    <TableCell numeric>Promotion</TableCell>
                    <TableCell>Association</TableCell>
                    <TableCell>Gestion</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map(n => {
                    return (
                      <TableRow key={n.id}>
                        <TableCell>
                          {n.name}
                        </TableCell>
                        <TableCell numeric>
                          {n.promotion}
                        </TableCell>
                        <TableCell>
                          {n.association}
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
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </TabContainer>}
          {this.state.index === 1 && <TabContainer>
            <Button raised onClick={() => this.setState({ open: true })}>
              Ajouter une association
            </Button>
            <Dialog open={this.state.open} onRequestClose={this.handleRequestClose} transition={Slide}>
              <DialogTitle>
                {"Ajouter une nouvelle association"}
              </DialogTitle>
              <DialogContent>
                <TextField
                  type="text"
                  label="Nom de l'association"
                  fullWidth
                />
                <TextField
                  type="text"
                  label="date de création"
                  fullWidth
                />
                <TextField
                  type="text"
                  label="Description"
                  fullWidth
                />
                <TextField
                  type="text"
                  label="Email"
                  fullWidth
                />
                <TextField
                  type="text"
                  label="Nom du président"
                  fullWidth
                />
                <br /><br />
                <input accept="jpg,jpeg,JPG,JPEG" id="file" multiple type="file" style={{display: 'none'}} />
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
          </TabContainer>}
          {this.state.index === 2 && <TabContainer>
            {'Item Three'}
          </TabContainer>}
        </FluidContent>
      </div>
    );
  }
};

export default Admin;
