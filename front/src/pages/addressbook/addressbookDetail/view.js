// @flow

import React from 'react';

import styled from 'styled-components';

import {Box, Flex} from 'grid-styled';

import Typography from 'material-ui/Typography';

import Time from 'components/Time';
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
  > img {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

export default function AdressbookDetailView(props) {
  return (
    <div>
      <Header url="/img/background.jpg">
        <Filler h={50} />
        <Banner>
          <h1>Annuaire</h1>
          <p>Si vous voulez stalker, c'est ici que ça se passe !</p>
        </Banner>
        <FluidContent p="0">
          <SearchBar placeholder="Rechercher" />
        </FluidContent>
      </Header>
      <FluidContent>
        <Flex wrap>
          <Box p={2} width={[1, 1 / 4]}>
            <PersonStyle>
              <ProfileImage src={props.photoUrl} w="100%" />
            </PersonStyle>
          </Box>
          <Box p={2} width={[
            1, 3 / 4
          ]}>
            <Paper p="20px">
              <Flex>
                <Box>
                  <Title>
                    {props.firstname} {props.lastname}
                  </Title>
                </Box>
              </Flex>
              <Text>Promotion : <span>{props.promo}</span></Text>
              <Text>Numéro ISEP : <span>{props.studentId}</span></Text>
              <Text>Téléphone : <span>{props.phone}</span></Text>
              <Text>Adresse : <span>{props.address}</span></Text>
              <Text>Mail : <span>{props.mail}</span></Text>
              <Text>Mail ISEP : <span>{props.mailISEP}</span></Text>
              <Text>Date de naissance : <Time time={props.birthDate} format="DD/MM/YYYY" /></Text>
            </Paper>
          </Box>
          <Box p={2} width={1}>
            <Paper p="20px">
              <Title fontSize={1.3} invert>Citation</Title>
              <Text>{props.bio || <i>Pas de bio</i>}</Text>
            </Paper>
          </Box>
          <Box p={2} width={1}>
            <Paper p="20px">
              <Title fontSize={1.3} invert>Associations</Title>
              <Text>ryituoyipuoiùpuogypiftuodryitfuoygi</Text>
            </Paper>
          </Box>
          <Box p={2} width={1}>
            <Paper p="20px">
              <Flex>
                <Box>
                  <Title fontSize={1.3} invert>Publications</Title>
                </Box>
              </Flex>
              <Text>hjdshfjkdshf</Text>
            </Paper>
          </Box>
        </Flex>
      </FluidContent>
    </div>
  );
};
