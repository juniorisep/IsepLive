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

import LazyLoad from 'react-lazyload';

import * as mediaData from '../../data/media/image';

const ImagePlaceholder = () => (
  <div style={{
    background: '#EEE',
    height: 130,
  }}></div>
)

export default class GalleryPage extends React.Component {

  state = {
    isLoading: false,
    gallery: null,
    galleryOpen: false,
    galleryIndex: 0,
    images: [],
  }

  galleryId: number;
  photoId: number;

  componentDidMount() {
    const { match, history } = this.props;
    this.galleryId = match.params['id'];
    if (history.location.state) {
      this.photoId = history.location.state['imageId'];
    }
    this.getGallery();
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }

  async getGallery() {
    this.setState({ isLoading: true });
    const galleryRes = await mediaData.getGallery(this.galleryId);
    const imagesRes = await mediaData.getGalleryImages(this.galleryId);
    this.setState({ 
      images: imagesRes.data, 
      gallery: galleryRes.data, 
      isLoading: false 
    });
    if (this.photoId) {
      const index = imagesRes.data.findIndex(e => e.id === this.photoId);
      this.selectPhoto(index);
    }
  }

  refreshGallery = () => {
    mediaData.getGalleryImages(this.galleryId)
      .then(res => {
        this.setState({ images: res.data });
      })
  }

  componentWillReceiveProps(props) {
    if (props.history.location.state) {
      const photoId = props.history.location.state.imageId;
      const index = this.state.images.findIndex(e => e.id === photoId);
      this.selectPhoto(index);
    }
  }


  showGallery = () =>
    this.setState({ galleryOpen: true })

  hideGallery = () => {
    this.refreshGallery();
    this.props.history.replace({
      ...this.props.history.location,
      state: null,
    })
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
      images,
    } = this.state;
    return (
      <FluidContent>
        <ScrollToTopOnMount />
        <Title invert fontSize={1}>GALERIE</Title>
        <Loader loading={isLoading}>
          {
            gallery &&
            <div>
              <Title>{gallery.name}</Title>
              <Text mb={1}>
                Créée le <Time date={gallery.creation} format="DD/MM/YYYY [à] HH:mm" />
              </Text>
              <Text fs="13px">
                {images.length} images
              </Text>
              <Flex wrap style={{ marginTop: 30 }}>
                {
                  images.map((img, index) => {
                    return (
                      <Box key={img.id} w={[1 / 2, 1 / 4, 1 / 5]} p={1}>
                        <LazyLoad height="130px" offsetTop={200} once placeholder={<ImagePlaceholder />}>
                          <Flex align="center" style={{ height: '100%' }}>
                            <Link to={{
                              pathname: '/gallery/' + gallery.id,
                              state: { imageId: img.id }
                            }} style={{ width: '100%' }}>
                              <Image w="100%" src={img.thumbUrl} />
                            </Link>
                          </Flex>
                        </LazyLoad>
                      </Box>
                    );
                  })
                }
              </Flex>
            </div>
          }
        </Loader>

        <FullScreenGallery
          index={galleryIndex}
          visible={galleryOpen}
          images={images}
          onEscKey={this.hideGallery} />
      </FluidContent>
    );
  }

}
