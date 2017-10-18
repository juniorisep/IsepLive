// @flow

import React, {Component} from 'react';

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import moment from 'moment';

import events from './events';

import {Banner, Filler, FluidContent, Header, SearchBar} from 'components/common';

BigCalendar.momentLocalizer(moment);

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class CalendarEvents extends Component {
  render() {
    return (
      <div>
        <Header url="/img/background.jpg">
          <Filler h={50} />
          <Banner>
            <h1>Evenements</h1>
            <p>Il faut parfois prendre une pause dans ses études...</p>
          </Banner>
          <FluidContent p="0">
            <SearchBar placeholder="Rechercher" />
          </FluidContent>
        </Header>
        <FluidContent>
          <BigCalendar
            events={events}
            views={allViews}
            step={60}
            defaultDate={new Date(2015, 3, 1)}
          />
        </FluidContent>
      </div>
    );
  };
};

export default CalendarEvents;
