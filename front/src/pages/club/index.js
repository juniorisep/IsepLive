// @flow

import React, { Component } from 'react';

import ClubView from './view';

import * as clubData from 'data/club';

class Club extends Component {
  state = {
    clubs: [],
  };

  componentDidMount() {
    this.getClubs();
  }

  getClubs = () => {
    clubData.getClubs().then(res => {
      this.setState({ clubs: res.data });
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
        clubs={this.state.clubs}
        addClub={this.addClub} />
    );
  };
};

export default Club;
