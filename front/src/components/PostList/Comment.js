// @flow

import React, { Component } from 'react';
import { Flex, Box } from 'grid-styled';
import { Link } from 'react-router-dom';

import { ProfileImage, Text, Title } from 'components/common';
import IconButton from 'material-ui/IconButton';

import DeleteIcon from 'material-ui-icons/Delete';

import LikeButton from 'components/PostList/LikeButton';
import * as authData from '../../data/auth';

class Comment extends Component {

  deleteComment = () => {
    this.props.onDelete(this.props.comment);
  }

  renderEdit() {
    const { comment } = this.props;
    if (authData.isLoggedIn()) {
      const id = authData.getUser().id;
      if (id === comment.student.id) {
        return (
          <div>
            <IconButton color="default" onClick={this.deleteComment}>
              <DeleteIcon />
            </IconButton>
          </div>
        )
      }
    }
    return null;
  }

  render() {
    const props = this.props.comment;
    return (
      <Flex mb={3}>
        <Box>
          <ProfileImage src={props.student.photoUrlThumb} sz="60px" mh="auto" />
        </Box>
        <Box ml="20px" mt="5px" mr="5px">
          <Link to={`/annuaire/${props.student.id}`}>
            <Title fontSize={1} invert>{props.student.firstname} {props.student.lastname}</Title>
          </Link>
          <Text mb={0.5}>{props.message}</Text>
        </Box>
        <Box ml="auto">
          <Flex align="auto">
            <Box>
              <LikeButton
                likes={props.likes.length}
                liked={props.liked}
                toggleLike={() => this.props.toggleLike(props.id)}
                showLikes={this.props.showLikes(props.id)} />
            </Box>
            <Box ml="5px">
              {this.renderEdit()}
            </Box>
          </Flex>
        </Box>
      </Flex>
    );
  };
};

export default Comment;
