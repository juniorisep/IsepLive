// @flow

import React, { Component } from 'react';
import styled from 'styled-components';

const Controls = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  background: white;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;

  video {
    width: 100%;
    height: 100%;
  }

  ${Controls} {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
`;

const PlayPause = styled.div`
  width: 20px;
  height: 20px;
  background: red;
`;

const ProgressBar = styled.div`
  border-radius: 20px;
  height: 20px;
  background: red;
`;

class Video extends Component {
  state = {
    isPlaying: false,
    vidLenght: 0,
    currentTime: 0,
  };

  componentDidMount() {
    if (this.video.canPlayType) {
      this.video.controls = false;
      this.video.addEventListener('loadedmetadata', () => {
        this.setState({ vidLenght: this.video.duration });
      });

      this.video.addEventListener('timeupdate', () => {
        this.setState({ currentTime: this.video.currentTime });
      });
    };
  };

  togglePlay = () => {
    if (this.video.paused || this.video.ended) {
      this.video.play();
      this.setState({ isPlaying: true });
    } else {
      this.setState({ isPlaying: false });
      this.video.pause();
    };
  };

  render() {
    const props = this.props;
    const progressStyle = {
      width: ((this.state.currentTime / this.state.vidLenght) * 100) + '%'
    };
    return (
      <Wrapper>
        <video poster={props.poster} ref={(v) => this.video = v} controls preload="metadata">
          <source src={props.source} type="video/mp4" />
        </video>
        <Controls>
          <PlayPause onClick={this.togglePlay}>{this.state.isPlaying
            ? 'p'
            : '>'
          }</PlayPause>
          <progress value={this.state.currentTime} min="0" max={this.state.vidLenght}>
            {/* <ProgressBar style={progressStyle}  /> */}
          </progress>
        </Controls>
      </Wrapper>
    );
  };
};

export default Video;
