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
    mediaData.getAllMedia().then(res => {
      console.log(res);
      this.setState({ medias: res.data });
    })
  }

  render() {
    return (
      <MediaView medias={this.state.medias} />
    );
  }
}

export default Media;
