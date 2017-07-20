// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import { Flex, Box } from 'grid-styled';

import {
  FluidContent,
  Header,
  SearchBar,
  Filler,
  Banner,
} from '../../components/common';

const Person = (props) => {
  const PersonStyle = styled.div`
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    > img {
      width: 100%;
    }
  `;
  return (
    <PersonStyle>
      <img src={props.url} alt="person-image"/>
    </PersonStyle>
  )
}

class Resume extends Component {
  render() {
    return (
      <div>
        <Header url="img/background.jpg">
          <Filler h={50} />
          <Banner>
            <h1>Profile</h1>
            <p>Ton petit jardin secret</p>
          </Banner>
          <FluidContent p="0">
            <SearchBar placeholder="Rechercher"/>
          </FluidContent>
        </Header>
        <FluidContent>
          <Flex wrap>
            <Box px={2} py={1} width={1/4}>
              <Person
                url="https://numeris-isep.fr/img/team//amalric.resized.jpg"
              />
          	</Box>
            <Box px={2} py={1} width={3/4}>
              Informations
            </Box>
            <Box px={2} py={1} width={1/1}>
              Citation
            </Box>
            <Box px={2} py={1} width={1/1}>
              Association
            </Box>
            <Box px={2} py={1} width={1/1}>
              Publications
            </Box>
          </Flex>
        </FluidContent>
      </div>
    );
  }
}

export default Resume;
