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
      <Flex wrap>
        {props.posts.length == 0 && <Text>Aucun posts</Text>}
        <PostList posts={props.posts} />
      </Flex>
    </div>
  );

}
