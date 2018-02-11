// @flow

import React from "react";


import Tabs, { Tab } from 'material-ui/Tabs';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { Flex, Box } from 'grid-styled';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

import TextField from 'material-ui/TextField';
import { DatePicker } from 'material-ui-pickers';

import { FluidContent, Title, Paper } from "../../../components/common";
import Time from '../../../components/Time';


import * as dorData from '../../../data/dor';
import type { SessionDor, SessionDorCreate } from '../../../data/dor/type';


type State = {
  sessions: SessionDor[],
  sessionForm: SessionDorCreate,
}

export default class Session extends React.Component<{}, State> {

  state = {
    sessions: [],
    sessionForm: {
      result: new Date(),
      firstTurn: new Date(),
      secondTurn: new Date(),
    },
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions() {
    dorData.getSessions().then(res => {
      console.log(res.data);
      this.setState({ sessions: res.data });
    });
  }

  changeForm = (name) => (date) => {
    this.setState({
      sessionForm: {
        ...this.state.sessionForm,
        [name]: date,
      }
    })
  }

  render() {
    const { sessions, sessionForm } = this.state;
    return (
      <Flex p={2} wrap>
        <Box w={1 / 3} p={2}>
          <Paper p="2em" style={{ marginBottom: 20 }}>
            <Title invert fontSize={1.2}>Créer une Session</Title>
            <DatePicker
              margin="normal"
              label="1er tour"
              value={sessionForm.firstTurn}
              onChange={this.changeForm('firstTurn')}
              format="DD/MM/YY"
              fullWidth />
            <DatePicker
              margin="normal"
              label="2e tour"
              value={sessionForm.secondTurn}
              onChange={this.changeForm('secondTurn')}
              format="DD/MM/YY"
              fullWidth />
            <DatePicker
              margin="normal"
              label="Résultats"
              value={sessionForm.result}
              onChange={this.changeForm('result')}
              format="DD/MM/YY"
              fullWidth />
            <Button color="primary">Créer</Button>
          </Paper>
          <Button
            fab
            size="medium"
            color="primary">
            <AddIcon />
          </Button>
        </Box>

        <Box w={2 / 3} p={2}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Resultats</TableCell>
                  <TableCell>1er tour</TableCell>
                  <TableCell>2e tour</TableCell>
                  <TableCell>Actif</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  sessions.map(s => {
                    return (
                      <TableRow>
                        <TableCell><Time date={s.result} format="DD/MM/YY" /></TableCell>
                        <TableCell><Time date={s.firstTurn} format="DD/MM/YY" /></TableCell>
                        <TableCell><Time date={s.secondTurn} format="DD/MM/YY" /></TableCell>
                        <TableCell>
                          <Checkbox checked={s.enabled} />
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </Paper>
        </Box>

      </Flex>
    )
  }
}