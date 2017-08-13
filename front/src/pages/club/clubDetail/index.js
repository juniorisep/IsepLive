// @flow

import React, {Component} from 'react';

import ClubDetailView from './view';
import MembersTab from './membersTab';
import PostsTab from './postsTab';

import * as clubData from '../../../data/club';

class ClubDetail extends Component {

  state = {
    id: this.props.match.params.id,
    tabIndex: 0,
    logoUrl: '',
    name: '',
    description: '',
    website: '',
    members: [],
    posts: [],
  }

  componentDidMount() {
    this.requestClubDetail();
    this.loadMembers();
  }

  requestClubDetail() {
    clubData.getClub(this.state.id)
      .then(res => {
        const {logoUrl, description, name, website} = res.data;
        this.setState({logoUrl, description, name, website});
      })
  }

  handleChangeTab = (event, index) => {
    this.setState({tabIndex: index});
    switch (index) {
      case 0:
        return this.loadMembers();
      case 1:
        return this.loadPosts();
    }
  }

  loadMembers = () => {
    clubData.getMembers(this.state.id)
      .then(res => {
        this.setState({members: res.data});
      })
  }

  loadPosts = () => {
    clubData.getPosts(this.state.id)
      .then(res => {
        this.setState({posts: res.data});
      })
  }

  renderTab = () => {
    switch (this.state.tabIndex) {
      case 0:
        return <MembersTab members={this.state.members} />;
      case 1:
        return <PostsTab posts={this.state.posts} />;
    }
  }

  render() {
    return (
      <ClubDetailView
        {...this.state}
        changeTab={this.handleChangeTab}
        renderTab={this.renderTab}
       />
    );
  }
}

export default ClubDetail;
