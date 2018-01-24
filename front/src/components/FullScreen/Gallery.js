// @flow

import React, { Component } from 'react';
import styled from 'styled-components';

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import FileDownload from 'material-ui-icons/FileDownload';
import PlayIcon from 'material-ui-icons/PlayArrow';
import PauseIcon from 'material-ui-icons/Pause';

import ArrRight from 'material-ui-icons/ChevronRight';
import ArrLeft from 'material-ui-icons/ChevronLeft';

import Auth from '../Auth/AuthComponent';

import SlideShow from 'components/SlideShow';
import { backUrl } from 'config';

import PeopleMatcher from './PeopleMatcher';
import * as imageData from '../../data/media/image';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.95);
  top: 0;
  left: 0;
  z-index: 1100;
  overflow: auto;
`;

const GalleryStyle = styled.div`
  position: relative;
  height: 80vh;
  margin: 5vh;
`;


class Gallery extends Component {
  state = {
    currentIndex: 0,
    matcherOpen: false,
    isPlaying: false,
  }

  componentWillUnmount() {
    this.removeEscListener();
  }

  openMatcher = (open) => {
    this.setState({ matcherOpen: open })
  }

  removeEscListener() {
    document.removeEventListener('keydown', this.keyHandler);
  }

  componentWillReceiveProps(props) {
    if (!props.visible) {
      this.removeEscListener();
      this.setState({ isPlaying: false });
    } else {
      document.addEventListener('keydown', this.keyHandler);
    }

    document.body.style.overflow = props.visible ? 'hidden' : 'auto';

    if (props.index !== this.state.currentIndex) {
      this.setState({ currentIndex: props.index });
    }

  }

  keyHandler = ({ key }) => {
    if (key === 'Escape' && !this.state.matcherOpen) {
      this.props.onEscKey();
    };
  };

  updateIndex = (index) => {
    this.setState({ currentIndex: index });
  }

  togglePlay = () => {
    this.setState({ isPlaying: !this.state.isPlaying });
  }

  render() {
    const lightButton = {
      color: 'white',
      background: 'rgba(255,255,255,0.1)',
      marginRight: 10,
    }

    const { visible, images, index } = this.props;
    if (!visible) return null;
    return (
      <Wrapper visible={visible}>
        <IconButton
          style={{
            float: 'right',
            top: 20,
            right: 20,
            color: 'white'
          }}
          onClick={() => this.props.onEscKey()}>
          <CloseIcon />
        </IconButton>
        <GalleryStyle>
          <SlideShow
            handleKey
            showControls
            play={this.state.isPlaying}
            coverMode="contain"
            initPos={index}
            onChange={this.updateIndex}
            items={
              images.map(img => backUrl + img.fullSizeUrl)
            }
            duration={5} />
        </GalleryStyle>
        {
          images.length > 0 &&
          <div style={{ margin: 30 }}>
            <Button
              style={lightButton}
              download
              dense
              href={backUrl + images[this.state.currentIndex].originalUrl}>
              <FileDownload style={{ marginRight: 5 }} /> Télecharger
            </Button>
            {
              this.state.isPlaying ?
              <Button style={lightButton} dense onClick={this.togglePlay}>
                <PauseIcon style={{ marginRight: 5 }} /> Pause
              </Button>
              :
              <Button style={lightButton} dense onClick={this.togglePlay}>
                <PlayIcon style={{ marginRight: 5 }} /> Lecture
              </Button>
            }
            {
              !this.state.isPlaying &&
              <Auth logged>
                <PeopleMatcher
                  onOpenMatcher={this.openMatcher}
                  image={images[this.state.currentIndex]} />
              </Auth>
            }
          </div>
        }
      </Wrapper>
    );
  };
};

export default Gallery;
