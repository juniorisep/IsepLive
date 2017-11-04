// @flow

import React, { Component } from 'react';

import * as studentData from 'data/users/student';

import AdressbookDetailView from './view'
import Loader from '../../../components/Loader';

class AdressbookDetail extends Component {
  state = {
    id: this.props.match.params.id,
    data: null,
    posts: [],
  };

  componentDidMount() {
    this.getUserData();
    this.refreshPosts();
  };

  getUserData = async () => {
    const { data } = await studentData.getStudent(this.state.id);
    this.setState({ data });
  };

  refreshPosts = async () => {
    const { data } = await studentData.getPosts(this.state.id);
    this.setState({ posts: data });
  };

  render() {
    return (
      <Loader loading={!this.state.data}>
        <AdressbookDetailView
          data={this.state.data}
          posts={this.state.posts}
          refreshPosts={this.refreshPosts} />
      </Loader>
    );
  };
};

export default AdressbookDetail;
