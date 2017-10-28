// @flow

import React, { Component } from 'react';

import EventView from './view';

import * as eventData from 'data/event';

class Event extends Component {

  state = {
    events: [],
    isLoading: false,
    eventsFilter: 'next',
  };

  componentDidMount() {
    this.setState({ isLoading: true })
    eventData.getEvents().then(res => {
      this.setState({ events: res.data, isLoading: false });
    });
  };

  modifyFilter = (eventsFilter: string) => {
    this.setState({ eventsFilter });
  }

  filterEvents = (events) => {
    const now = new Date().getTime();
    if (this.state.eventsFilter === 'past') {
      return events.filter(e => e.date < now);
    }
    return events.filter(e => e.date > now);
  }

  render() {
    return (
      <EventView
        isLoading={this.state.isLoading}
        events={this.filterEvents(this.state.events)}
        onModifyFilter={this.modifyFilter}
        eventsFilter={this.state.eventsFilter} />
    );
  };
};

export default Event;
