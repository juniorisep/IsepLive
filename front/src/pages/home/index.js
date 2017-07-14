// @flow

import React from 'react';

import styled from 'styled-components';
import { Flex, Box } from 'grid-styled'
import Button from 'material-ui/Button';

import { MAIN_COLOR, SECONDARY_COLOR } from '../../colors';

import { Separator } from '../../components/Layout/Common';

const Header = styled.header`
  background: url(${props => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: 20px;
  text-align: center;
`;

const SearchBar = styled.input`
  width: 70%;
  margin-top: ${props => props.margin}px;
  border: 0;
  outline: none;
  font-size: 20px;
  border-radius: 20px;
  padding: 8px 25px;
  font-family: 'Roboto';
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const IconMenu = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FakeIcon = styled.div`
  width: 100px;
  height: 100px;
  background: ${MAIN_COLOR};
  margin-bottom: 10px;
  border-radius: 100px;
`;

const IconName = styled.h3`
  text-align: center;
  margin: 0;
  color: ${SECONDARY_COLOR};
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

const FluidContent = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 50px;
  position: relative;
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
  min-height: 250px;
  flex-direction: ${props => props.invert ? 'row-reverse' : 'row'};

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const PostContent = styled.div`
  width: 50%;
  flex: 1 1 0;
  flex-basis: 100%;
  @media (max-width: 600px) {
    width: 100%;
    height: 300px;
  }
`;

const Text = styled.p`
  font-size: 1em;
  color: ${props => props.color || '#949494'};
`;

const PostText = PostContent.extend`
  padding: 20px;
  @media (max-width: 600px) {
    height: auto;
  }
`;

const About = styled.div`
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: ${props => props.fontSize}em;
  display: inline-block;
  color: ${props => props.invert ? MAIN_COLOR : SECONDARY_COLOR};
  ${props => props.framed && `background: ${props.invert ? SECONDARY_COLOR : MAIN_COLOR};`}
  margin: 0;
  margin-bottom: 1em;
  padding: ${props => props.framed ? '.3em .4em' : 0};
`;

const SectionTitle = Title.withComponent('h2');

const IframeWrap = styled.div`
  display: flex;
  align-items: center;
  background: black;
  height: 100%;
  overflow: hidden;
`;

const Footer = styled.footer`
  background: ${MAIN_COLOR};
  padding: 20px;
  min-height: 300px;
`;

const LinksBar = styled.div`
  background: ${SECONDARY_COLOR};
  color: white;
  padding: 10px 0;
`;

const Center = styled.div`
  text-align: center;
`;

export default function Home(props) {
  return (
    <div>
      <Header url="img/background.jpg">
        <SearchBar placeholder="Rechercher" margin={200} />
      </Header>
      <FluidContent>
        <IconMenu>
          <div>
            <FakeIcon />
            <IconName>Videos</IconName>
          </div>
          <div>
            <FakeIcon />
            <IconName>Photos</IconName>
          </div>
          <div>
            <FakeIcon />
            <IconName>Gazettes</IconName>
          </div>
          <div>
            <FakeIcon />
            <IconName>Evenements</IconName>
          </div>
        </IconMenu>
      </FluidContent>
      <Background>
        <Overlay />
        <FluidContent>
          <PublishBox>
            <MessageBox placeholder="Tapez votre message" />
            <Button raised color="primary">Importer fichier</Button>
            <Button raised color="accent" style={{ float: "right" }}>Publier</Button>
          </PublishBox>
          <Separator />
          <PostSection>
            <SectionTitle fontSize={2} framed>A LA UNE...</SectionTitle>
            <PostList>
              <Post>
                <PostContent>
                  <IframeWrap>
                    <iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FIsepLive%2Fvideos%2F1209112955812955%2F&show_text=0"
                    width="100%" height="75%" scrolling="no" frameBorder="0" allowTransparency="true" allowFullScreen="true"></iframe>
                  </IframeWrap>
                </PostContent>
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
              </Post>
              <Post invert>
                <PostContent>
                  <iframe width="100%" height="100%" src="https://www.youtube.com/embed/H2StAurAOYI?rel=0&amp;showinfo=0" frameBorder="0" allowfullscreen></iframe>
                </PostContent>
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
          <Flex direction={[ 'column', 'row' ]}>
            <Box w={[ 1, 1/2 ]} p={2}>
              <img src="img/background.jpg" alt="" width="100%"/>
            </Box>
            <Box w={[ 1, 1/2 ]} p={2}>
              <Text>
                Blabla
              </Text>
              <Text color="#3a40d7">
                Blabla
              </Text>
            </Box>
          </Flex>
        </About>
        <Separator />
        <SectionTitle fontSize={2} framed>SUIVEZ-NOUS</SectionTitle>
        <IconMenu>
          <div>
            <FakeIcon />
            <IconName>Facebook</IconName>
          </div>
          <div>
            <FakeIcon />
            <IconName>Twitter</IconName>
          </div>
          <div>
            <FakeIcon />
            <IconName>Instagram</IconName>
          </div>
          <div>
            <FakeIcon />
            <IconName>Snapchat</IconName>
          </div>
        </IconMenu>
      </FluidContent>
      <Footer>
        <FluidContent>

        </FluidContent>
      </Footer>
      <LinksBar>
        Hello
      </LinksBar>
    </div>
  );
}
