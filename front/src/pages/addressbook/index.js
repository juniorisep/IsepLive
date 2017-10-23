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
    page: 0,
    lastPage: false,
    isLoading: true,
  };

  componentDidMount() {
    this.getStudents();
  }

  getStudents() {
    if (this.state.page === 0) {
      this.setState({ isLoading: true });
    }
    studentData.getStudents(this.state.page)
      .then(res => {
        this.setState({
          isLoading: false,
          students: this.state.students.concat(res.data.content),
          page: this.state.page + 1,
          lastPage: res.data.last
        });
      });
  }

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
        loading={this.state.isLoading}
        lastPage={this.state.lastPage}
        students={this.state.students}
        onSearch={this.searchStudents}
        isSearching={this.state.isSearching}
      />
    );
  };
};

export default AddressBook;
