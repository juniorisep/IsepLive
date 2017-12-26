// @flow

import React, { Component } from 'react';

import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreIcon from 'material-ui-icons/MoreHoriz';

import * as postData from 'data/post';
import * as authData from 'data/auth';

class EditButton extends Component {
  state = {
    openMenu: false,
    pin: this.props.post.pinned,
    canPin: false,
  };

  openMenu = e => this.setState({ openMenu: true, anchorEl: e.target });
  closeMenu = () => this.setState({ openMenu: false });

  componentDidMount() {
    const post = this.props.post;
    if (post.author.authorType === 'club') {
      this.setState({ canPin: true });
    };
    if (authData.hasRole(['ROLE_ADMIN', 'ROLE_POST_MANAGER'])) {
      this.setState({ canPin: true });
    };
  };

  handleEdit = () => {
    // TODO: to implement
    this.props.modify(this.props.post);
    this.closeMenu();
  };

  handleDelete = () => {
    postData.deletePost(this.props.post.id).then(res => {
      this.props.refresh('delete');
    });
    this.closeMenu();
  };

  pinPost = () => {
    postData.pinPost(this.props.post.id, !this.props.post.pinned).then(res => {
      this.props.refresh();
    });
    this.closeMenu();
  };

  render() {
    const { canPin } = this.state;
    return (
      <div>
        <IconButton color="accent" onClick={this.openMenu}>
          <MoreIcon />
        </IconButton>
        <Menu
          anchorEl={this.state.anchorEl}
          open={this.state.openMenu}
          onRequestClose={this.closeMenu}>
          <MenuItem onClick={this.handleEdit}>Modifier</MenuItem>
          <MenuItem onClick={this.handleDelete}>Supprimer</MenuItem>
          {this.props.canPin && canPin && <MenuItem onClick={this.pinPost}>{!this.state.pin ? 'Pin' : 'Unpin'}</MenuItem>}
        </Menu>
      </div>
    );
  };
};

export default EditButton;
