import React from 'react';

import { Flex, Box } from 'grid-styled';

import {
  Title,
  FluidContent,
  Image,
  Filler,
  Text,
  ScrollToTopOnMount,
} from '../../components/common';

import Gallery from '../../components/Gallery';
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
    this.galleryId = this.props.match.params.id;
    this.getGallery()
  }

  getGallery() {
    this.setState({ isLoading: true });
    mediaData.getGallery(this.galleryId)
      .then(res => {
        this.setState({ gallery: res.data, isLoading: false });
      })
  }

  showGallery = () =>
    this.setState({ galleryOpen: true })

  hideGallery = () =>
    this.setState({ galleryOpen: false })

  selectPhoto = index => e => {
    // alert(img.id)
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
                          <Image w="100%" src={img.thumbUrl} style={{ cursor: 'pointer' }} onClick={this.selectPhoto(index)} />
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

        <Gallery
          index={galleryIndex}
          visible={galleryOpen}
          gallery={gallery}
          onEscKey={this.hideGallery} />
      </FluidContent>
    );
  }

}