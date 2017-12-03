// @flow

import React, { Component } from 'react';

import { Box } from 'grid-styled';

import Poll from 'components/Poll';

import { Post, PostTextView } from 'components/PostList';

class PollPost extends Component {
  render() {
    const props = this.props;
    const size = props.preview ? [1] : [1, 1 / 2];
    return (
      <Post invert={props.invert}>
        <Box w={size}>
          <Poll data={props.post.media} />
        </Box>
        <PostTextView
          post={props.post}
          preview={props.preview}
          refresh={props.refresh}
          modify={props.modify}
          canPin={props.canPin}
          w={size} />
      </Post>
    );
  };
};

export default PollPost;
