import React from 'react';

import { DatePicker } from 'material-ui-pickers';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import { Title, Paper } from '../../../../components/common';

import * as dorData from '../../../../data/dor';

export default class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionForm: this.getDefaultForm(),
      create: false,
    };
  }

  changeForm = (name: string) => (date: Date) => {
    this.setState({
      sessionForm: {
        ...this.state.sessionForm,
        [name]: date,
      },
    });
  };

  getDefaultForm = () => {
    return {
      result: null,
      firstTurn: null,
      secondTurn: null,
      enabled: false,
    };
  };

  createSession = () => {
    const { sessionForm } = this.state;
    dorData
      .createSession({
        result: sessionForm.result,
        firstTurn: sessionForm.firstTurn,
        secondTurn: sessionForm.secondTurn,
      })
      .then(res => {
        this.setState({
          sessionForm: {
            result: null,
            firstTurn: null,
            secondTurn: null,
          },
          create: false,
        });
        this.props.refreshTable(res.data.id);
      });
  };

  isCreateFormValid() {
    const { result, firstTurn, secondTurn } = this.state.sessionForm;
    return result != null && firstTurn != null && secondTurn != null;
  }

  saveSession = () => {
    this.createSession();
  };

  render() {
    let { sessionForm, create } = this.state;
    const { selected } = this.props;
    if (selected) {
      sessionForm = selected;
    }
    return (
      <div>
        <Paper p="2em" style={{ marginBottom: 20 }}>
          <Title invert fontSize={1.2}>
            {create ? 'Créer une Session' : 'Session'}
          </Title>
          <DatePicker
            margin="normal"
            label="1er tour"
            value={sessionForm.firstTurn}
            onChange={this.changeForm('firstTurn')}
            format="DD/MM/YY"
            fullWidth
          />
          <DatePicker
            margin="normal"
            label="2e tour"
            value={sessionForm.secondTurn}
            onChange={this.changeForm('secondTurn')}
            format="DD/MM/YY"
            fullWidth
          />
          <DatePicker
            margin="normal"
            label="Résultats"
            value={sessionForm.result}
            onChange={this.changeForm('result')}
            format="DD/MM/YY"
            fullWidth
          />
          {!create && (
            <FormControlLabel
              style={{ width: '100%' }}
              control={
                <Checkbox
                  checked={sessionForm.enabled}
                  onChange={(e, checked) =>
                    this.setState({
                      sessionForm: {
                        ...this.state.sessionForm,
                        enabled: checked,
                      },
                    })
                  }
                />
              }
              label="Activé"
            />
          )}

          {create && (
            <Button
              color="primary"
              onClick={this.createSession}
              disabled={!this.isCreateFormValid()}
            >
              Créer
            </Button>
          )}
          {!create && (
            <Button
              color="primary"
              onClick={this.saveSession}
              disabled={!this.isCreateFormValid()}
            >
              Enregistrer
            </Button>
          )}
        </Paper>
        <Button
          fab
          size="medium"
          color="primary"
          onClick={() => {
            this.props.deselect();
            this.setState({
              create: true,
              sessionForm: this.getDefaultForm(),
            });
          }}
        >
          <AddIcon />
        </Button>
      </div>
    );
  }
}
