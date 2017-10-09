// @flow

import React, { Component } from 'react';

import {
  Post,
  PostTextView,
} from 'components/PostList';

class TextPost extends Component {
  render() {
    const props = this.props;
    return (
      <Post invert={props.invert}>
        <PostTextView
          refresh={props.refresh}
          post={props.post}
          w={[1]}
          preview={props.preview}/>
      </Post>
    );
  }
}

export default TextPost;
