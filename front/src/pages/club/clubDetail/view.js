// @flow

import React from 'react';

import styled from 'styled-components';
import { Box, Flex } from 'grid-styled';

import Tabs, { Tab } from 'material-ui/Tabs';
import MUIButton from 'material-ui/Button';
import ExploreAction from 'material-ui-icons/Explore';

import {
  FluidContent,
  BgImage,
  Text,
  Title,
  ScrollToTopOnMount,
} from 'components/common';

import Popup from 'components/Popup';

import { BACKGROUND_COLOR } from '../../../colors';
import * as authData from '../../../data/auth';
import { ADMIN, CLUB_MANAGER } from '../../../constants';
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
        <Flex wrap>
          <Box w={[1, 1 / 4]} p={2}>
            <BgImage src={props.logoUrl} mh="150px" size="contain" />
          </Box>
          <Box w={[1, 3 / 4]} p={2}>
            <Title invert>{props.name}</Title>
            <Text>{props.description}</Text>
            <Flex mt="15px" wrap>
              <Box>
                <Button href={props.website} target="_blank" rel="noopener noreferrer" color="accent">
                  <Explore /> Site internet
                </Button>
              </Box>
              {
                authData.hasRole([ADMIN, CLUB_MANAGER]) && [
                  <Box key={1}>
                    <Button color="primary" onClick={props.onDelete}>
                      Supprimer
                    </Button>
                  </Box>,
                  <Box key={2}>
                    <Button color="primary" onClick={props.onEdit}>
                      Modifier
                    </Button>
                  </Box>
                ]
              }
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
        <Popup
          title="Suppression"
          description="Voulez vous supprimer cette Association ?"
          open={props.openDeletePopup}
          onRespond={props.deleteAccepted}
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
        {props.isAdmin && <Tab label="Admin" />}
      </Tabs>
      <FluidContent>
        {props.renderTab()}
      </FluidContent>
    </div>
  );
};
