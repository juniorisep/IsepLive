// @flow

import React from 'react';
import { Flex } from 'grid-styled';
import Button from 'material-ui/Button';

import { Text, } from 'components/common';

import PostList from 'components/PostList';
import Loader from 'components/Loader';

export default function PostsTab(props) {
  return (
    <Loader loading={props.loading}>
      {props.posts.length === 0 && <Flex><Text>Aucun post</Text></Flex>}
      <PostList posts={props.posts} />
      {
        !props.lastPage && props.posts.length > 0 &&
        <div style={{ textAlign: 'center' }}>
          <Button color="accent" raised onClick={props.onSeeMore}>Voir plus</Button>
        </div>
      }
    </Loader>
  );
};
