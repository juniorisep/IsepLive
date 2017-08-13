// @flow

import React, {Component} from 'react';

import Paper from 'material-ui/Paper';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Button from 'material-ui/Button';

let id = 0;

function createData(name, promotion, association) {
  id += 1;
  return {id, name, promotion, association};
};

const data = [
  createData('Victor ELY', 2018, 'Junior ISEP'),
  createData('Guillaume CARRE', 2018, 'Junior ISEP'),
  createData('Arnaud RIBEYROLLES', 2018, 'Junior ISEP'),
  createData('Aurélien SCHILTZ', 2018, 'Junior ISEP'),
  createData('Nicolas DE CHEVIGNE', 2018,)
];

class Users extends Component {

  render() {
    return (
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
    );
  };
};

export default Users;
