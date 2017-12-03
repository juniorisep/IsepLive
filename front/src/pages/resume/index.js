// @flow

import React, { Component } from 'react';

import * as userData from '../../data/users/student';
import * as authData from '../../data/auth';

import ResumeView from './view';

import Loader from '../../components/Loader';


class Resume extends Component {
  state = {
    open: false,
    data: null,
    posts: [],
    clubMembers: [],
  };

  componentDidMount() {
    this.user = authData.getUser();
    this.getUserData();
    this.refreshPosts();
    this.getClubMembers();
  };


  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleUpdate = (form) => {
    if (this.state.data) {
      userData.updateStudent(form)
        .then(() => {
          this.setState({ open: false })
          this.getUserData();
        });
    };
  };

  getUserData = async () => {
    const { data } = await userData.getLoggedUser();
    this.setState({ data });
  };

  refreshPosts = async () => {
    const { data } = await userData.getPosts(this.user.id);
    this.setState({ posts: data });
  };

  toggleNotif = async () => {
    const res = await userData.toggleNotifications();
    this.setState({
      data: {
        ...this.state.data,
        allowNotifications: !this.state.data.allowNotifications,
      },
    });
  };

  onModify = () => {
    this.setState({ open: true })
  };

  getClubMembers = () => {
    userData.getClubMembers(this.user.id).then(res => {
      this.setState({ clubMembers: res.data });
    })
  }

  render() {
    return (
      <Loader loading={!this.state.data}>
        <ResumeView
          data={this.state.data}
          posts={this.state.posts}
          clubMembers={this.state.clubMembers}
          open={this.state.open}
          onModify={this.onModify}
          refreshPosts={this.refreshPosts}
          toggleNotif={this.toggleNotif}
          handleRequestClose={this.handleRequestClose}
          handleUpdate={this.handleUpdate} />
      </Loader>
    );
  };
};

export default Resume;
