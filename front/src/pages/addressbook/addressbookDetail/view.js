// @flow

import React from 'react';

import styled from 'styled-components';
import { Box, Flex } from 'grid-styled';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Tabs, { Tab } from 'material-ui/Tabs';

import Time from 'components/Time';
import PostListView from 'components/PostList';
import SocialMedia from '../../../components/SocialMedia';
import FullScreenView from '../../../components/FullScreen/View';
import Loader from '../../../components/Loader';

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
    user,
    posts,
    clubMembers,
  } = props;
  return (
    <FluidContent>
      <ScrollToTopOnMount />
      <Loader>
        {
          user &&
          <Flex wrap>
            <Box p={2} width={[1, 1 / 4]}>
              <PersonStyle onClick={props.setFullScreen(true)} style={{ cursor: 'pointer' }}>
                <ProfileImage src={user.photoUrl} sz="100%" mh="200px" />
              </PersonStyle>
            </Box>
            <Box p={2} width={[
              1, 3 / 4
            ]}>
              <Paper p="20px">
                <Flex>
                  <Box>
                    <Title>
                      {user.firstname} {user.lastname}
                    </Title>
                  </Box>
                </Flex>
                <Text>Promotion : <span>{user.promo || <i>Pas de promotion</i>}</span></Text>
                <Text>Numéro ISEP : <span>{user.studentId || <i>Pas de numéro étudiant</i>}</span></Text>
                <Text>Téléphone : <span>{user.phone || <i>Pas de téléphone</i>}</span></Text>
                <Text>Adresse : <span>{user.address || <i>Pas d'adresse</i>}</span></Text>
                <Text>Mail : <span>{user.mail || <i>Pas d'adresse mail</i>}</span></Text>
                <Text>Mail ISEP : <span>{user.mailISEP || <i>Pas d'adresse mail de l'ISEP</i>}</span></Text>
                <Text>Date de naissance : {user.birthDate ? <Time date={user.birthDate} format="DD/MM/YYYY" /> : <i>Pas de date de naissance</i>}</Text>
                <SocialMedia socials={user} />
              </Paper>
            </Box>
            <Box w={1}>
              <Tabs
                value={props.tabIndex}
                onChange={props.changeTab}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Compte" />
                <Tab label="Publications" />
                <Tab label="Photos" />
              </Tabs>
            </Box>
            {props.renderTab()}
            <FullScreenView
              visible={props.fullscreenOpen}
              image={user.photoUrl}
              onEscKey={props.setFullScreen(false)} />
          </Flex>
        }
      </Loader>
    </FluidContent>
  );
};
