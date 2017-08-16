// @flow
import React, { Component } from 'react';

import PostDetailView from './view';
import * as postData from 'data/post';

class PostDetail extends Component {

  state = {
    post: null,
    comments: [],
  }

  componentDidMount() {
    this.postId = this.props.match.params.id;
    this.refresh();
  }

  refresh = () => {
    postData.getPost(this.postId)
    .then(res => {
      this.setState({ post: res.data });
    })
  }

  toggleLike = () => {
    postData.toggleLikePost(this.postId);
  }

  render() {
    return (
      <PostDetailView
        post={this.state.post}
        comments={this.state.comments}
        refresh={this.refresh}
        toggleLike={this.toggleLike}
      />
    );
  }
}

export default PostDetail;
