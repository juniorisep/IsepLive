// @flow

import React, {Component} from 'react';

import {FluidContent, Header, SearchBar, Filler, Banner} from '../../components/common';

class UserAgreement extends Component {
  render() {
    return (
      <div>
        <Header url="img/background.jpg">
          <Filler h={50}/>
          <Banner>
            <h1>Convention d'utilisation</h1>
            <p>On vous dévoile tout !</p>
          </Banner>
          <FluidContent p="0">
            <SearchBar placeholder="Rechercher"/>
          </FluidContent>
        </Header>
        <FluidContent></FluidContent>
      </div>
    );
  }
}

export default UserAgreement;
