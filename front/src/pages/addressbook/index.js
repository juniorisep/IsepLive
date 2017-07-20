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
import Button from 'material-ui/Button';

const Person = (props) => {
  const PersonStyle = styled.div`
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    > img {
      width: 100%;
    }
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
  return (
    <PersonStyle>
      <img src={props.url} alt="person-image"/>
      <div>
        <p className="name">{props.name}</p>
        <p>Promo {props.promotion}</p>
      </div>
    </PersonStyle>
  )
}

class AddressBook extends Component {
  render() {
    return (
      <div>
        <Header url="img/background.jpg">
          <Filler h={50} />
          <Banner>
            <h1>Annuaire</h1>
            <p>Si vous voulez stalker, c'est ici que ça se passe !</p>
          </Banner>
          <FluidContent p="0">
            <Flex align="center">
              <Box flex="1 1 auto">
                <SearchBar placeholder="Rechercher des ami(e)s"/>
              </Box>
              <Box flex="0 0 auto" ml="10px">
                <Button color="primary" raised>Genre</Button>
              </Box>
              <Box flex="0 0 auto" ml="10px">
                <Button color="primary" raised>Promotion</Button>
              </Box>
              <Box flex="0 0 auto" ml="10px">
                <Button color="primary" raised>Groupe</Button>
              </Box>
            </Flex>
          </FluidContent>
        </Header>
        <FluidContent>
          <Flex align="center">
            <Box flex="0 0 auto"> 8 personnes correspondent à votre recherche</Box>
            <Box ml="auto">
              <Button color="primary" raised>Modifier l'Affichage</Button>
            </Box>
            <Box ml="10px">
              <Button color="primary" raised>Trier par</Button>
            </Box>
          </Flex>
          <Flex wrap>
            {
              '------------------'.split('').map(e => {
                return (
                  <Box w={[ 1, 1/3, 1/5 ]} p={2}>
                    <Person
                      url="https://numeris-isep.fr/img/team//amalric.resized.jpg"
                      name="Amalric de Buffiere"
                      promotion={2019}
                    />
                  </Box>
                )
              })
            }
          </Flex>
        </FluidContent>
      </div>
    );
  }
}

export default AddressBook;
