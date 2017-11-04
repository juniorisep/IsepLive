// @flow

import React, { Component } from 'react';

import { Banner, Filler, Header } from 'components/common';

class NotFound extends Component {
  render() {
    return (
      <div>
        <Header url="/img/404.jpg">
          <Filler h={152} />
          <Banner>
            <h1>404</h1>
            <p>Il semblerait que tu te sois aventuré un peu trop loin...</p>
          </Banner>
          <Filler h={152} />
        </Header>
      </div>
    );
  };
};

export default NotFound;
