// @flow

import React, {Component} from 'react';
import styled from 'styled-components';
import {Box, Flex} from 'grid-styled';

import Button from 'material-ui/Button';
import {FormControlLabel} from 'material-ui/Form';
import Switch from 'material-ui/Switch';

import {Link} from 'react-router-dom';

import Time from 'components/Time';

import {
  Banner,
  Filler,
  FluidContent,
  Header,
  SearchBar,
  Separator,
  Title
} from 'components/common';

import Gallery from 'components/Gallery';

import { Album, Video } from './mediaViews';


const DateSeparator = (props) => {
  const Title = styled.h2`
    margin-right: 20px;
    color: ${props => props.theme.main};
    text-transform: capitalize;
  `;
  return (
    <Flex align="center">
      <Box flex="0 0 auto" mr="20px">
        <Title>{props.date}</Title>
      </Box>
      <Box flex="1 1 auto">
        <Separator m="0" />
      </Box>
    </Flex>
  );
};

class MediaView extends Component {
  state = {
    showGallerie: false,
    photos: true,
    videos: true,
    gazettes: true,
  };

  toggleGallerie = () => {
    this.setState({
      showGallerie: !this.state.showGallerie
    });
  };

  handleChange = name => (event, checked) => {
    this.setState({[name]: checked});
  };

  filterMedia(mediaType) {
    const  { photos, videos, gazettes } = this.state;
    switch (mediaType) {
      case 'gallery':
        return photos;
      case 'video':
        return videos;
      case 'gazettes':
        return gazettes;
    }
    return true;
  }

  processMediaList() {
    return this.props.medias.map(mg => {
      const medias = mg.medias.filter(m => this.filterMedia(m.mediaType));
      return { ...mg, medias };
    }).filter(mg => mg.medias.length > 0)
  }

  render() {
    return (
      <div>
        <Header url="/img/background.jpg">
          <Filler h={50} />
          <Banner>
            <h1>Media</h1>
            <p>
              Retrouvez photos, vidéos, gazettes de tous les évenements !
            </p>
          </Banner>
          <FluidContent p="0">
            <SearchBar placeholder="Rechercher des medias" />
          </FluidContent>
        </Header>
        <FluidContent>
          <Flex align="center" wrap>
            <Box mb={2}>
              <FormControlLabel control={
                <Switch
                  checked={ this.state.photos }
                  onChange={ this.handleChange('photos') }
                />
              } label="Photos" />
              <FormControlLabel control={
                <Switch
                  checked={this.state.videos}
                  onChange={ this.handleChange('videos') } />
              } label="Vidéos" />
              <FormControlLabel control={
                <Switch
                  checked={ this.state.gazettes }
                  onChange={ this.handleChange('gazettes') } />
              } label="Gazettes" />
            </Box>
          </Flex>

          {
            this.processMediaList().map(m => {
              return (
                <div key={m.date}>
                  <DateSeparator date={<Time date={m.date} format="MMMM YYYY" />} />
                  <Flex wrap>
                    {
                      m.medias.map(e => {
                        return <Box key={e.id} w={[ 1, 1 / 2, 1 / 3 ]} p={2}>
                          <Link to={`/post/${e.postId}`}>
                            { e.mediaType == 'video' && <Video {...e} /> }
                            { e.mediaType == 'gallery' && <Album url="/img/background.jpg" {...e} /> }
                          </Link>
                        </Box>
                      })
                    }
                  </Flex>
                </div>
              )
            })
          }
        </FluidContent>
        <Gallery visible={this.state.showGallerie} onEscKey={this.toggleGallerie} />
      </div>
    );
  };
};

export default MediaView;
