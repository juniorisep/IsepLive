// @flow

import React, { Component } from 'react';

import { Banner, Filler, FluidContent, Header, SearchBar } from 'components/common';

class Help extends Component {
  render() {
    return (
      <div>
        <Header url="/img/background.jpg">
          <Filler h={50} />
          <Banner>
            <h1>Besoin d'aide ?</h1>
            <p>On vous dévoile tout !</p>
          </Banner>
          <FluidContent p="0">
            <SearchBar placeholder="Rechercher" />
          </FluidContent>
        </Header>
        <FluidContent></FluidContent>
      </div>
    );
  };
};

export default Help;
