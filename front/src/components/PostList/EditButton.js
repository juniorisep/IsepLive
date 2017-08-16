import React, { Component } from 'react';

import IconButton from 'material-ui/IconButton';
import Menu, {MenuItem} from 'material-ui/Menu';
import MoreIcon from 'material-ui-icons/MoreHoriz';

import * as postData from 'data/post';

class EditButton extends Component {

  state = {
    openMenu: false,
  }

  openMenu = (e) => this.setState({ openMenu: true, anchorEl: e.target });
  closeMenu = () => this.setState({ openMenu: false });

  handleEdit = () => {
    // TODO: to implement
    this.closeMenu();
  }
  handleDelete = () => {
    postData.deletePost(this.props.post.id).then(res => {
      this.props.refresh();
    })
    this.closeMenu();
  }

  render() {
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
        </Menu>
      </div>
    );
  }
}

export default EditButton;
