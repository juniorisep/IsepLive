// @flow

import React from 'react';

import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import Button from 'material-ui/Button';

import { MAIN_COLOR, SECONDARY_COLOR } from '../../colors';

import {
  Separator,
  FluidContent,
  Header,
  SearchBar,
  Filler,
} from '../../components/common';

import Time from '../../components/Time';

import Video from '../../components/Video';
import Poll from '../../components/Poll';
import Author from './author';


/* const IconMenu = styled.div`
  display: flex;
  justify-content: space-between;
`; */

const FakeIcon = styled.div`
  margin: 0 auto;
  width: 100px;
  height: 100px;
  background: ${MAIN_COLOR};
  margin-bottom: 10px;
  border-radius: 100px;
`;

const Icon = styled.img`
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
`;

const Background = styled.div`
  background: url(img/background.jpg);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  position: relative;
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${MAIN_COLOR};
  opacity: 0.6;
`;


const PublishBox = styled.div`
  background: ${MAIN_COLOR};
  margin-bottom: 20px;
  padding: 20px;
`;

const MessageBox = styled.textarea`
  font-family: 'Roboto';
  font-size: 1.3em;
  padding: .4em;
  border: 0;
  outline: 0;
  border-radius: 5px;
  width: 100%;
  resize: vertical;
  margin-bottom: 10px;
`;

const PostSection = styled.div`
  margin: 30px 0;
`;

const PostList = styled.ul`
  padding: 0;
`;

const Post = styled.li`
  background: white;
  margin-bottom: 20px;
  display: flex;
  min-height: 300px;
  flex-direction: ${props => props.invert ? 'row-reverse' : 'row'};

  @media (max-width: 40em) {
    flex-direction: column;
  }
`;

const PostContent = styled.div`
  height: 100%;
  position: relative;
  ${props => props.bg && 'background: black;'}

  @media (max-width: 40em) {
    height: 300px;
  }
`;

const PostText = PostContent.extend`
  padding: 20px;
  @media (max-width: 40em) {
    height: auto;
  }
`;

const Text = styled.p`
  font-size: 1em;
  color: ${props => props.color || '#949494'};
`;

const About = styled.div`
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: ${props => props.fontSize}em;
  display: inline-block;
  color: ${props => props.invert ? props.theme.main : props.theme.accent};
  ${props => props.framed && `background: ${props.invert ? props.theme.accent : props.theme.main};`}
  margin: 0;
  margin-bottom: .5em;
  padding: ${props => props.framed ? '.3em .4em' : 0};
`;

const SectionTitle = Title.withComponent('h2');

const Subtitle = styled.h3`
  color: #9f9f9f;
  font-weight: normal;
  font-size: 15px;
  margin: 0;
`;

const IframeWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-bottom: 56.25%;
  top: 50%;
  margin-top: -28.1%;

  > iframe {
    border: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

const Center = styled.div`
  text-align: center;
`;

export default function Home(props) {
  return (
    <div>
      <Header url="img/background.jpg">
        <Filler h="200" />
        <FluidContent p="0">
          <SearchBar placeholder="Rechercher" />
        </FluidContent>
      </Header>
      <FluidContent>
        <Flex wrap justify="space-between">
          <Box w={[1, 1/2, 1/4]}>
            <Icon src="svg/Video.svg" />
            <IconName>Videos</IconName>
          </Box>
          <Box w={[1, 1/2, 1/4]}>
            <Icon src="svg/Photo.svg" />
            <IconName>Photos</IconName>
          </Box>
          <Box w={[1, 1/2, 1/4]}>
            <Icon src="svg/Gazette.svg" />
            <IconName>Gazettes</IconName>
          </Box>
          <Box w={[1, 1/2, 1/4]}>
            <Icon src="svg/Evenement.svg" />
            <IconName>Evenements</IconName>
          </Box>
        </Flex>
      </FluidContent>
      <Background>
        <Overlay />
        <FluidContent>
          <PublishBox>
            <MessageBox placeholder="Tapez votre message" />
            <input accept="jpg,jpeg,JPG,JPEG" id="file" multiple type="file" style={{display: 'none'}} />
            <label htmlFor="file">
              <Button raised component="span" color="primary">
                Importer fichier
              </Button>
            </label>
            <Button raised color="accent" style={{ float: "right" }}>Publier</Button>
          </PublishBox>
          <Separator />
          <PostSection>
            <SectionTitle fontSize={2} framed>A LA UNE...</SectionTitle>
            <PostList>

              {
                props.posts.map((p, i) => {
                  if (p.media) {
                    switch (p.media.mediaType) {
                      case 'poll':
                        return (
                          <Post key={i}>
                            <Box w={[ 1 ]}>
                              <PostText>
                                <Title fontSize={2} invert>NEW POLL</Title>
                                <Poll data={p.media} />
                              </PostText>
                            </Box>
                          </Post>
                        )
                      case 'videoEmbed':
                        return (
                          <Post key={i}>
                            <Box w={[ 1, 1/2 ]}>
                              <PostContent bg>
                                <IframeWrap>
                                  <iframe src={p.media.url}
                                  scrolling="no" allowTransparency allowFullScreen></iframe>
                                </IframeWrap>
                              </PostContent>
                            </Box>
                            <Box w={[ 1, 1/2 ]}>
                              <PostText>
                                <Flex>
                                  <Box>
                                    <Title fontSize={2} invert>{p.title}</Title>
                                    <Subtitle>Posté le <Time date={p.creation} format="DD/MM/YYYY [à] HH[h]mm" /></Subtitle>
                                  </Box>
                                  <Box ml="auto">
                                    <Author data={p.author} />
                                  </Box>
                                </Flex>
                                { p.content.split('\n').map(par => <Text>{par}</Text>) }
                                <Button color="accent">Voir plus</Button>
                              </PostText>
                            </Box>
                          </Post>
                        )

                      default:

                    }
                  }
                })
              }
              <Post>
                <Box w={[ 1, 1/2 ]}>
                  <PostContent bg>
                    <IframeWrap>
                      {/* <iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FIsepLive%2Fvideos%2F1209112955812955%2F&show_text=0"
                      scrolling="no" allowTransparency allowFullScreen></iframe> */}
                    </IframeWrap>
                  </PostContent>
                </Box>
                <Box w={[ 1, 1/2 ]}>
                  <PostText>
                    <Title fontSize={2} invert>AFTER MOVIE WEI 2K16</Title>
                    <Text>🔥 Revivez la folie du WEI Sup de l'ISEP 2016 grâce à notre Aftermovie !🔥
                    </Text>
                    <Text>
                      Merci à BDE Ulteam - ISEP pour ce magnifique week-end !
                      À ce soir sur http://iseplive.fr/ pour la version longue.
                    </Text>
                    <Text>
                      La bise, l'équipe ISEPLive.
                    </Text>
                    <Text>
                      Musiques:
                      Gareth Emery feat. Lawson - Make It Happen (Nicolas Haelg Remix)
                      Nicolas Haelg - So Much More (feat. Bjorn Maria)
                      Diplo - Revolution (Absence Remix)
                      Nhyx X The Loud Republic - Gamma
                    </Text>
                    <Button color="accent">Voir plus</Button>
                  </PostText>
                </Box>
              </Post>
              <Post invert>
                <Box w={[ 1, 1/2 ]}>
                  <PostContent bg>
                    <IframeWrap>
                      {/* <iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FIsepLive%2Fvideos%2F1209112955812955%2F&show_text=0"
                      width="100%" height="75%" scrolling="no" frameBorder="0" allowTransparency="true" allowFullScreen="true"></iframe> */}
                    </IframeWrap>
                  </PostContent>
                </Box>
                <Box w={[ 1, 1/2 ]}>
                  <PostText>
                    <Title fontSize={2} invert>AFTER MOVIE WEI 2K16</Title>
                    <Text>🔥 Revivez la folie du WEI Sup de l'ISEP 2016 grâce à notre Aftermovie !🔥
                    </Text>
                    <Text>
                      Merci à BDE Ulteam - ISEP pour ce magnifique week-end !
                      À ce soir sur http://iseplive.fr/ pour la version longue.
                    </Text>
                    <Text>
                      La bise, l'équipe ISEPLive.
                    </Text>
                    <Text>
                      Musiques:
                      Gareth Emery feat. Lawson - Make It Happen (Nicolas Haelg Remix)
                      Nicolas Haelg - So Much More (feat. Bjorn Maria)
                      Diplo - Revolution (Absence Remix)
                      Nhyx X The Loud Republic - Gamma
                    </Text>
                    <Button color="accent">Voir plus</Button>
                  </PostText>
                </Box>
              </Post>
            </PostList>
            <Center>
              <Button color="accent" raised>Voir tout</Button>
            </Center>
          </PostSection>
        </FluidContent>
      </Background>
      <FluidContent>
        <About>
          <SectionTitle fontSize={2} framed>L'EQUIPE</SectionTitle>
          <Flex wrap>
            <Box w={[ 1, 1/2 ]} p={2}>
              <img src="img/background.jpg" alt="" width="100%"/>
            </Box>
            <Box w={[ 1, 1/2 ]} p={2}>
              <Text>
                Wei 2K18
              </Text>
              <Text color="#3a40d7">
                WEI Ingé 2015 - JT -
              </Text>
            </Box>
          </Flex>
        </About>
        <Separator />
        <SectionTitle fontSize={2} framed>SUIVEZ-NOUS</SectionTitle>
        <Flex wrap justify="space-between">
          <Box w={[1, 1/2, 1/4]}>
            <FakeIcon />
            <IconName>Facebook</IconName>
          </Box>
          <Box w={[1, 1/2, 1/4]}>
            <FakeIcon />
            <IconName>Twitter</IconName>
          </Box>
          <Box w={[1, 1/2, 1/4]}>
            <FakeIcon />
            <IconName>Instagram</IconName>
          </Box>
          <Box w={[1, 1/2, 1/4]}>
            <FakeIcon />
            <IconName>Snapchat</IconName>
          </Box>
        </Flex>
      </FluidContent>
    </div>
  );
}
