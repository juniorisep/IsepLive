// @flow

import React, {Component} from 'react';
import styled from 'styled-components';
import {Box, Flex} from 'grid-styled';
import {Link} from 'react-router-dom';
import {Banner, Filler, FluidContent, Header, Image, SearchBar} from 'components/common';

const ClubTile = (props) => {
  const ClubStyle = styled.div`
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    > img {
      width: 100%;
    }
    > p {
      padding: 10px;
      margin: 0;
      text-align: center;
      font-size: 1.2em;
      font-weight: bold;
      color: ${props => props.theme.main};
    }
  `;
  return (
    <ClubStyle>
      <Image src={props.url} mb="5px" />
      <p>{props.name}</p>
    </ClubStyle>
  );
};

class Club extends Component {
  render() {
    return (
      <div>
        <Header url="/img/background.jpg">
          <Filler h={50} />
          <Banner>
            <h1>Associations</h1>
            <p>Participez à la vie étudiante de l'ISEP</p>
          </Banner>
          <FluidContent p="0">
            <SearchBar placeholder="Rechercher des associations" />
          </FluidContent>
        </Header>
        <FluidContent>
          <Flex wrap>
            {
              this.props.clubs.map(e => {
                return (
                  <Box key={e.id} w={[1, 1 / 3, 1 / 4]} p={2}>
                    <Link to={`/associations/${e.id}`}>
                      <ClubTile url={e.logoUrl} name={e.name} />
                    </Link>
                  </Box>
                )
              })
            }
          </Flex>
        </FluidContent>
      </div>
    );
  };
};

export default Club;
