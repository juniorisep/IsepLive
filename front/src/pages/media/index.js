// @flow

import React, {Component} from 'react';
import styled from 'styled-components';
import {Flex, Box} from 'grid-styled';

import Button from 'material-ui/Button';
import {FormControlLabel} from 'material-ui/Form';
import Switch from 'material-ui/Switch';

import {
  Separator,
  FluidContent,
  Header,
  SearchBar,
  Filler,
  Banner
} from '../../components/common';

import Gallery from '../../components/Gallery';

const Album = (props) => {
  const AlbumStyle = styled.div `
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    div.image {
      width: 100%;
      height: 200px;
      background: url(${props => props.url});
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
    div.caption {
      padding: 10px;
      color: ${props => props.theme.main};
    }
  `;
  return (
    <AlbumStyle url={props.url} onClick={props.onClick}>
      <div className="image"></div>
      <div className="caption">{props.text}</div>
    </AlbumStyle>
  )
};

const DateSeparator = (props) => {
  const Title = styled.h2 `
    margin-right: 20px;
    color: ${props => props.theme.main};
  `;
  return (
    <Flex align="center">
      <Box flex="0 0 auto" mr="20px">
        <Title>{props.date}</Title>
      </Box>
      <Box flex="1 1 auto">
        <Separator m="0"/>
      </Box>
    </Flex>
  )
}

class Media extends Component {
  state = {
    showGallerie: false,
    photos: true,
    videos: false,
    gazettes: false
  }

  toggleGallerie = () => {
    this.setState({
      showGallerie: !this.state.showGallerie
    })
  }

  handleChange = name => (event, checked) => {
    this.setState({[name]: checked});
  };

  render() {
    return (
      <div>
        <Header url="/img/background.jpg">
          <Filler h={50}/>
          <Banner>
            <h1>Media</h1>
            <p>
              Retrouvez photos, vidéos, gazettes de tous les évenements !
            </p>
          </Banner>
          <FluidContent p="0">
            <SearchBar placeholder="Rechercher des medias"/>
          </FluidContent>
        </Header>
        <FluidContent>
          <Flex align="center" wrap>
            <Box mr="40px">
              <Button color="primary" raised>Trier par</Button>
            </Box>
            <Box>
              <FormControlLabel control={< Switch checked = {
                this.state.photos
              }
              onChange = {
                this.handleChange('photos')
              } />} label="Photos"/>
              <FormControlLabel control={< Switch checked = {
                this.state.videos
              }
              onChange = {
                this.handleChange('videos')
              } />} label="Vidéos"/>
              <FormControlLabel control={< Switch checked = {
                this.state.gazettes
              }
              onChange = {
                this.handleChange('gazettes')
              } />} label="Gazettes"/>
            </Box>
            <Box ml="auto">
              <Button color="primary" raised>Modifier l'affichage</Button>
            </Box>
          </Flex>
          <DateSeparator date="Juillet 2017"/>
          <Flex wrap>
            {'123456789'.split('').map(e => {
              return <Box w={[
                1, 1 / 2,
                1 / 3
              ]} p={2}>
                <Album url="/img/background.jpg" text="New Album" onClick={this.toggleGallerie}/>
              </Box>
            })
}
          </Flex>
          <DateSeparator date="Aout 2017"/>
          <Flex wrap>
            {'123'.split('').map(e => {
              return <Box w={[
                1, 1 / 2,
                1 / 3
              ]} p={2}>
                <Album url="/img/background.jpg" text="New Album"/>
              </Box>
            })
}
          </Flex>
        </FluidContent>
        <Gallery visible={this.state.showGallerie} onEscKey={this.toggleGallerie}/>
      </div>
    );
  }
}

export default Media;
