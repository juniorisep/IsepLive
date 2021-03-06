import { Fab } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { sendAlert } from '../../../../components/Alert';
import { Paper, Text, Title } from '../../../../components/common';
import * as userData from '../../../../data/users/student';
import { CreateEmployee, Employee } from '../../../../data/users/type';

type EmployeeFormState = {
  employeeForm: Employee;
  create: boolean;
};

type EmployeeFormProps = {
  selected: Employee | null;
  deselect: () => void;
  refreshTable: (id?: number) => void;
};

export default class EmployeeForm extends React.Component<
  EmployeeFormProps,
  EmployeeFormState
> {
  constructor(props: EmployeeFormProps) {
    super(props);
    this.state = {
      employeeForm: this.getDefaultForm(),
      create: false,
    };
  }

  componentDidUpdate(prevProps: EmployeeFormProps) {
    if (this.props.selected !== prevProps.selected) {
      if (
        this.props.selected &&
        this.props.selected !== this.state.employeeForm
      ) {
        this.setState({ create: false, employeeForm: this.props.selected });
      }
    }
  }

  changeCheckBox = (name: string) => (e: any, checked: boolean) => {
    this.setState({
      employeeForm: {
        ...this.state.employeeForm,
        [name]: checked,
      },
    });
  };

  getDefaultForm = (): Employee => {
    return {
      id: 0,
      firstname: '',
      lastname: '',
    } as Employee;
  };

  createForm = (form: Employee): CreateEmployee => {
    return {
      firstname: form.firstname,
      lastname: form.lastname,
    };
  };

  createEmployee = async () => {
    const { employeeForm } = this.state;
    const res = await userData.createEmployee(this.createForm(employeeForm));
    this.setState({
      create: false,
    });
    this.props.refreshTable(res.data.id);
  };

  updateEmployee = async () => {
    const { employeeForm } = this.state;
    if (this.props.selected) {
      const res = await userData.updateEmployee(
        this.props.selected.id,
        this.createForm(employeeForm)
      );
      sendAlert('Employé mis à jour');
      this.props.refreshTable(res.data.id);
    }
  };

  deleteEmployee = async () => {
    if (this.props.selected) {
      await userData.deleteEmployee(this.props.selected.id);
      this.props.refreshTable();
      this.props.deselect();
    }
  };

  isCreateFormValid() {
    const { firstname, lastname } = this.state.employeeForm;
    return firstname !== '' && lastname !== '';
  }

  saveEmployee = () => {
    if (this.state.create) {
      this.createEmployee();
      return;
    }
    this.updateEmployee();
  };

  render() {
    const { employeeForm, create } = this.state;
    const { selected } = this.props;
    return (
      <div>
        <Paper p="2em" style={{ marginBottom: 20 }}>
          <Title invert fontSize={1.2}>
            {create ? 'Créer un Employé' : 'Employé'}
          </Title>
          {(selected || create) && (
            <div>
              <TextField
                margin="normal"
                fullWidth
                label="Prénom"
                value={employeeForm.firstname}
                onChange={e =>
                  this.setState({
                    employeeForm: {
                      ...this.state.employeeForm,
                      firstname: e.target.value,
                    },
                  })
                }
              />
              <TextField
                margin="normal"
                fullWidth
                label="Nom"
                value={employeeForm.lastname}
                onChange={e =>
                  this.setState({
                    employeeForm: {
                      ...this.state.employeeForm,
                      lastname: e.target.value,
                    },
                  })
                }
              />

              {create && (
                <Button
                  color="primary"
                  onClick={this.createEmployee}
                  disabled={!this.isCreateFormValid()}
                >
                  Créer
                </Button>
              )}
              {!create && (
                <Button
                  color="primary"
                  onClick={this.saveEmployee}
                  disabled={!this.isCreateFormValid()}
                >
                  Enregistrer
                </Button>
              )}
            </div>
          )}
          {!selected && !create && (
            <div>
              <Text>Sélectionnez un employé de la liste</Text>
            </div>
          )}
        </Paper>
        <Fab
          size="medium"
          color="primary"
          style={{ marginRight: 10 }}
          onClick={() => {
            this.props.deselect();
            this.setState({
              create: true,
              employeeForm: this.getDefaultForm(),
            });
          }}
        >
          <AddIcon />
        </Fab>
        {selected && (
          <Fab size="medium" color="secondary" onClick={this.deleteEmployee}>
            <DeleteIcon />
          </Fab>
        )}
      </div>
    );
  }
}
