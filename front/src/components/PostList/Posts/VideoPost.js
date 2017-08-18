import React, { Component } from 'react';
import {Flex, Box} from 'grid-styled';
import {
  Post,
  PostTextView,
} from 'components/PostList';

import {
  Video,
} from 'components/common';

class VideoPost extends Component {
  render() {
    const props = this.props;
    const size = props.preview ? [1] : [1, 1/2];
    return (
      <Post invert={props.invert}>
        <Box w={size}>
          <Video url={props.post.media.url} />
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

export default VideoPost;
