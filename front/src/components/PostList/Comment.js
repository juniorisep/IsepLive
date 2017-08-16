// @flow
import React, { Component } from 'react';
import {Flex, Box} from 'grid-styled';

import {
  ProfileImage,
  Text,
  Title
} from 'components/common';

import LikeButton from 'components/PostList/LikeButton';

class Comment extends Component {
  render() {
    const props = this.props.comment;
    return (
      <Flex mb={2}>
        <Box>
          <ProfileImage src={props.student.photoUrl} w="60px" />
        </Box>
        <Box ml="20px">
          <Title fontSize={1} invert>{props.student.firstname} {props.student.lastname}</Title>
          <Text>
            {props.message}
          </Text>
        </Box>
        <Box ml="auto">
          <LikeButton likes={props.likes.length} liked={props.liked} toggleLike={() => this.props.toggleLike(props.id)} />
        </Box>
      </Flex>
    );
  }
}

export default Comment;
