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
  open: false,
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
            <Box flex="0 0 auto">
              8 personnes correspondent à votre recherche</Box>
            <Box ml="auto">
              <Button color="primary" raised onClick={this.handleClickOpen}>Trier par</Button>
            </Box>
            <SearchFilter
              open={this.state.open}
              handleRequestClose={this.handleRequestClose}
              onChange={this.handleChangeFilter}
            />
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

function SearchFilter(props) {
  return (
    <Dialog open={props.open} transition={Slide} onRequestClose={props.handleRequestClose}>
      <DialogTitle>Trier par</DialogTitle>
      <DialogContent>
        <Flex align="center">
          <Box flex="0 0 auto" ml="10px">
            <Button color="primary" raised>Genre</Button> {/* TODO Trier par prends ces arguments */}
          </Box>
          <Box flex="0 0 auto" ml="10px">
            <Button color="primary" raised>Promotion</Button>
          </Box>
          <Box flex="0 0 auto" ml="10px">
            <Button color="primary" raised>Groupe</Button>
          </Box>
        </Flex>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleRequestClose} color="primary">
          Annuler
        </Button>
        <Button color="accent">
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
};
