// @flow
import React, { Component } from 'react';

import HomeView from './view';

import * as postData from '../../data/post';

class Home extends Component {

  state = {
    posts: [],
  }

  componentDidMount() {
    postData.getPosts().then(res => {
      console.log(res.data);
      this.setState({ posts: res.data });
    })
  }

  render() {
    return (
      <HomeView
        posts={this.state.posts}
      />
    );
  }
}

export default Home;
