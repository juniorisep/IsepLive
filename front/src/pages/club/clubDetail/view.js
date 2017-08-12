import React, { Component } from 'react';

import styled from 'styled-components';
import {Flex, Box} from 'grid-styled';
import Tabs, { Tab } from 'material-ui/Tabs';

import {
  FluidContent,
  Image,
  Text,
  Title,
} from '../../../components/common';


export default function ClubDetailView(props) {
  return (
    <div>
      <FluidContent>
        <Flex>
          <Box>
            <Image src={props.logoUrl} w="150px" />
          </Box>
          <Box ml={2}>
            <Title invert>{props.name}</Title>
            <Text>{props.description}</Text>
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
