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

import {
  Banner,
  Filler,
  FluidContent,
  Header,
  ProfileImage,
  SearchBar,
  Text
} from 'components/common';
import { MAIN_COLOR } from '../../colors';
import Loader from 'components/Loader';

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
      <ProfileImage src={props.url} sz="100%" mh="200px" /> {/* <img src={props.url} alt="person-image" /> */}
      <div>
        <p className="name">{props.name}</p>
        <p>Promo {props.promotion}</p>
      </div>
    </PersonStyle>
  );
};

const STYLE_CONTAINER = {
  display: 'flex',
  flexWrap: 'wrap',
}

const STYLE_FORMCONTROL = {
  minWidth: 120,
  maxWidth: 300,
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const years = [
  '2017',
  '2018',
  '2019',
  '2020',
  '2021',
];

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
          <Flex align="center">
            <Box>
              {this.props.isSearching && <Text>{this.props.students.length} étudiants trouvé</Text>}
            </Box>
            <Box flex="0 0 auto" ml="auto">
              <div style={STYLE_CONTAINER}>
                <FormControl style={STYLE_FORMCONTROL}>
                  <InputLabel htmlFor="year-multiple">Promotions</InputLabel>
                  <Select
                    multiple
                    value={this.props.year}
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
                            fontWeight: 500,
                            color: this.props.year.indexOf(year) !== -1 ? MAIN_COLOR : 'black',
                          }}
                        >
                          {year}
                        </MenuItem>
                      ))
                    }
                  </Select>
                  <FormHelperText>Sélection multiple</FormHelperText>
                </FormControl>
              </div>
            </Box>
            <Box flex="0 0 auto" ml="10px">
              <div style={STYLE_CONTAINER}>
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
              </div>
            </Box>
          </Flex>
          <Loader loading={this.props.loading}>
            <Flex wrap>
              {
                this.props.students.map(e => {
                  return (
                    <Box key={e.id} w={[1, 1 / 3, 1 / 5]} p={2}>
                      <Link to={`/annuaire/${e.id}`}>
                        <Person
                          url={e.photoUrl}
                          name={e.firstname + ' ' + e.lastname}
                          promotion={e.promo} />
                      </Link>
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
