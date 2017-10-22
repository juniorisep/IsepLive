// @flow

import React, { Component } from 'react';

import MediaView from './view';

import * as mediaData from 'data/media';

class Media extends Component {

  state = {
    medias: [],
    isLoading: false,
  }

  componentDidMount() {
    this.requestMedia();
  }

  requestMedia() {
    mediaData.getAllGroupedMedia().then(medias => {
      this.setState({ medias: medias, isLoading: false });
    })
  }

  render() {
    return (
      <MediaView
        medias={this.state.medias}
        isLoading={this.state.isLoading} />
    );
  }
}

export default Media;
