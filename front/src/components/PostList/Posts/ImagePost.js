// @flow

import React, { Component } from 'react';

import { Box } from 'grid-styled';

import { Post, PostTextView } from 'components/PostList';

import { BgImage, Paper } from 'components/common';

class ImagePost extends Component {
  render() {
    const props = this.props;
    const size = props.preview ? [1] : [1, 1 / 2];
    return (
      <Post invert={props.invert}>
        <Box w={size}>
          <Paper>
            <BgImage
              onClick={() => {
                if (!props.preview) {
                  props.openFullScreen(true, props.post.media)
                }
              }}
              style={{ cursor: !props.preview ? 'pointer' : 'normal' }}
              src={
                props.preview ? props.post.media.fullSizeUrl : props.post.media.thumbUrl
              }
              mh={props.preview ? '400px' : '250px'} />
          </Paper>
        </Box>
        <PostTextView
          post={props.post}
          refresh={props.refresh}
          w={size}
          canPin={props.canPin}
          preview={props.preview}
          modify={props.modify}
        />
      </Post>
    );
  };
};

export default ImagePost;
