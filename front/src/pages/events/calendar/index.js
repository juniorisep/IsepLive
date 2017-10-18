// @flow

import React, {Component} from 'react';

import {Banner, Filler, FluidContent, Header, SearchBar} from 'components/common';

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
        <FluidContent>Calendrier</FluidContent>
      </div>
    );
  };
};

export default CalendarEvents;
