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
    this.refreshPost();
    this.refreshCom();
    this.autoRefresh = setInterval(() => {
      this.refreshCom();
    }, 30000);
  };

  componentWillUnmount() {
    clearInterval(this.autoRefresh);
  };

  refreshPost = () => {
    postData.getPost(this.postId)
      .then(res => {
        this.setState({ post: res.data });
      });
  };
  refreshCom = () => {
    postData.getComments(this.postId)
      .then(res => this.setState({ comments: res.data }))
  };

  toggleLikeCom = (comId: number) => {
    postData.toggleLikeComment(this.postId, comId);
  };

  showLikes = (comId: number) => e => {
    return postData.getLikes('comment', comId);
  }

  comment = (message: string) => {
    postData.comment(this.postId, message)
      .then(this.refreshCom);
  };

  render() {
    return (
      <PostDetailView
        post={this.state.post}
        comments={this.state.comments}
        refresh={this.refreshPost}
        toggleLikeCom={this.toggleLikeCom}
        showLikes={this.showLikes}
        onComment={this.comment}
      />
    );
  };
};

export default PostDetail;
