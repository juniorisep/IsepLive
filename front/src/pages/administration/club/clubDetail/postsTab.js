// @flow

import React from 'react';
import {Flex} from 'grid-styled';

import {Text,} from 'components/common';

import PostList from 'components/PostList';


export default function PostsTab(props) {
  return (
    <div>
      {props.posts.length === 0 && <Flex><Text>Aucun posts</Text></Flex>}
      <PostList posts={props.posts} />
    </div>
  );
};
