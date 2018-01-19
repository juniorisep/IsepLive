// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'grid-styled';
import { Link } from 'react-router-dom';
import {
  Banner,
  Filler,
  FluidContent,
  Header,
  BgImage,
  SearchBar,
  Text,
} from 'components/common';

import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import Auth from 'components/Auth/AuthComponent';
import Loader from '../../components/Loader';

import AddClubForm from './AddClubForm';

import * as roles from '../../constants';


const ClubTile = (props) => {
  const ClubStyle = styled.div`
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    width: 100%;

    > p {
      padding: 10px;
      margin: 0;
      text-align: center;
      font-size: 1.2em;
      font-weight: 500;
      color: ${props => props.theme.main};
    }
  `;
  return (
    <ClubStyle>
      <BgImage src={props.url} mh="200px" />
      <p>{props.name}</p>
    </ClubStyle>
  );
};

export default class Club extends Component {
  state = {
    open: false,
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {

  }

  render() {
    const { loading } = this.props;
    return (
      <div>
        <Header url="/img/background.jpg">
          <Filler h={50} />
          <Banner>
            <h1>Associations</h1>
            <p>Participez à la vie étudiante de l'ISEP</p>
          </Banner>
          {/* <FluidContent p="0">
            <SearchBar placeholder="Rechercher des associations" />
          </FluidContent> */}
        </Header>
        <FluidContent>
          <Auth roles={[roles.ADMIN, roles.CLUB_MANAGER]}>
            <Flex>
              <Box ml="auto">
                <Button fab color="primary" aria-label="add" onClick={() => this.setState({ open: true })}>
                  <AddIcon />
                </Button>
              </Box>
              <AddClubForm
                title="Ajouter une association"
                open={this.state.open}
                handleRequestClose={this.handleRequestClose}
                onSave={this.props.addClub}
              />
            </Flex>
          </Auth>
          <Loader loading={loading}>
            {
              this.props.clubs.length === 0 &&
              <div style={{ textAlign: 'center', minHeight: 300, marginTop: 100 }}>
                <Text fs="2em">Aucune association</Text>
              </div>
            }
            <Flex wrap>
              {
                this.props.clubs.map(e => {
                  return (
                    <Box key={e.id} w={[1, 1 / 3, 1 / 4]} p={2}>
                      <Link to={`/associations/${e.id}`}>
                        <ClubTile url={e.logoUrl} name={e.name} />
                      </Link>
                    </Box>
                  );
                })
              }
            </Flex>
          </Loader>
        </FluidContent>
      </div>
    );
  };
};
