// @flow

import React, { Component } from 'react';

import * as studentData from 'data/users/student';

import AdressbookDetailView from './view';

import AccountTab from '../../resume/AccountTab';
import PhotoTab from '../../resume/PhotoTab';
import PostTab from '../../resume/PostTab';

class AdressbookDetail extends Component {
  state = {
    data: null,
    posts: [],
    page: 0,
    lastPage: false,
    clubMembers: [],
    fullscreenOpen: false,
    tabIndex: 0,
    isLoading: false,
  };

  componentDidMount() {
    const id = this.getUserId();
    this.getUserData(id);
    this.refreshPosts(id);
    this.getClubMembers(id);
  }

  componentWillReceiveProps(props) {
    this.setState({ tabIndex: 0 });
    const id = props.match.params.id;
    this.getUserData(id);
    this.refreshPosts(id);
    this.getClubMembers(id);
  }

  getUserData = async (id) => {
    this.setState({ isLoading: true });
    const { data } = await studentData.getStudent(id);
    this.setState({ data, isLoading: false });
  };

  refreshPosts = async (id) => {
    const { data } = await studentData.getPosts(id, 0);
    this.setState({
      posts: data.content,
      page: 1,
      lastPage: data.last,
    });
  };

  getNextPosts = async (id) => {
    const { data } = await studentData.getPosts(id, this.state.page);
    this.setState({
      posts: this.state.posts.concat(data.content),
      page: this.state.page + 1,
      lastPage: data.last,
    });
  }

  getClubMembers = (id) => {
    studentData.getClubMembers(id).then(res => {
      this.setState({ clubMembers: res.data });
    });
  }

  setFullScreen = (open) => e => {
    this.setState({ fullscreenOpen: open });
  }

  changeTab = (event: Event, index: number) => {
    this.setState({ tabIndex: index });
  }

  getUserId() {
    return this.props.match.params.id;
  }

  renderTab = () => {
    const userid = this.getUserId();
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
        );
      case 1:
        return (
          <PostTab
            posts={posts}
            lastPage={lastPage}
            refreshPosts={this.refreshPosts}
            onSeeMore={this.getNextPosts} />
        );
      case 2:
        return (
          <PhotoTab userId={userid} />
        );
      default:
        break;
    }
    return null;
  }

  render() {
    return (
      <AdressbookDetailView
        isLoading={this.state.isLoading}
        tabIndex={this.state.tabIndex}
        renderTab={this.renderTab}
        changeTab={this.changeTab}

        user={this.state.data}
        lastPage={this.state.lastPage}
        posts={this.state.posts}
        fullscreenOpen={this.state.fullscreenOpen}
        clubMembers={this.state.clubMembers}
        refreshPosts={this.refreshPosts}
        onSeeMore={this.getNextPosts}
        setFullScreen={this.setFullScreen} />
    );
  }
}

export default AdressbookDetail;
