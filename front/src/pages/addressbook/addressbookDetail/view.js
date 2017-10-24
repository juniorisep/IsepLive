import React from 'react';

import styled from 'styled-components';
import { Box, Flex } from 'grid-styled';

import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';


import Time from 'components/Time';
import PostListView from 'components/PostList';

import {
  Banner,
  Filler,
  FluidContent,
  Header,
  ProfileImage,
  SearchBar,
  Paper,
  Text,
  Title,
} from 'components/common';

const PersonStyle = styled.div`
  > div {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  width: 100%;
  height: 100%;
`;

export default function AdressbookDetailView(props) {
  const {
    data: {
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
    },
    posts,
  } = props;
  return (
    <div>
      <FluidContent>
        <Flex wrap>
          <Box p={2} width={[1, 1 / 4]}>
            <PersonStyle>
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
              <Text>Promotion : <span>{promo}</span></Text>
              <Text>Numéro ISEP : <span>{studentId}</span></Text>
              <Text>Téléphone : <span>{phone}</span></Text>
              <Text>Adresse : <span>{address}</span></Text>
              <Text>Mail : <span>{mail}</span></Text>
              <Text>Mail ISEP : <span>{mailISEP}</span></Text>
              <Text>Date de naissance : <Time time={birthDate} format="DD/MM/YYYY" /></Text>
            </Paper>
          </Box>
          <Box p={2} width={1}>
            <Paper p="20px">
              <Title fontSize={1.3} invert>Citation</Title>
              <Text>{bio || <i>Pas de bio</i>}</Text>
            </Paper>
          </Box>
          <Box p={2} width={1}>
            <Paper p="20px">
              <Title fontSize={1.3} invert>Associations</Title>
              <Text>Not implemented</Text>
            </Paper>
          </Box>
          <Box p={2} w={1}>
            <Title fontSize={1.5} invert>Publications</Title>
            {posts.length === 0 && <Text>Aucune publication</Text>}
            <PostListView posts={posts} refreshPosts={props.refreshPosts} />
          </Box>
        </Flex>
      </FluidContent>
    </div>
  );
}