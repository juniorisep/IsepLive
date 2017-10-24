// @flow

import React, { Component } from 'react';

import { FluidContent, ProfileImage, ScrollToTopOnMount } from 'components/common';

import Paper from 'material-ui/Paper';

import { Box, Flex } from 'grid-styled';

import styled from 'styled-components';

const PersonStyle = styled.div`
  > img {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

class HallOfFame extends Component {
  render() {
    return (
      <div>
        <ScrollToTopOnMount />
        <FluidContent style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#ffc000' }}>All of Fame</h1>
          <h3>Tous les héros ne portent pas de capes</h3>
          <Flex wrap>
            <Box p={2} width={[1, 1 / 4]}>
              <PersonStyle>
                <ProfileImage src="" sz="100%" />
              </PersonStyle>
            </Box>
            <Box p={2} width={[
              1, 3 / 4
            ]}>
              <Paper elevation={4} style={{
                padding: 20,
                borderRadius: '10px'
              }}>
                <h3>Dieu - 2016</h3>
                <p>Créée IsepLive le 1 juin 2006 à la suite de l'annonce du ministre chinois de la culture Sun Jiazheng : le ouvernement chinois a décidé la création de la "journée du Partimoine culturel" en Chine, qui sera célébrée chaque année le deuxième samedi du mois de juin.</p>
              </Paper>
            </Box>
            <Box p={2} width={[
              1, 3 / 4
            ]}>
              <Paper elevation={4} style={{
                padding: 20,
                borderRadius: '10px'
              }}>
                <h3>Chaos - 2006 / 2012</h3>
                <p>Nous avons été un peu long au démarrage.</p>
              </Paper>
            </Box>
            <Box p={2} width={[1, 1 / 4]}>
              <PersonStyle>
                <ProfileImage src="" sz="100%" />
              </PersonStyle>
            </Box>
          </Flex>
          <h3>Les didacteurs</h3>
          <Flex wrap>
            <Box p={2} width={[1, 1 / 4]}>
              <PersonStyle>
                <ProfileImage src="" sz="100%" />
              </PersonStyle>
            </Box>
            <Box p={2} width={[1, 1 / 4]}>
              <PersonStyle>
                <ProfileImage src="" sz="100%" />
              </PersonStyle>
            </Box>
            <Box p={2} width={[1, 1 / 4]}>
              <PersonStyle>
                <ProfileImage src="" sz="100%" />
              </PersonStyle>
            </Box>
            <Box p={2} width={[1, 1 / 4]}>
              <PersonStyle>
                <ProfileImage src="" sz="100%" />
              </PersonStyle>
            </Box>
            <Box p={2} width={[1, 1 / 4]}>
              <PersonStyle>
                <ProfileImage src="" sz="100%" />
              </PersonStyle>
            </Box>
            <Box p={2} width={[1, 1 / 4]}>
              <PersonStyle>
                <ProfileImage src="" sz="100%" />
              </PersonStyle>
            </Box>
            <Box p={2} width={[1, 1 / 4]}>
              <PersonStyle>
                <ProfileImage src="" sz="100%" />
              </PersonStyle>
            </Box>
            <Box p={2} width={[1, 1 / 4]}>
              <PersonStyle>
                <ProfileImage src="" sz="100%" />
              </PersonStyle>
            </Box>
            <Box p={2} width={[1, 1 / 4]}>
              <PersonStyle>
                <ProfileImage src="" sz="100%" />
              </PersonStyle>
            </Box>
          </Flex>
          <h3>Les rambos</h3>
          <Flex wrap>
            <Box p={2} width={[1, 1 / 4]}>
              <PersonStyle>
                <ProfileImage src="" sz="100%" />
              </PersonStyle>
            </Box>
            <Box p={2} width={[1, 1 / 4]}>
              <PersonStyle>
                <ProfileImage src="" sz="100%" />
              </PersonStyle>
            </Box>
            <Box p={2} width={[1, 1 / 4]}>
              <PersonStyle>
                <ProfileImage src="" sz="100%" />
              </PersonStyle>
            </Box>
            <Box p={2} width={[1, 1 / 4]}>
              <PersonStyle>
                <ProfileImage src="" sz="100%" />
              </PersonStyle>
            </Box>
          </Flex>
        </FluidContent>
      </div>
    );
  };
};

export default HallOfFame;
