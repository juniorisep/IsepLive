// @flow

import React from 'react';

import styled from 'styled-components';
import { Box, Flex } from 'grid-styled';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';

import Time from 'components/Time';
import PostListView from 'components/PostList';
import SocialMedia from '../../../components/SocialMedia';
import FullScreenView from '../../../components/FullScreen/View';

import {
  FluidContent,
  ProfileImage,
  Paper,
  Text,
  Title,
  ScrollToTopOnMount,
  BgImage,
} from 'components/common';

import * as clubData from '../../../data/club';



const PersonStyle = styled.div`
  > div {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  width: 100%;
  height: 100%;
`;

export default function AdressbookDetailView(props) {
  const {
    data,
    posts,
    clubMembers,
  } = props;
  const {
    photoUrl,
    firstname,
    lastname,
    phone,
    studentId,
    birthDate,
    promo,
    bio,
    address,
    mail,
    mailISEP,
  } = data;
  return (
    <FluidContent>
      <ScrollToTopOnMount />
      <Flex wrap>
        <Box p={2} width={[1, 1 / 4]}>
          <PersonStyle onClick={props.setFullScreen(true)} style={{ cursor: 'pointer' }}>
            <ProfileImage src={photoUrl} sz="100%" mh="200px" />
          </PersonStyle>
        </Box>
        <Box p={2} width={[
          1, 3 / 4
        ]}>
          <Paper p="20px">
            <Flex>
              <Box>
                <Title>
                  {firstname} {lastname}
                </Title>
              </Box>
            </Flex>
            <Text>Promotion : <span>{promo || <i>Pas de promotion</i>}</span></Text>
            <Text>Numéro ISEP : <span>{studentId || <i>Pas de numéro étudiant</i>}</span></Text>
            <Text>Téléphone : <span>{phone || <i>Pas de téléphone</i>}</span></Text>
            <Text>Adresse : <span>{address || <i>Pas d'adresse</i>}</span></Text>
            <Text>Mail : <span>{mail || <i>Pas d'adresse mail</i>}</span></Text>
            <Text>Mail ISEP : <span>{mailISEP || <i>Pas d'adresse mail de l'ISEP</i>}</span></Text>
            <Text>Date de naissance : {birthDate ? <Time date={birthDate} format="DD/MM/YYYY" /> : <i>Pas de date de naissance</i>}</Text>
            <SocialMedia socials={data} />
          </Paper>
        </Box>
        <Box p={2} width={1}>
          <Paper p="20px">
            <Title fontSize={1.3} invert>Citation</Title>
            <Text>{bio || <i>Pas de bio</i>}</Text>
          </Paper>
        </Box>
        <Box p={2} width={1}>
          <Title fontSize={1.5} invert>Associations</Title>
          {clubMembers.length === 0 && <Text>Membre d'aucunes associations</Text>}
          <Flex wrap>
            {
              clubMembers.map(cm => {
                return (
                  <Box w={[1, 1 / 3, 1 / 4]} key={cm.club.id} p={2}>
                    <Link to={`/associations/${cm.club.id}`}>
                      <Paper>
                        <BgImage src={cm.club.logoUrl} mh="200px" />
                        <div style={{ textAlign: 'center', padding: '.5em' }}>
                          <div>
                            <Title invert fontSize={1.5}>{cm.club.name}</Title>
                          </div>
                          <Title fontSize={1.1}>{clubData.getClubRoleName(cm.role.name)}</Title>
                        </div>
                      </Paper>
                    </Link>
                  </Box>
                )
              })
            }
          </Flex>
        </Box>
        <Box p={2} w={1}>
          <Title fontSize={1.5} invert>Publications</Title>
          {posts.length === 0 && <Text>Aucunes publications</Text>}
          <PostListView posts={posts} refreshPosts={props.refreshPosts} />
          {
            !props.lastPage && posts.length > 0 &&
            <div style={{ textAlign: 'center' }}>
              <Button color="accent" raised onClick={props.onSeeMore}>Voir plus</Button>
            </div>
          }
        </Box>
      </Flex>
      <FullScreenView
        visible={props.fullscreenOpen}
        image={photoUrl}
        onEscKey={props.setFullScreen(false)} />
    </FluidContent>
  );
};
