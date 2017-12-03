// @flow

import React from 'react';

import styled from 'styled-components';
import Button from 'material-ui/Button';

import { Title, Banner, Filler, FluidContent, Header, SearchBar, Separator } from 'components/common';
import PostListView from 'components/PostList';
import Auth from 'components/Auth/AuthComponent';
import BookmarkIcon from 'material-ui-icons/Bookmark';

import PublishBoxView from './publishBox';
import Loader from 'components/Loader';

import { BACKGROUND_COLOR, MAIN_COLOR } from '../../colors';

const Background = styled.div`
  background: url(/img/background.jpg);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.main};
  opacity: 0.6;
`;

const PostSection = styled.div`
  margin: 30px 0;
`;

const Center = styled.div`
  text-align: center;
`;

export default function Home(props) {
  return (
    <div>
      <Header url="/img/background.jpg">
        <Filler h={50} />
        <Banner>
          <h1>Accueil</h1>
          <p>Bienvenue sur le site d'ISEPLive</p>
        </Banner>
        <FluidContent p="0">
          <SearchBar placeholder="Rechercher" />
        </FluidContent>
      </Header>
      <div style={{ background: BACKGROUND_COLOR }}>
        <FluidContent>
          <Auth>
            <PublishBoxView refreshPosts={props.refreshPosts} />
            <Separator />
          </Auth>
          <PostSection>
            <Loader loading={props.isLoading}>
              <div>
                {
                  props.pinnedPosts.length > 0 &&
                  <div>
                    <BookmarkIcon style={{ color: MAIN_COLOR }} />
                    <PostListView
                      canPin
                      posts={props.pinnedPosts}
                      refreshPosts={props.refreshPosts} />
                    <Filler h={50} />
                  </div>
                }
                <PostListView
                  canPin
                  posts={props.posts}
                  refreshPosts={props.refreshPosts} />
                {
                  !props.lastPage && props.posts.length > 0 &&
                  <Center>
                    <Button color="accent" raised onClick={props.onSeeMore}>Voir plus</Button>
                  </Center>
                }
              </div>
            </Loader>
          </PostSection>
        </FluidContent>
      </div>
    </div>
  );
};
