// @flow

import React, { Component } from 'react';

import HomeView from './view';

import * as postData from 'data/post';

class Home extends Component {
  state = {
    posts: [],
    pinnedPosts: [],
    page: 0,
    lastPage: false,
    isLoading: true,
  };

  componentDidMount() {
    this.getPosts();
    this.getPinnedPosts();
    document.addEventListener('new-post', this.refreshPosts.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('new-post', this.refreshPosts.bind(this));
  }

  getPosts() {
    if (this.state.page === 0) {
      this.setState({ isLoading: true });
    }
    postData.getPosts(this.state.page).then(res => {
      this.setState({
        isLoading: false,
        posts: this.state.posts.concat(res.data.content),
        page: this.state.page + 1,
        lastPage: res.data.last
      });
    });
  }

  getPinnedPosts = async () => {
    let res = await postData.getPinnedPosts();
    this.setState({ pinnedPosts: res.data });
  };

  seeMore = () => {
    this.getPosts();
  };

  refreshPosts = () => {
    postData.getPosts(0).then(res => {
      this.setState({
        posts: res.data.content,
        page: 1,
        lastPage: res.data.last
      });
    });
    this.getPinnedPosts();
  };

  render() {
    return (
      <HomeView
        posts={this.state.posts}
        pinnedPosts={this.state.pinnedPosts}
        lastPage={this.state.lastPage}
        onSeeMore={this.seeMore}
        refreshPosts={this.refreshPosts}
        isLoading={this.state.isLoading}
      />
    );
  }
}

export default Home;
