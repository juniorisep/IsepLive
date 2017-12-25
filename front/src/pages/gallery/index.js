// @flow

import React from 'react';

import { Flex, Box } from 'grid-styled';
import { Link } from 'react-router-dom';

import {
  Title,
  FluidContent,
  Image,
  Filler,
  Text,
  ScrollToTopOnMount,
} from '../../components/common';

import FullScreenGallery from '../../components/FullScreen/Gallery';
import Loader from '../../components/Loader';
import Time from '../../components/Time';

import * as mediaData from '../../data/media/image';


export default class GalleryPage extends React.Component {

  state = {
    isLoading: false,
    gallery: null,
    galleryOpen: false,
    galleryIndex: 0,
  }

  componentDidMount() {
    const { match, history } = this.props;
    this.galleryId = match.params['id'];
    if (history.location.state) {
      this.photoId = history.location.state['imageId'];
    }
    this.getGallery()
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }

  getGallery() {
    this.setState({ isLoading: true });
    mediaData.getGallery(this.galleryId)
      .then(res => {
        this.setState({ gallery: res.data, isLoading: false });

        if (this.photoId) {
          const index = res.data.images.findIndex(e => e.id === this.photoId);
          this.selectPhoto(index);
        }
      })
  }

  refreshGallery = () => {
    mediaData.getGallery(this.galleryId)
      .then(res => {
        this.setState({ gallery: res.data });
      })
  }

  componentWillReceiveProps(props) {
    if (props.history.location.state) {
      const photoId = props.history.location.state.imageId;
      const index = this.state.gallery.images.findIndex(e => e.id === photoId);
      this.selectPhoto(index);
    }
  }


  showGallery = () =>
    this.setState({ galleryOpen: true })

  hideGallery = () => {
    this.refreshGallery();
    this.props.history.location.state = null;
    this.setState({ galleryOpen: false })
  }

  selectPhoto = index => {
    this.setState({ galleryIndex: index })
    this.showGallery();
  }


  render() {
    const {
      isLoading,
      gallery,
      galleryOpen,
      galleryIndex,
    } = this.state;
    return (
      <FluidContent>
        <ScrollToTopOnMount />
        <Title invert fontSize={1}>GALLERIE</Title>
        <Loader loading={isLoading}>
          {
            gallery &&
            <div>
              <Title>{gallery.name}</Title>
              <Text>Créée le <Time date={gallery.creation} format="DD/MM/YYYY [à] HH:mm" /></Text>
              <Flex wrap style={{ marginTop: 30 }}>
                {
                  gallery && gallery.images.map((img, index) => {
                    return (
                      <Box key={img.id} w={[1 / 2, 1 / 4, 1 / 6]} p={1}>
                        <Flex align="center" style={{ height: '100%' }}>
                          <Link to={{
                            pathname: '/gallery/' + gallery.id,
                            state: { imageId: img.id }
                          }}>
                            <Image w="100%" src={img.thumbUrl} style={{ cursor: 'pointer' }} />
                          </Link>
                        </Flex>
                      </Box>
                    );
                  })
                }
              </Flex>
            </div>
          }
        </Loader>

        <Filler h={300} />

        <FullScreenGallery
          index={galleryIndex}
          visible={galleryOpen}
          gallery={gallery}
          onEscKey={this.hideGallery} />
      </FluidContent>
    );
  }

}
