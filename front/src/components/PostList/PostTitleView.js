import React from 'react';

import {Box, Flex} from 'grid-styled';

import {Link} from 'react-router-dom';

import {
  ProfileImage,
  Subtitle,
  Text,
  Title,
} from '../common';

import Time from '../Time';
import Author from '../Author';

export default function PostTitleView({ post }) {
  const dateFormat = 'Do MMMM YYYY [à] H[h]mm';
  if (post.author.authorType === 'student') {
    return (
      <Flex align="center" mb="10px">
        <Box mr="10px">
          <ProfileImage src={post.author.photoUrl} alt="logo-profile" w="40px" />
        </Box>
        <Box>
          <Link to={`/annuaire/${post.author.id}`}>
            <Title fontSize={1} invert>{post.author.firstname} {post.author.lastname}</Title>
          </Link>
          <Subtitle>Posté le <Time date={post.creationDate} format={dateFormat} /></Subtitle>
        </Box>
      </Flex>
    );
  };
  return (
    <Flex mb="10px">
      <Box>
        {
          post.title &&
          <Title fontSize={2} invert>{post.title}</Title>
        }
        <Subtitle>Posté le <Time date={post.creationDate} format={dateFormat} /></Subtitle>
      </Box>
      <Box ml="auto">
        <Author data={post.author} />
      </Box>
    </Flex>
  );
};