// @flow

import React from 'react';

import styled from 'styled-components';
import { Box, Flex } from 'grid-styled';
import Tabs, { Tab } from 'material-ui/Tabs';
import MUIButton from 'material-ui/Button';
import ExploreAction from 'material-ui-icons/Explore';

import { FluidContent, Image, Text, Title, Header, Banner, Filler, SearchBar } from 'components/common';

const Explore = styled(ExploreAction) `
  margin-right: 10px;
`;

const Button = styled(MUIButton) `
  margin-top: ${props => props.mt || '0'};
`;

export default function ClubDetailView(props) {
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
        <Flex>
          <Box>
            <Image src={props.logoUrl} w="150px" />
          </Box>
          <Box ml={3}>
            <Title invert>{props.name}</Title>
            <Text>{props.description}</Text>
            <Button href={props.website} color="accent" mt="15px"><Explore /> Site internet</Button>
          </Box>
        </Flex>
      </FluidContent>
      <Tabs
        value={props.tabIndex}
        onChange={props.changeTab}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Membres" />
        <Tab label="Publications" />
      </Tabs>
      <FluidContent>
        {props.renderTab()}
      </FluidContent>
    </div>
  );
};
