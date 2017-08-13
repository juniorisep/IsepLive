// @flow

import React, {Component} from 'react';

import AddressBookView from './view';

import * as studentData from '../../data/users/student';

class AddressBook extends Component {

  state = {
    students: []
  };

  componentDidMount() {
    studentData.getStudents().then(res => {
      this.setState({students: res.data});
    });
  };

  render() {
    return (<AddressBookView students={this.state.students} />);
  };
};

export default AddressBook;
