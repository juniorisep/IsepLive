// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'grid-styled';

import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

import { Link } from 'react-router-dom';

import Time from 'components/Time';
import Loader from 'components/Loader';
import { Banner, Filler, FluidContent, Header, SearchBar, Separator, Text } from 'components/common';

import { MAIN_COLOR } from '../../colors';


import { Album, Video, Gazette } from './mediaViews';


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

const STYLE_CONTAINER = {
  display: 'flex',
  flexWrap: 'wrap',
};

const STYLE_FORMCONTROL = {
  minWidth: 120,
  maxWidth: 300,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const now = new Date().getFullYear();
let years = [];
for (var i = 1; i < 6; i++) {
  years.push(now + i);
};

class MediaView extends Component {
  state = {
    photos: true,
    videos: true,
    gazettes: true,
    year: [],
  };

  handleChange = name => (event, checked) => {
    this.setState({ [name]: checked });
  };

  filterMedia(mediaType) {
    const { photos, videos, gazettes } = this.state;
    switch (mediaType) {
      case 'gallery':
        return photos;
      case 'video':
        return videos;
      case 'gazette':
        return gazettes;
    };
    return true;
  };

  processMediaList() {
    return this.props.medias.map(mg => {
      const medias = mg.medias.filter(m => this.filterMedia(m.mediaType));
      return { ...mg, medias };
    }).filter(mg => mg.medias.length > 0);
  };

  renderMediaComponent(e) {
    /* <Link to={`/post/${e.postId}`}> */
    /* </Link> */
    switch (e.mediaType) {
      case 'video':
        return (
          <Link to={`/post/${e.postId}`}>
            <Video {...e} />
          </Link>
        )
      case 'gallery':
        return (
          <Album
            url={e.coverImage.thumbUrl}
            {...e} />
        )
      case 'gazette':
        return (
          <Link to={`/post/${e.postId}`}>
            <Gazette {...e} />
          </Link>
        )
    }
    return;
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
                  checked={this.state.photos}
                  onChange={this.handleChange('photos')}
                />
              } label="Photos" />
              <FormControlLabel control={
                <Switch
                  checked={this.state.videos}
                  onChange={this.handleChange('videos')} />
              } label="Vidéos" />
              <FormControlLabel control={
                <Switch
                  checked={this.state.gazettes}
                  onChange={this.handleChange('gazettes')} />
              } label="Gazettes" />
            </Box>
            <Box mb={2}>
              <div style={STYLE_CONTAINER}>
                <FormControl style={STYLE_FORMCONTROL}>
                  <InputLabel htmlFor="year-multiple">Années</InputLabel>
                  <Select
                    multiple
                    value={this.state.year}
                    onChange={this.handleChange}
                    input={<Input id="year-multiple" />}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                          width: 200,
                        },
                      },
                    }}
                  >
                    {years.map(year => (
                      <MenuItem
                        key={year}
                        value={year}
                        style={{
                          fontWeight: this.state.year.indexOf(year) !== -1 ? '500' : '400',
                        }}
                      >
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Sélection multiple</FormHelperText>
                </FormControl>
              </div>
            </Box>
          </Flex>
          <Loader loading={this.props.isLoading}>
            {
              this.processMediaList().length === 0 &&
              <div style={{ textAlign: 'center' }}>
                <Text>Aucun media</Text>
              </div>
            }
            {
              this.processMediaList().map(m => {
                return (
                  <div key={m.date}>
                    <DateSeparator date={<Time date={m.date} format="MMMM YYYY" />} />
                    <Flex wrap>
                      {
                        m.medias.map(e => {
                          return (
                            <Box key={e.id} w={[1, 1 / 2, 1 / 3]} p={2}>
                              {this.renderMediaComponent(e)}
                            </Box>
                          )
                        })
                      }
                    </Flex>
                  </div>
                )
              })
            }
          </Loader>
          {
            !this.props.lastPage &&
            <div style={{ textAlign: 'center' }}>
              <Button color="accent" onClick={this.props.seeMore}>Voir plus</Button>
            </div>
          }
        </FluidContent>
      </div>
    );
  };
};

export default MediaView;
