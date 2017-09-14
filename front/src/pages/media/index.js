// @flow
import React, {Component} from 'react';

import MediaView from './view';

import * as mediaData from 'data/media';

class Media extends Component {

  state = {
    medias: [],
  }

  componentDidMount() {
    this.requestMedia();
  }

  requestMedia() {
    mediaData.getAllGroupedMedia().then(medias => {
      console.log(medias);
      this.setState({ medias: medias });
    })
  }

  render() {
    return (
      <MediaView medias={this.state.medias} />
    );
  }
}

export default Media;
