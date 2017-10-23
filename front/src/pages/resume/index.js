// @flow

import React, { Component } from 'react';

import * as userData from '../../data/users/student';
import * as authData from '../../data/auth';

import ResumeView from './view';


class Resume extends Component {
  state = {
    open: false,
    data: null,
    posts: [],
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
        })
    }
  }

  componentDidMount() {
    this.getUserData();
    this.refreshPosts();
  };

  getUserData = async () => {
    const { data } = await userData.getLoggedUser();
    this.setState({ data });
  }

  refreshPosts = async () => {
    const user = await authData.getUser();
    const { data } = await userData.getPosts(user.id);
    this.setState({ posts: data });
  }

  onModify = () => {
    this.setState({ open: true })
  }

  render() {
    if (!this.state.data) {
      return null;
    }

    return (
      <ResumeView
        data={this.state.data}
        posts={this.state.posts}
        open={this.state.open}
        onModify={this.onModify}
        refreshPosts={this.refreshPosts}
        handleRequestClose={this.handleRequestClose}
        handleUpdate={this.handleUpdate} />
    );
  };
};

export default Resume;