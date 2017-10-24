// @flow

import React, { Component } from 'react';

import AddressBookView from './view';

import * as studentData from 'data/users/student';

class AddressBook extends Component {

  state = {
    students: [],
    isSearching: false,
    search: '',
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
    const search = target.value;
    const { promotionFilter, sort } = this.state;
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(async () => {
      const res = await studentData.searchStudents(search, promotionFilter, sort);
      this.setState({
        search,
        students: res.data.content,
        isSearching: search !== '',
      });
    }, 300)
  }

  handleSort = async (event) => {
    console.log(event)
    const sort = event.target.value;
    const { search, promotionFilter } = this.state;
    const res = await studentData.searchStudents(search, promotionFilter, sort);
    this.setState({
      sort,
      students: res.data.content,
    });
  }

  handlePromoFilter = async (event) => {
    const promotionFilter = event.target.value;
    const { search, sort } = this.state;
    const res = await studentData.searchStudents(search, promotionFilter, sort);
    this.setState({
      promotionFilter,
      students: res.data.content,
      isSearching: promotionFilter.length > 0,
    });
  }

  render() {
    return (
      <AddressBookView
        alpha={this.state.sort}
        year={this.state.promotionFilter}
        loading={this.state.isLoading}
        lastPage={this.state.lastPage}
        students={this.state.students}
        onSearch={this.searchStudents}
        onSort={this.handleSort}
        onPromoFilter={this.handlePromoFilter}
        isSearching={this.state.isSearching}
      />
    );
  };
};

export default AddressBook;
