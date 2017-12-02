// @flow

import React from 'react';

import styled from 'styled-components';
import { Box, Flex } from 'grid-styled';
import Tabs, { Tab } from 'material-ui/Tabs';
import MUIButton from 'material-ui/Button';
import ExploreAction from 'material-ui-icons/Explore';

import {
  FluidContent,
  Image,
  Text,
  Title,
  Header,
  Banner,
  Filler,
  SearchBar,
  ScrollToTopOnMount,
} from 'components/common';

import { BACKGROUND_COLOR } from '../../../colors';

import UpdateClubForm from './UpdateClubForm';

const Explore = styled(ExploreAction) `
  margin-right: 10px;
`;

const Button = styled(MUIButton) `
  margin-top: ${props => props.mt || '0'};
`;

export default function ClubDetailView(props) {
  return (
    <div style={{ background: BACKGROUND_COLOR }}>
      <ScrollToTopOnMount />
      <FluidContent>
        <Flex>
          <Box>
            <Image src={props.logoUrl} w="150px" />
          </Box>
          <Box ml={3}>
            <Title invert>{props.name}</Title>
            <Text>{props.description}</Text>
            <Flex mt="15px">
              <Box>
                <Button href={props.website} target="_blank" rel="noopener noreferrer" color="accent">
                  <Explore /> Site internet
                </Button>
              </Box>
              <Box>
                <Button onClick={props.onDelete}>
                  Supprimer
                </Button>
              </Box>
              <Box>
                <Button onClick={props.onEdit}>
                  Modifier
                </Button>
              </Box>
            </Flex>
          </Box>
        </Flex>
        <UpdateClubForm
          title="Modifier l'association"
          open={props.formOpen}
          form={props.formData}
          handleRequestClose={props.closeForm}
          onSave={props.updateClub}
        />
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
