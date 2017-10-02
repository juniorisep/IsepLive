// @flow

import React, {Component} from 'react';
import styled from 'styled-components';
import {Box, Flex} from 'grid-styled';
import {Banner, Filler, FluidContent, Header, ProfileImage, SearchBar} from 'components/common';
import Button from 'material-ui/Button';
import {Link} from 'react-router-dom';

import {FormControlLabel} from 'material-ui/Form';
import Switch from 'material-ui/Switch';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';

const Person = (props) => {
  const PersonStyle = styled.div`
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

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
      <ProfileImage src={props.url} w="100%" /> {/* <img src={props.url} alt="person-image" /> */}
      <div>
        <p className="name">{props.name}</p>
        <p>Promo {props.promotion}</p>
      </div>
    </PersonStyle>
  );
};

export default class AddressBook extends Component {
  state = {
    genre: true,
    promo: true,
    groupe: true
  };

  handleChange = name => (event, checked) => {
    this.setState({ [name]: checked });
  };

  render() {
    return (
      <div>
        <Header url="/img/background.jpg">
          <Filler h={50} />
          <Banner>
            <h1>Annuaire</h1>
            <p>Si vous voulez stalker, c'est ici que ça se passe !</p>
          </Banner>
          <FluidContent p="0">
            <Flex align="center">
              <Box flex="1 1 auto">
                <SearchBar placeholder="Rechercher des ami(e)s" onChange={(e) => this.props.onSearch(e.target.value)} />
              </Box>
            </Flex>
          </FluidContent>
        </Header>
        <FluidContent>
          <Flex align="center">
            <Box mb={2}>
              <FormControlLabel control={< Switch checked={
                this.state.genre
              }
                onChange={
                  this.handleChange('genre')
                } />} label="genre" />
              <FormControlLabel control={< Switch checked={
                this.state.promo
              }
                onChange={
                  this.handleChange('promo')
                } />} label="promotion" />
              <FormControlLabel control={< Switch checked={
                this.state.groupe
              }
                onChange={
                  this.handleChange('groupe')
                } />} label="groupe" />

            </Box>
          </Flex>
          <Flex wrap>
            {
              this.props.students.map(e => {
                return (
                  <Box key={e.id} w={[1, 1 / 3, 1 / 5]} p={2}>
                    <Link to={`/annuaire/${e.id}`}>
                      <Person url={e.photoUrl} name={e.firstname + ' ' + e.lastname} promotion={e.promo} />
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
