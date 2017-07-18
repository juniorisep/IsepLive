// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import { MAIN_COLOR, SECONDARY_COLOR } from '../../colors';

import {
  Header,
  Filler,
  Banner,
} from '../../components/common';

class NotFound extends Component {
  render() {
    return (
      <div>
        <Header url="img/404.jpg">
          <Filler h={152} />
          <Banner>
            <h1>404</h1>
            <p>Il semblerait que tu te sois aventuré un peu trop loin...</p>
          </Banner>
          <Filler h={152} />
        </Header>
      </div>
    );
  }
}

export default NotFound;
