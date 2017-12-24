// @flow

import React, { Component } from 'react';
import { Flex, Box } from "grid-styled";

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableFooter,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';

import { Paper, FluidContent, Title, Text, ProfileImage, Filler } from "../../../components/common";

import * as userData from '../../../data/users/student';

import UpdateStudent from './UpdateStudent';

class Users extends Component {

  state = {
    users: [],
    page: 0,
    total: 0,
    selected: null,
    filter: '',
  }

  componentDidMount() {
    this.loadUsers(0);
  }

  loadUsers(page: number) {
    userData.getStudents(page).then(res => {
      this.setState({
        users: res.data.content,
        page,
        total: res.data.totalElements,
      });
    })
  }

  filterUsers = (filter, page) => {
    if (this.filterTimeout) clearTimeout(this.filterTimeout);
    this.setState({ filter })
    this.filterTimeout = setTimeout(() => {
      userData.searchStudents(filter, [], "a", page).then(res => {
        this.setState({
          users: res.data.content,
          total: res.data.totalElements,
          page,
        });
      })
    }, 300);

  }

  handleChangePage = (event: Event, page: number) => {
    if (this.state.filter !== '') {
      this.filterUsers(this.state.filter, page);
    } else {
      this.loadUsers(page);
    }
  }

  changeFilter = (event) => {
    this.filterUsers(event.target.value, 0);
  }

  selectRow = selected => e => {
    this.setState({ selected });
  }

  onChangeField = (name, value) => {
    this.setState(state => ({
      selected: {
        ...state.selected,
        [name]: value,
      }
    }));
  }

  render() {
    const {
      users,
      page,
      total,
      filter,
      selected,
    } = this.state;
    return (
      <FluidContent>
        <Flex wrap>
          <Box w={[1, 1 / 3]} p={1}>
            <div>
              <Title invert>Etudiant</Title>
              {!selected && <Text>Sélectionnez un étudiant</Text>}
              {
                selected &&
                <UpdateStudent
                  selected={selected}
                  onChangeField={this.onChangeField}
                  refreshTable={() => this.loadUsers(this.state.page)}
                  selectRow={(selected) => this.setState({ selected })} />
              }
            </div>
          </Box>
          <Box w={[1, 2 / 3]} p={1} pl={2}>
            <Paper p="1em">
              <TextField
                label="Filtrer par nom et prénom"
                fullWidth
                value={filter}
                onChange={this.changeFilter} />
            </Paper>
            <br />
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[20]}
                      count={total}
                      rowsPerPage={20}
                      page={page}
                      onChangePage={this.handleChangePage}
                    />
                  </TableRow>
                  <TableRow>
                    <TableCell>Photo</TableCell>
                    <TableCell>Nom</TableCell>
                    <TableCell numeric>Promotion</TableCell>
                    <TableCell>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    users.map(u => {
                      return (
                        <TableRow
                          key={u.id}
                          hover
                          selected={selected && u.id === selected.id}
                          onClick={this.selectRow(u)} >
                          <TableCell>
                            <ProfileImage src={u.photoUrlThumb} sz="50px" />
                          </TableCell>
                          <TableCell>
                            {u.firstname} {u.lastname}
                          </TableCell>
                          <TableCell numeric>
                            {u.promo}
                          </TableCell>
                          <TableCell>
                            {/* {n.association} */}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  }
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[20]}
                      count={total}
                      rowsPerPage={20}
                      page={page}
                      onChangePage={this.handleChangePage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </Paper>
          </Box>
        </Flex>
        <Filler h={200} />
      </FluidContent>
    );
  };
};

export default Users;
