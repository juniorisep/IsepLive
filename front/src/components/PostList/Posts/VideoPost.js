// @flow

import React, { Component } from 'react';
import { Box } from 'grid-styled';
import { Post } from 'components/PostList';

import { Video, Paper } from 'components/common';

class VideoPost extends Component {
  render() {
    const props = this.props;
    const size = props.preview ? [1] : [1, 1 / 2];
    return (
      <Post invert={props.invert}>
        <Box w={size}>
          <Paper>
            <Video url={props.post.media.url} />
          </Paper>
        </Box>
        {props.textView(size)}
      </Post>
    );
  }
}

export default VideoPost;
