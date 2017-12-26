// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'grid-styled';
import { Link } from 'react-router-dom';

import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';

import { Banner, Filler, FluidContent, Header, ProfileImage, SearchBar, Text } from 'components/common';
import { MAIN_COLOR } from '../../colors';
import Loader from 'components/Loader';

import * as authData from '../../data/auth';

const getPromo = (promo, render) => {
  const date = new Date();
  date.setFullYear(new Date().getFullYear() + 5);
  let lastPromo = date.getFullYear();
  if (date.getMonth() < 9) {
    lastPromo--;
  }
  let display = ""
  switch (promo) {
    case lastPromo:
      display = "Sup";
      break;
    case lastPromo - 1:
      display = "Spe";
      break;
    case lastPromo - 2:
      display = "A1";
      break;
    case lastPromo - 3:
      display = "A2";
      break;
    case lastPromo - 4:
      display = "A3";
      break;

    default:
      return false;
  }
  if (render) {
    return render(display);
  }

  return display;
}

const Person = (props) => {
  const MainText = styled.div`
    padding: 10px;
    color: ${props => props.theme.main};
    p {
      margin: 0;
    }
    p.name {
      font-weight: 500;
      margin-bottom: 5px;
    }
  `;
  return (
    <div style={{ boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}>
      <ProfileImage src={props.url} sz="100%" mh="200px" />
      <MainText>
        <p className="name">{props.name}</p>
        <p>Promo {props.promotion} {getPromo(props.promotion, v => `(${v})`) || ''}</p>
      </MainText>
    </div>
  );
};

const STYLE_FORMCONTROL = {
  width: '100%',
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

let now = new Date().getFullYear();
let years = [];
for (var i = 5; i > -15; i--) {
  years.push(now + i);
};

export default class AddressBook extends Component {
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
                <SearchBar placeholder="Rechercher des ami(e)s" onChange={this.props.onSearch} />
              </Box>
            </Flex>
          </FluidContent>
        </Header>
        <FluidContent>
          <Flex align="center" wrap>
            <Box>
              {this.props.isSearching && <Text>{this.props.total} étudiants trouvé</Text>}
            </Box>
            <Box flex="0 0 auto" ml="auto" w={['100%', 120]}>
              <FormControl style={STYLE_FORMCONTROL}>
                <InputLabel htmlFor="year-multiple">Promotions</InputLabel>
                <Select
                  multiple
                  value={this.props.year}
                  renderValue={years => years.map(year => getPromo(year) || year).join(', ')}
                  onChange={this.props.onPromoFilter}
                  input={<Input id="year-multiple" />}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                        width: 200,
                      },
                    },
                  }}
                >
                  {
                    years.map(year => (
                      <MenuItem
                        key={year}
                        value={year}
                        style={{
                          background: 'none',
                          fontWeight: this.props.year.indexOf(year) !== -1 ? 500 : 'normal',
                          color: this.props.year.indexOf(year) !== -1 ? MAIN_COLOR : 'black',
                        }}
                      >
                        <span>{year} {getPromo(year, v => `(${v})`) || ''}</span>
                      </MenuItem>
                    ))
                  }
                </Select>
                <FormHelperText>Sélection multiple</FormHelperText>
              </FormControl>
            </Box>
            <Box flex="0 0 auto" ml={[0, 10]} w={['100%', 120]}>
              <FormControl style={STYLE_FORMCONTROL}>
                <InputLabel htmlFor="alpha-simple">Nom</InputLabel>
                <Select
                  value={this.props.alpha}
                  onChange={this.props.onSort}
                  input={<Input id="alpha-simple" />}
                >
                  <MenuItem value='a'>Az</MenuItem>
                  <MenuItem value='z'>Za</MenuItem>
                </Select>
                <FormHelperText>Sélection simple</FormHelperText>
              </FormControl>
            </Box>
          </Flex>
          <Loader loading={this.props.loading}>
            <Flex wrap>
              {
                this.props.students.map(e => {
                  return (
                    <Box key={e.id} w={[1, 1 / 3, 1 / 5]} p={2}>
                      {
                        authData.isLoggedIn() ?
                          <Link to={`/annuaire/${e.id}`}>
                            <Person
                              url={e.photoUrlThumb}
                              name={e.firstname + ' ' + e.lastname}
                              promotion={e.promo} />
                          </Link>
                          :
                          <Person
                            url={e.photoUrlThumb}
                            name={e.firstname + ' ' + e.lastname}
                            promotion={e.promo} />
                      }
                    </Box>
                  )
                })
              }
            </Flex>
            {
              !this.props.lastPage &&
              <div style={{ textAlign: 'center' }}>
                <Button color="accent" onClick={this.props.onSeeMore}>Voir plus</Button>
              </div>
            }
          </Loader>
        </FluidContent>
      </div>
    );
  };
};
