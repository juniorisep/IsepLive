// @flow

import React, { Component } from 'react';

import { Banner, Filler, FluidContent, Header } from 'components/common';

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
        </Header>
        <FluidContent>
          <Filler h={200} />
        </FluidContent>
      </div>
    );
  };
};

export default Help;
