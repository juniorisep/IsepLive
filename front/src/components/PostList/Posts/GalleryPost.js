// @flow

import React, { Component } from 'react';
import {Box} from 'grid-styled';
import styled from 'styled-components';
import {
  Post,
  PostTextView,
} from 'components/PostList';

import {
  BgImage,
} from 'components/common';

const Header = styled.div`
  color: ${props => props.theme.accent};
  padding: 15px;
  font-size: 1.4em;
  font-weight: bold;
`;

const Gallery = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  height: 300px;
  margin: 5px;
`;

const WrapImage = styled.div`
  width: 33%;
  height: 33%;
  margin: 5px;
`;

class GalleryPost extends Component {
  render() {
    const props = this.props;
    const size = props.preview ? [1] : [1, 1/2];
    return (
      <Post invert={props.invert}>
        <Box w={size}>
          <Header>{props.post.media.name}</Header>
          <Gallery>
            {
              props.post.media.images.map(img => {
                return (
                  <WrapImage>
                    <BgImage src={img.thumbUrl} />
                  </WrapImage>
                );
              })
            }
          </Gallery>
        </Box>
        <PostTextView
          refresh={props.refresh}
          post={props.post}
          w={size}
          preview={props.preview}/>
      </Post>
    );
  }
}

export default GalleryPost;
