// @flow

import React, { Component } from 'react';

import { Banner, Filler, FluidContent, Header, SearchBar, ScrollToTopOnMount } from 'components/common';

class EventDetail extends Component {
  render() {
    return (
      <div>
        <ScrollToTopOnMount />
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
          <h1>Détails de l'évènements...</h1>
        </FluidContent>
      </div>
    );
  };
};

export default EventDetail;
