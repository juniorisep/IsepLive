// @flow

import React from 'react';

import PropTypes from 'prop-types';

import {NavLink, Route, Switch, Redirect} from 'react-router-dom';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import MenuOpen from '../MenuOpen';

import Home from '../../pages/home';
import Media from '../../pages/media';
import AddressBook from '../../pages/addressbook';
import Club from '../../pages/club';
import NotFound from '../../pages/404'

import { MAIN_COLOR, SECONDARY_COLOR } from '../../colors';
import { FluidContent } from '../common';

const Logo = styled.img`
  height: 50px;
  margin-right: 20px;
`;

const Profile = styled.div`
  display: flex;
  padding: 5px;
  border-radius: 5px;
  margin: 5px 0;
  margin-left: auto;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }

  > img {
    height: 40px;
    margin-right: 5px;
  }
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  > div > span {
    display: block;
    font-weight: bold;
    padding: 2px;
  }
`;

const Footer = styled.footer`
  background: ${MAIN_COLOR};
  padding: 20px;
  color: white;
  p, h4 {
    margin: 0;
    margin-bottom: 5px;
  }
`;

const LinksBar = styled.div`
  background: ${SECONDARY_COLOR};
  color: white;
  padding: 10px 0;
  font-weight: bold;
  > div {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 50px;
  }
  a {
    margin: 0 10px;
  }
`;

const styleSheet = createStyleSheet('Layout', {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
});

function Nav(props) {
  return (
    <Button
      color="contrast"
      component={NavLink}
      to={props.to} activeStyle={{
        color: SECONDARY_COLOR,
      }}>{props.children}</Button>
  )
}

function Layout(props) {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Logo
            src="img/iseplive.jpg"
            alt="isep live logo"
          />
          <Nav to="/accueil">Accueil</Nav>
          <Nav to="/media">Media</Nav>
          <Nav to="/annuaire">Annuaire</Nav>
          <Nav to="/associations">Associations</Nav>
          <Nav to="/evenements">Evenements</Nav>
          <Nav to="/whoarewe">Qui sommes-nous ?</Nav>
          <Profile>
            <img src="https://numeris-isep.fr/img/team//amalric.resized.jpg" alt=""/>
            <div>
              <span>Victor</span>
              <span>Ely</span>
            </div>
          </Profile>
        </Toolbar>
      </AppBar>
      <Switch>
        <Redirect path="/" exact to="/accueil" />
        <Route path="/accueil" component={Home} />
        <Route path="/media" component={Media} />
        <Route path="/annuaire" component={AddressBook} />
        <Route path="/associations" component={Club} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer>
        <FluidContent>
          <Flex>
            <Box w={[ 1, 1/4 ]}>
              <h4>CONTACT</h4>
              <p>28, Rue Notre Dame des Champs</p>
              <p>75 006 Paris</p>
              <p>+33 00 00 00 00 00</p>
              <p>iseplive@gmail.com</p>
            </Box>
            <Box w={[ 1, 1/4 ]}>

            </Box>
            <Box w={[ 1, 1/4 ]}>

            </Box>
            <Box w={[ 1, 1/4 ]}>

            </Box>
          </Flex>
        </FluidContent>
      </Footer>
      <LinksBar>
        <div>
          <span>© 2017 ISEP Live </span>
          <a href="">Aide</a>
          <a href="">Mentions Légales</a>
          <a href="">Convention d'utilisation</a>
          <a href="">Contact</a>
        </div>
      </LinksBar>
    </div>
  );
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Layout);
