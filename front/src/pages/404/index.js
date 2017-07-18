// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import {
  FluidContent,
  Header,
  Filler,
  Banner,
} from '../../components/common';

import { MAIN_COLOR, SECONDARY_COLOR } from '../../colors';

class NotFound extends Component {
  render() {
    return (
      <div>
        <Header url="img/background.jpg">
          <Filler h={50} />
          <Banner>
            <h1>404</h1>
            <p>Un lendemain de soirée trop dur ?</p>
          </Banner>
        </Header>
        <FluidContent>
          <h1>Mettre un truc rigolo ici</h1>
        </FluidContent>
      </div>
    );
  }
}

export default NotFound;
