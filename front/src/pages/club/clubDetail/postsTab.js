// @flow

import React from 'react';
import { Flex } from 'grid-styled';

import { Text, } from 'components/common';

import PostList from 'components/PostList';
import Loader from 'components/Loader';

export default function PostsTab(props) {
  return (
    <Loader loading={props.loading}>
      {props.posts.length === 0 && <Flex><Text>Aucun posts</Text></Flex>}
      <PostList posts={props.posts} />
    </Loader>
  );
};
