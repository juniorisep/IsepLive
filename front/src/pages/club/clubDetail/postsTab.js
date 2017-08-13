// @flow

import React from 'react';
import styled from 'styled-components';
import {Flex, Box} from 'grid-styled';

import {
  FluidContent,
  Image,
  Text,
  Title,
} from '../../../components/common';

import PostList from '../../../components/PostList';


export default function PostsTab(props) {
  return (
    <div>
      {props.posts.length == 0 && <Flex><Text>Aucun posts</Text></Flex>}
      <PostList posts={props.posts} />
    </div>
  );

}
