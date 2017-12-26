// @flow

import React from 'react';

import styled from 'styled-components';
import { Box, Flex } from 'grid-styled';

import { FluidContent, Title, ProfileImage, ScrollToTopOnMount, Text } from 'components/common';

import { PostView } from 'components/PostList';

import Comment from 'components/PostList/Comment';
import CommentBox from 'components/PostList/CommentBox';
import ModifyPostModal from '../../../components/PostList/ModifyPostModal';

const Background = styled.div`
  background: url(/img/background.jpg);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  position: relative;
`;

export default function PostDetailView(props) {
  return (
    <div>
      <ScrollToTopOnMount />
      <Background>
        <FluidContent>
          {
            props.post &&
            <PostView
              preview
              post={props.post}
              refresh={props.refresh}
              modify={props.modifyPost}
            />
          }
        </FluidContent>
      </Background>
      <FluidContent>
        <Title>Commentaires</Title>
        {props.comments.length === 0 && <Text>Pas de commentaire(s) pour le moment !</Text>}
        {
          props.comments.map(c => {
            return <Comment
              key={c.id}
              comment={c}
              toggleLike={props.toggleLikeCom}
              showLikes={props.showLikes} />
          })
        }
        <Flex mt="30px">
          <Box>
            <ProfileImage
              src={props.commenter && props.commenter.photoUrlThumb}
              sz="60px"
              mh="auto" />
          </Box>
          <Box flex="1 1 auto" ml="20px">
            <CommentBox onComment={props.onComment} />
          </Box>
        </Flex>
      </FluidContent>
      <ModifyPostModal
        post={props.post}
        open={props.modifyEnable}
        refresh={props.refresh}
        modifyPost={props.modifyPost}
        requestClose={props.requestClose} />
    </div>
  );
};
