// @flow

import React, { Component } from 'react';
import { Flex, Box } from 'grid-styled';
import { Link } from 'react-router-dom';

import { ProfileImage, Text, Title } from 'components/common';

import LikeButton from 'components/PostList/LikeButton';

class Comment extends Component {

  render() {
    const props = this.props.comment;
    console.log(props.student)
    return (
      <Flex mb={3}>
        <Box>
          <ProfileImage src={props.student.photoUrlThumb} sz="60px" />
        </Box>
        <Box ml="20px" mt="5px">
          <Link to={`/annuaire/${props.student.id}`}>
            <Title fontSize={1} invert>{props.student.firstname} {props.student.lastname}</Title>
          </Link>
          <Text mb={0.5}>{props.message}</Text>
        </Box>
        <Box ml="auto">
          <LikeButton
            likes={props.likes.length}
            liked={props.liked}
            toggleLike={() => this.props.toggleLike(props.id)}
            showLikes={this.props.showLikes(props.id)} />
        </Box>
      </Flex>
    );
  };
};

export default Comment;
