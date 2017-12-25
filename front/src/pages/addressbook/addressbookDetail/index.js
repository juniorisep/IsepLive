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
    page: 0,
    lastPage: false,
    clubMembers: [],
    fullscreenOpen: false,
  };

  componentDidMount() {
    this.getUserData();
    this.refreshPosts();
    this.getClubMembers();
  };

  getUserData = async () => {
    const { data } = await studentData.getStudent(this.state.id);
    this.setState({ data });
  };

  refreshPosts = async () => {
    const { data } = await studentData.getPosts(this.state.id, 0);
    this.setState({
      posts: data.content,
      page: 1,
      lastPage: data.last,
    });
  };

  getNextPosts = async () => {
    const { data } = await studentData.getPosts(this.state.id, this.state.page);
    this.setState({
      posts: this.state.posts.concat(data.content),
      page: this.state.page + 1,
      lastPage: data.last,
    });
  }

  getClubMembers = () => {
    studentData.getClubMembers(this.state.id).then(res => {
      this.setState({ clubMembers: res.data });
    })
  }

  setFullScreen = (open) => e => {
    this.setState({ fullscreenOpen: open });
  }

  render() {
    return (
      <Loader loading={!this.state.data}>
        <AdressbookDetailView
          data={this.state.data}
          lastPage={this.state.lastPage}
          posts={this.state.posts}
          fullscreenOpen={this.state.fullscreenOpen}
          clubMembers={this.state.clubMembers}
          refreshPosts={this.refreshPosts}
          onSeeMore={this.getNextPosts}
          setFullScreen={this.setFullScreen} />
      </Loader>
    );
  };
};

export default AdressbookDetail;
