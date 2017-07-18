// @flow

import React, { Component } from 'react';

import { Flex, Box } from 'grid-styled';

import {
  FluidContent,
  Header,
  Filler,
  Banner,
} from '../../components/common';

class Whoarewe extends Component {
  render() {
    return (
      <div>
        <Header url="img/background.jpg">
          <Filler h={50} />
          <Banner>
            <h1>Qui sommes-nous ?</h1>
            <p>Notre petit jardin secret</p>
          </Banner>
        </Header>
        <FluidContent>

        </FluidContent>
      </div>
    );
  }
}

export default Whoarewe;
