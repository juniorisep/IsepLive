// @flow
import React, { Component } from 'react';

import styled from 'styled-components';
import {Box, Flex} from 'grid-styled';

import {
  FluidContent,
  Title,
  ProfileImage,
  ScrollToTopOnMount,
  Text,
} from 'components/common';

import {
  PostView,
} from 'components/PostList';

import Comment from 'components/PostList/Comment';
import CommentBox from 'components/PostList/CommentBox';

const Background = styled.div`
  background: url(/img/background.jpg);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  position: relative;
`;

const Post = styled.div`
  background: white;
  padding: 20px;
`;

const PostActions = Flex.extend`
  margin: -15px;
`;

export default function PostDetailView(props) {
  return (
    <div>
      <ScrollToTopOnMount />
      <Background>
        <FluidContent>
          {
            props.post &&
            <PostView post={props.post} preview={true} />
          }
        </FluidContent>
      </Background>
      <FluidContent>
        <Title>Commentaires</Title>
        { props.comments.length == 0 && <Text>Pas de commentaire(s) pour le moment !</Text> }
        {
          props.comments.map(c => {
            return <Comment key={c.id} comment={c} toggleLike={props.toggleLikeCom} />
          })
        }
        <Flex mt="30px">
          <Box>
            <ProfileImage w="60px"/>
          </Box>
          <Box flex="1 1 auto" ml="20px">
            <CommentBox onComment={props.onComment} />
          </Box>
        </Flex>
      </FluidContent>
    </div>
  );
}
