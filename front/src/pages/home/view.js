// @flow

import React from 'react';

import styled from 'styled-components';
import {Box, Flex} from 'grid-styled';
import Button from 'material-ui/Button';

import {Banner, Filler, FluidContent, Header, SearchBar, Separator, Title} from 'components/common';
import PostListView from 'components/PostList';
import Auth from 'components/Auth/AuthComponent';

import PublishBoxView from './publishBox';
import Loader from 'components/Loader';

/* const IconMenu = styled.div`
  display: flex;
  justify-content: space-between;
`; */

const FakeIcon = styled.div`
  margin: 0 auto;
  width: 100px;
  height: 100px;
  background: ${props => props.theme.main};
  margin-bottom: 10px;
  border-radius: 100px;
`;

/*const Icon = styled.img`
  display: block;
  margin: 0 auto;
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

const IconName = styled.h3`
  text-align: center;
  margin: 0;
  margin-bottom: 10px;
  color: ${props => props.theme.accent};
`;*/

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

/*const About = styled.div`
  margin-bottom: 50px;
`;*/

const PostSection = styled.div`
  margin: 30px 0;
`;

const SectionTitle = Title.withComponent('h2');

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
      {/*      <FluidContent>
        <Flex wrap justify="space-between">
          <Box w={[
        1, 1 / 2,
        1 / 4
          ]}>
        <Icon src="/img/svg/Video.svg" />
        <IconName>Videos</IconName>
          </Box>
          <Box w={[
        1, 1 / 2,
        1 / 4
          ]}>
        <Icon src="/img/svg/Photo.svg" />
        <IconName>Photos</IconName>
          </Box>
          <Box w={[
        1, 1 / 2,
        1 / 4
          ]}>
        <Icon src="/img/svg/Gazette.svg" />
        <IconName>Gazettes</IconName>
          </Box>
          <Box w={[
        1, 1 / 2,
        1 / 4
          ]}>
        <Icon src="/img/svg/Evenement.svg" />
        <IconName>Evenements</IconName>
          </Box>
        </Flex>
      </FluidContent*/}
      <Background>
        <Overlay />
        <FluidContent>
          <Auth>
            <PublishBoxView refreshPosts={props.refreshPosts} />
            <Separator />
          </Auth>
          <PostSection>
            {/*<SectionTitle fontSize={2} framed>A LA UNE...</SectionTitle>*/}
            <Loader loading={props.isLoading}>
              <div>
                <PostListView posts={props.posts} refreshPosts={props.refreshPosts} />
                {
                  !props.lastPage &&
                  <Center>
                    <Button color="accent" raised onClick={props.onSeeMore}>Voir plus</Button>
                  </Center>
                }
              </div>
            </Loader>
          </PostSection>
        </FluidContent>
      </Background>
      {/* TODO Voir avec ISEP Live
      <FluidContent>
        <About>
          <SectionTitle fontSize={2} framed>L'EQUIPE</SectionTitle>
          <Flex wrap>
            <Box w={[ 1, 1 / 2 ]} p={2}>
              <img src="/img/background.jpg" alt="" width="100%" />
            </Box>
            <Box w={[ 1, 1 / 2 ]} p={2}>
              <Text>
                Wei 2K18
              </Text>
              <Text color="#3a40d7">
                WEI Ingé 2015 - JT -
              </Text>
            </Box>
          </Flex>
        </About>
        <Separator  />
          <SectionTitle fontSize={2} framed>SUIVEZ-NOUS</SectionTitle>
          <Flex wrap justify="space-between">
          <Box w={[1, 1/2, 1/4]}>
            <FakeIcon  />
            <IconName>Facebook</IconName>
          </Box>
          <Box w={[1, 1/2, 1/4]}>
            <FakeIcon  />
            <IconName>Twitter</IconName>
          </Box>
          <Box w={[1, 1/2, 1/4]}>
            <FakeIcon  />
            <IconName>Instagram</IconName>
          </Box>
          <Box w={[1, 1/2, 1/4]}>
            <FakeIcon  />
            <IconName>Snapchat</IconName>
          </Box>
        </Flex>
      </FluidContent> */}
    </div>
  );
};
