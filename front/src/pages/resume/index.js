// @flow

import React, { Component } from 'react';

import { Flex, Box } from 'grid-styled';

import {
  FluidContent,
  Header,
  SearchBar,
  Filler,
  Banner,
} from '../../components/common';

class Resume extends Component {
  render() {
    return (
      <div>
        <Header url="img/background.jpg">
          <Filler h={50} />
          <Banner>
            <h1>Profile</h1>
            <p>Ton petit jardin secret</p>
          </Banner>
          <FluidContent p="0">
            <SearchBar placeholder="Rechercher des évenements"/>
          </FluidContent>
        </Header>
        <FluidContent>

        </FluidContent>
      </div>
    );
  }
}

export default Resume;
