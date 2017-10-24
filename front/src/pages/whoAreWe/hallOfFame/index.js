// @flow

import React, { Component } from 'react';

import { FluidContent, ScrollToTopOnMount } from 'components/common';

import Paper from 'material-ui/Paper';

import { Box, Flex } from 'grid-styled';

import styled from 'styled-components';

const BgImageStyle = styled.div`
  > img {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    background: url(${props => props.url});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    margin-left: auto;
    min-height: 200px;
  }
`;

const Person = (props) => {
  const PersonStyle = styled.div`
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

    > div {
      padding: 10px;
      color: ${props => props.theme.main};
    }

    > div p {
      margin: 0;
    }

    > div p.name {
      font-weight: bold;
      margin-bottom: 5px;
    }
  `;

  const ProfileImage = styled.div`
    background: url(${({ src }) => src});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: ${({ sz }) => sz};
    height: ${({ sz, h }) => h || sz};
    margin-left: ${props => props.ml || 'auto'};
    min-height: ${props => props.mh || '100%'};
  `;

  return (
    <PersonStyle>
      <ProfileImage {...props} src={props.url} sz="100%" mh="200px" /> {/* <img src={props.url} alt="person-image" /> */}
      <div>
        <p className="name">{props.name}</p>
        <p>{props.post}</p>
        <p>{props.promotion}</p>
      </div>
    </PersonStyle>
  );
};

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
              <BgImageStyle>
                <img src="/img/alloffame/RaptorJesus.jpg" />
              </BgImageStyle>
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
              <BgImageStyle>
                <img src="/img/alloffame/nahed.jpg" />
              </BgImageStyle>
            </Box>
          </Flex>
          <h3>Les didacteurs</h3>
          <Flex wrap>
            <Box p={2} width={[1, 1 / 4]}>
              <Person
                url="/img/alloffame/nahed.jpg"
                name={'Yann' + ' ' + 'Nahed'}
                post={'Président'}
                promotion={'2013 / 2014'} />
            </Box>
            <Box p={2} width={[1, 1 / 4]}>
              <Person
                url="/img/alloffame/cuver.jpg"
                name={'Martin' + ' ' + 'De Cuverville'}
                post={'Président'}
                promotion={'2014'} />
            </Box>
            <Box p={2} width={[1, 1 / 4]}>
              <Person
                url="/img/alloffame/danny.jpg"
                name={'Danny' + ' ' + 'Canaan'}
                post={'Président'}
                promotion={'2014 / 2015'} />
            </Box>
            <Box p={2} width={[1, 1 / 4]}>
              <Person
                url="/img/alloffame/raph.jpg"
                name={'Raphael' + ' ' + 'Lefebure'}
                post={'Vice-Président'}
                promotion={'2014 / 2015'} />
            </Box>
            <Box p={2} width={[1, 1 / 4]}>
              <Person
                url="/img/alloffame/pontier.jpg"
                name={'Aurélien' + ' ' + 'Pontier'}
                post={'Président'}
                promotion={'2015 / 2016'} />
            </Box>
            <Box p={2} width={[1, 1 / 4]}>
              <Person
                url="/img/alloffame/ratel.jpg"
                name={'Antoine' + ' ' + 'Ratel'}
                post={'Vice-Président'}
                promotion={'2015 / 2016'} />
            </Box>
            <Box p={2} width={[1, 1 / 4]}>
              <Person
                url="/img/alloffame/bado.jpg"
                name={'Lucas' + ' ' + 'Bado'}
                post={'Président'}
                promotion={'2016 / 2018'} />
            </Box>
            <Box p={2} width={[1, 1 / 4]}>
              <Person
                url="/img/alloffame/darny.jpg"
                name={'Olivier' + ' ' + 'Darny'}
                post={'Vice-Président'}
                promotion={'2016 / 2017'} />
            </Box>
            <Box p={2} width={[1, 1 / 4]}>
              <Person
                url="/img/alloffame/quillet.jpg"
                name={'Sébastien' + ' ' + 'Quillet'}
                post={'Vice-Président'}
                promotion={'2017 / 2018'} />
            </Box>
          </Flex>
          <h3>Les rambos</h3>
          <Flex wrap>
            <Box p={2} width={[1, 1 / 4]}>
              <Person
                url="/img/alloffame/mathu.jpg"
                name={'Mathurin' + ' ' + 'Desplats'}
                post={'SecGen / Respo montage'}
                promotion={'2014 / 2016'} />
            </Box>
            <Box p={2} width={[1, 1 / 4]}>
              <Person
                url="/img/alloffame/desmalades.jpg"
                name={'Charles' + ' ' + 'Desmalades'}
                post={'Respo montage'}
                promotion={'2015 / 2016'} />
            </Box>
            <Box p={2} width={[1, 1 / 4]}>
              <Person
                url="/img/alloffame/hugo.jpg"
                name={'Hugo' + ' ' + 'Nicolas'}
                post={'SecGen / Respo montage'}
                promotion={'2015 / 2017'} />
            </Box>
            <Box p={2} width={[1, 1 / 4]}>
              <Person
                url="/img/alloffame/sauvage.jpg"
                name={'Pierre' + ' ' + 'Sauvage'}
                post={'SecGen'}
                promotion={'2016 / 2018'} />
            </Box>
          </Flex>
        </FluidContent>
      </div>
    );
  };
};

export default HallOfFame;
