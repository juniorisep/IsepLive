// @flow

import React, {Component} from 'react';
import styled from 'styled-components';
import {Box, Flex} from 'grid-styled';
import {Banner, Filler, FluidContent, Header, ProfileImage, SearchBar} from 'components/common';
import Button from 'material-ui/Button';
import {Link} from 'react-router-dom';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';


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
  state = {
    genre: true,
    promo: false,
    groupe: false,
    open: false,
    year: [],
  };

  handleChange = event => {
    this.setState({ year: event.target.value });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
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
            <Box flex="0 0 auto" ml="auto">
              <Button color="primary" raised onClick={this.handleClickOpen}>Promotion</Button>
            </Box>
            <Dialog open={this.state.open} onRequestClose={this.handleRequestClose} transition={Slide}>
              <DialogTitle>{"Trier par promotion"}</DialogTitle>
              <DialogContent>
                <div style={STYLE_CONTAINER}>
                  <FormControl style={STYLE_FORMCONTROL}>
                    <InputLabel htmlFor="year-multiple">Promotion</InputLabel>
                    <Select
                      multiple
                      value={this.state.year}
                      onChange={this.handleChange}
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
                      {years.map(year => (
                        <MenuItem
                          key={year}
                          value={year}
                          style={{
                            fontWeight: this.state.year.indexOf(year) !== -1 ? '500' : '400',
                          }}
                        >
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleRequestClose} color="primary">
                  Annuler
                </Button>
                <Button onClick={this.handleRequestClose} color="primary">
                  Valider
                </Button>
              </DialogActions>
            </Dialog>
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
