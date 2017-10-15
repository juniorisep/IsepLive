// @flow

import React, { Component } from 'react';

import AddressBookView from './view';

import * as studentData from 'data/users/student';

class AddressBook extends Component {

  state = {
    students: [],
    isSearching: false,
    promotionFilter: [],
    sort: 'a',
  };

  componentDidMount() {
    studentData.getStudents().then(res => {
      this.setState({ students: res.data.content });
    });
  };

  searchStudents = ({ target }) => {
    this.setState({ isSearching: target.value !== '' })
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(async () => {
      const res = await studentData.searchStudents(target.value);
      this.setState({ students: res.data.content });
    }, 1000)
  }

  render() {
    return (
      <AddressBookView
        students={this.state.students}
        onSearch={this.searchStudents}
        isSearching={this.state.isSearching}
      />
    );
  };
};

export default AddressBook;
