// @flow

import React, { Component } from 'react';

import styled from 'styled-components';
import {Flex} from 'grid-styled';

import Checkbox from 'material-ui/Checkbox';

import NotLiked from 'material-ui-icons/FavoriteBorder';
import Liked from 'material-ui-icons/Favorite';

import * as authData from 'data/auth';

const CustomCheckbox = styled(Checkbox)`
  color: ${props => props.theme.accent} !important;
`;

const Label = styled.span`
  color: ${props => props.theme.accent};
  text-transform: uppercase;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
`;

class LikeButton extends Component {
  state = {
    liked: this.props.liked,
    likes: this.props.likes,
  }

  handleLike = () => {
    if (authData.isLoggedIn()) {
      this.setState({
        liked: !this.state.liked,
        likes: this.state.likes + (this.state.liked ? -1 : 1)
      });
      this.props.toggleLike();
      // postData.toggleLikePost(this.props.post.id);
    }
  }

  render() {
    return (
      <Flex align="center">
        <Label onClick={this.handleLike}>{this.state.likes} j'aime</Label>
        <CustomCheckbox
          icon={<NotLiked />}
          checkedIcon={<Liked />}
          checked={this.state.liked}
          onChange={this.handleLike} />
      </Flex>
    );
  }
}

export default LikeButton;
