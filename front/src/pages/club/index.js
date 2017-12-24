// @flow

import React, { Component } from 'react';

import ClubView from './view';


import * as clubData from 'data/club';

class Club extends Component {
  state = {
    clubs: [],
    loading: false,
  };

  componentDidMount() {
    this.getClubs();
  }

  getClubs = () => {
    this.setState({ loading: true });
    clubData.getClubs().then(res => {
      this.setState({ clubs: res.data, loading: false });
    });
  }

  addClub = (form) => {
    return clubData.createClub(form).then(res => {
      this.getClubs();
      return res;
    });
  }

  render() {
    return (
      <ClubView
        loading={this.state.loading}
        clubs={this.state.clubs}
        addClub={this.addClub} />
    );
  };
};

export default Club;
