import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import {
  Separator,
  FluidContent,
  Header,
  Title,
  SearchBar,
  Filler,
  Banner,
} from '../../components/common';
import Button from 'material-ui/Button';

const ClubTile = (props) => {
  const ClubStyle = styled.div`
    padding: 5px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    > img {
      width: 100%;
      padding: 5px;
    }
    > p {
      margin: 0;
      text-align: center;
      font-size: 1.2em;
      padding-bottom: 5px;
      color: ${props => props.theme.main};
    }
  `;
  return (
    <ClubStyle>
      <img src={props.url} alt="club-image"/>
      <p>{props.name}</p>
    </ClubStyle>
  )
}

class Club extends Component {
  render() {
    return (
      <div>
        <Header url="img/background.jpg">
          <Filler h={50} />
          <Banner>
            <h1>Associations</h1>
            <p>Participez à la vie étudiante de l'ISEP</p>
          </Banner>
          <FluidContent p="0">
            <SearchBar placeholder="Rechercher des associations"/>
          </FluidContent>
        </Header>
        <FluidContent>
          <Flex wrap>
            {
              '----------'.split('').map(e => {
                return (
                  <Box w={[1, 1/3, 1/4]} p={2}>
                    <ClubTile url="img/iseplive.jpg" name="Isep Live" />
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

export default Club;
