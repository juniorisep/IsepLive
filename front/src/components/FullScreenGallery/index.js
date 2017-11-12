// @flow

import React, { Component } from 'react';
import styled from 'styled-components';

import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

import SlideShow from 'components/SlideShow';
import { backUrl } from 'config';

import PeopleMatcher from './PeopleMatcher';

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
  height: 80vh;
  margin: 5vh;
`;


class Gallery extends Component {
  state = {
    currentIndex: 0,
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyHandler);
  };

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyHandler);
  };

  componentWillReceiveProps(props) {
    document.body.style.overflow = props.visible ? 'hidden' : 'auto';

    if (props.index != this.state.currentIndex) {
      this.setState({ currentIndex: props.index });
    }

  }

  keyHandler = ({ key }) => {
    if (key === 'Escape') {
      this.props.onEscKey();
    };
  };

  updateIndex = (index) => {
    this.setState({ currentIndex: index });
  }

  render() {
    const { visible, gallery, index } = this.props;
    if (!visible) return null;
    return (
      <Wrapper visible={visible}>
        <IconButton
          style={{ float: 'right', color: 'white' }}
          onClick={() => this.props.onEscKey()}>
          <CloseIcon />
        </IconButton>
        <GalleryStyle>
          <SlideShow
            handleKey
            coverMode="contain"
            initPos={index}
            onChange={this.updateIndex}
            items={
              gallery.images.map(img => backUrl + img.fullSizeUrl)
            }
            duration={5} />
        </GalleryStyle>
        <PeopleMatcher
          image={gallery.images[this.state.currentIndex]}
          refreshGallery={this.props.refreshGallery} />
      </Wrapper>
    );
  };
};

export default Gallery;
