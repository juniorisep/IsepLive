// @flow

import React, { Component } from 'react';
import { Box } from 'grid-styled';
import { GridList, GridListTile } from 'material-ui/GridList';

import styled from 'styled-components';

import {
  Post,
  PostTextView,
} from 'components/PostList';

import {
  BgImage,
  Paper,
} from 'components/common';

const Header = styled.div`
  color: ${props => props.theme.accent};
  padding: 15px;
  font-size: 1.4em;
  font-weight: bold;
`;

const Gallery = styled.div`
  margin: 10px;
  min-height: 300px;
`;


class GalleryPost extends Component {

  render() {
    const props = this.props;
    const size = props.preview ? [1] : [1, 1 / 2];
    const cols = props.preview ? 5 : 3;
    return (
      <Post invert={props.invert}>
        <Box w={size}>
          <Paper style={{ height: '100%' }}>
            <Header>{props.post.media.name}</Header>
            <Gallery>
              <GridList cellHeight={160} cols={cols}>
                {
                  props.post.media.images.map(img => (
                    <GridListTile key={img.id} cols={1}>
                      <BgImage src={img.thumbUrl} alt="image" />
                    </GridListTile>
                  ))
                }
              </GridList>
            </Gallery>
          </Paper>
        </Box>
        <PostTextView
          refresh={props.refresh}
          post={props.post}
          w={size}
          preview={props.preview} />
      </Post>
    );
  }
}

export default GalleryPost;
