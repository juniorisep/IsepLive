// @flow

import React, { Component } from 'react';

import { Banner, Filler, FluidContent, Header, SearchBar, ScrollToTopOnMount } from 'components/common';

class EventDetail extends Component {
  render() {
    return (
      <div>
        <ScrollToTopOnMount />
        <FluidContent>
          <h1>Détails de l'évènements...</h1>
        </FluidContent>
      </div>
    );
  };
};

export default EventDetail;
