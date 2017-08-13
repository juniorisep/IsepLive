// @flow

import React from 'react';

import styled from 'styled-components';
import {Box, Flex} from 'grid-styled';
import Tabs, {Tab} from 'material-ui/Tabs';
import MUIButton from 'material-ui/Button';
import ExploreAction from 'material-ui-icons/Explore';

import {FluidContent, Image, ScrollToTopOnMount, Text, Title,} from '../../../components/common';

const Explore = styled(ExploreAction)`
  margin-right: 10px;
`;


const Button = styled(MUIButton)`
  margin-top: ${props => props.mt || '0'};
`;

export default function ClubDetailView(props) {
  return (
    <div>
      <ScrollToTopOnMount />
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
        index={props.tabIndex}
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
  )
}
