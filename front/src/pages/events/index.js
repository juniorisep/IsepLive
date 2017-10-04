// @flow

import React, {Component} from 'react';

import EventView from './view';

import * as eventData from 'data/event';

class Event extends Component {

  state = {
    events: []
  };

  componentDidMount() {
    eventData.getEvents().then(res => {
      this.setState({events: res.data});
    });
  };

  render() {
    return (<EventView events={this.state.events} />);
  };
};

export default Event;
