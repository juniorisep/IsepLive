// @flow

import React, { Component } from 'react';

import PostDetailView from './view';
import * as postData from 'data/post';
import * as studentData from 'data/users/student';

class PostDetail extends Component {
  state = {
    post: null,
    comments: [],
    commenter: null,

    modifyEnable: false,
  }

  componentDidMount() {
    this.postId = this.props.match.params.id;
    this.refreshPost();
    this.refreshCom();
    this.getCommenter();
    this.autoRefresh = setInterval(() => {
      this.refreshCom();
    }, 30000);
  };

  componentWillUnmount() {
    clearInterval(this.autoRefresh);
  };

  getCommenter() {
    studentData.getLoggedUser().then(res => {
      this.setState({ commenter: res.data });
    })
  }

  refreshPost = (reason) => {
    if (reason === 'delete') {
      this.props.history.push('/');
      return;
    }
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

  modifyPost = (postModified) => {
    this.setState({ post: postModified, modifyEnable: true })
  };
  requestClose = () => {
    this.setState({ modifyEnable: false })
  };

  render() {
    return (
      <PostDetailView
        post={this.state.post}
        comments={this.state.comments}
        commenter={this.state.commenter}
        modifyEnable={this.state.modifyEnable}

        refresh={this.refreshPost}
        toggleLikeCom={this.toggleLikeCom}
        showLikes={this.showLikes}
        onComment={this.comment}
        modifyPost={this.modifyPost}
        requestClose={this.requestClose}
      />
    );
  };
};

export default PostDetail;
