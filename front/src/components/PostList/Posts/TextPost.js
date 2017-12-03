// @flow

import React, { Component } from 'react';

import { Post, PostTextView } from 'components/PostList';

class TextPost extends Component {
  render() {
    const props = this.props;
    return (
      <Post invert={props.invert}>
        <PostTextView
          post={props.post}
          w={[1]}
          preview={props.preview}
          refresh={props.refresh}
          canPin={props.canPin}
          modify={props.modify} />
      </Post>
    );
  };
};

export default TextPost;
