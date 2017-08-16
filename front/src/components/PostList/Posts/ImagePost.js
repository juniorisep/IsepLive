import React, { Component } from 'react';

import {Box} from 'grid-styled';

import {
  Post,
  PostTextView,
} from 'components/PostList';

import {
  BgImage,
  ImageLink,
} from 'components/common';

class ImagePost extends Component {
  render() {
    const props = this.props;
    const size = props.preview ? [1] : [1, 1/2];
    return (
      <Post invert={props.invert}>
        <Box w={size}>
          <ImageLink src={props.post.media.fullSizeUrl}>
            <BgImage
              src={
                props.preview ? props.post.media.fullSizeUrl : props.post.media.thumbUrl
              }
              mh={props.preview ? '400px' : '250px'} />
          </ImageLink>
        </Box>
        <PostTextView
          post={props.post}
          refresh={props.refreshPosts}
          w={size}
          preview={props.preview}
        />
      </Post>
    );
  }
}

export default ImagePost;
