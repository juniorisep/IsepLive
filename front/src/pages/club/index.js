// @flow

import React, {Component} from 'react';

import ClubView from './view';

import * as clubData from '../../data/club';

class Club extends Component {

  state = {
    clubs: []
  }

  componentDidMount() {
    clubData.getClubs().then(res => {
      this.setState({clubs: res.data});
    })
  }

  render() {
    return (<ClubView clubs={this.state.clubs} />);
  }
}

export default Club;
