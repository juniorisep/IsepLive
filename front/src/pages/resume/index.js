// @flow

import React, { Component } from 'react';

import * as userData from '../../data/users/student';
import * as authData from '../../data/auth';

import ResumeView from './view';

import Loader from '../../components/Loader';

import AccountTab from './AccountTab';
import PostTab from './PostTab';
import PhotoTab from './PhotoTab';

class Resume extends Component {
  state = {
    open: false,
    data: null,
    page: 0,
    lastPage: false,
    posts: [],
    clubMembers: [],
    fullscreenOpen: false,
    tabIndex: 0,
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
    const { data } = await userData.getPosts(this.user.id, 0);
    this.setState({
      posts: data.content,
      page: 1,
      lastPage: data.last,
    });
  };

  getNextPosts = async () => {
    const { data } = await userData.getPosts(this.user.id, this.state.page);
    this.setState({
      posts: this.state.posts.concat(data.content),
      page: this.state.page + 1,
      lastPage: data.last,
    });
  }

  toggleNotif = async () => {
    await userData.toggleNotifications();
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

  setFullScreen = (open) => e => {
    this.setState({ fullscreenOpen: open });
  }

  changeTab = (event: Event, index: number) => {
    this.setState({ tabIndex: index });
  }

  renderTab = () => {
    const {
      data,
      posts,
      clubMembers,
      lastPage,
    } = this.state;
    switch (this.state.tabIndex) {
      case 0:
        return (
          <AccountTab
            data={data}
            posts={posts}
            clubMembers={clubMembers} />
        )
      case 1:
        return (
          <PostTab
            posts={posts}
            lastPage={lastPage}
            refreshPosts={this.refreshPosts}
            onSeeMore={this.getNextPosts} />
        )
      case 2:
        return (
          <PhotoTab userId={this.user.id} />
        )
      default:
        break;
    }
    return null;
  }

  render() {
    return (
      <Loader loading={!this.state.data}>
        <ResumeView
          data={this.state.data}
          posts={this.state.posts}
          lastPage={this.state.lastPage}
          fullscreenOpen={this.state.fullscreenOpen}
          clubMembers={this.state.clubMembers}
          open={this.state.open}
          tabIndex={this.state.tabIndex}

          renderTab={this.renderTab}
          changeTab={this.changeTab}
          onModify={this.onModify}
          refreshPosts={this.refreshPosts}
          onSeeMore={this.getNextPosts}
          toggleNotif={this.toggleNotif}
          handleRequestClose={this.handleRequestClose}
          handleUpdate={this.handleUpdate}
          setFullScreen={this.setFullScreen}
        />
      </Loader>
    );
  };
};

export default Resume;
