// @flow
import React, { Component } from 'react';

import styled from 'styled-components';
import {Box, Flex} from 'grid-styled';

import {
  FluidContent,
  Title,
} from 'components/common';

import {
  PostView,
} from 'components/PostList';

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
  console.log(props.post);
  return (
    <div>
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
      </FluidContent>
    </div>
  );
}
