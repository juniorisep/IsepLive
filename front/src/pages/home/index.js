// @flow

import React, {Component} from 'react';

import HomeView from './view';

import * as postData from '../../data/post';

class Home extends Component {

  state = {
    posts: [],
    page: 0,
    lastPage: false
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    postData.getPosts(this.state.page).then(res => {
      this.setState({
        posts: this.state.posts.concat(res.data.content),
        page: this.state.page + 1,
        lastPage: res.data.last
      });
    })
  }

  seeMore = () => {
    this.getPosts();
  }

  refreshPosts = () => {
    postData.getPosts(0).then(res => {
      this.setState({posts: res.data.content, page: 1, lastPage: res.data.last});
    })
  }

  handleLike = (post) => {
    if (!post.isLiked) {
      postData.likePost(post.id)
      .then(this.refreshPosts);
    }
  }

  render() {
    return (
      <HomeView
        posts={this.state.posts}
        lastPage={this.state.lastPage}
        onSeeMore={this.seeMore}
        refreshPosts={this.refreshPosts}
        handleLike={this.handleLike}        
      />
    );
  }
}

export default Home;
