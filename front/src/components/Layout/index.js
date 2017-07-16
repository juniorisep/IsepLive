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

import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import Home from '../../pages/home';
import Media from '../../pages/media';
import AddressBook from '../../pages/addressbook';
import Club from '../../pages/club';
import Events from '../../pages/events';
import NotFound from '../../pages/404'

import { MAIN_COLOR, SECONDARY_COLOR } from '../../colors';
import { FluidContent } from '../common';

const Logo = styled.img`
  height: 50px;
  margin-right: 20px;
  cursor: pointer;
`;

const Profile = styled.div`
  display: flex;
  padding: 5px;
  border-radius: 5px;
  margin: 5px 0;
  margin-left: 5px;

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

const NavMenu = styled.div`
  flex: 1 1 auto;
  > div {
    display: flex;
  }
  > div > div a {
    margin: 0 5px;
  }
  > div > div {
    flex: 1 1 auto;
    text-align: center;
    border-right: 2px solid white;
  }
  > div > div:first-child {
    border-left: 2px solid white;
  }
  @media (max-width: 62em) {
    display: none;
  }
`;
const SocialBox = styled.div`
  width: 100%;
  text-align: center;
  > h2 {
    margin: 0;
    margin-bottom: 5px;
    text-transform: uppercase;
    color: white;
    font-size: 11px;
  }
  img {
    width: 100%;
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
    <div>
      <Button
        color="contrast"
        component={NavLink}
        to={props.to} activeStyle={{
          color: SECONDARY_COLOR,
        }}>{props.children}</Button>
    </div>
  )
}

function SideNav(props) {
  return (
    <NavLink to={props.to}>
      <ListItem button>
        <ListItemText primary={props.children} />
      </ListItem>
    </NavLink>
  )
}


const navList = (Component) => (
  <div>
    <Component to="/accueil">Accueil</Component>
    <Component to="/media">Media</Component>
    <Component to="/annuaire">Annuaire</Component>
    <Component to="/associations">Associations</Component>
    <Component to="/evenements">Evenements</Component>
    <Component to="/whoarewe">Qui sommes-nous ?</Component>
  </div>
)

class Layout extends React.Component {

  state = {
    sidebarOpen: false,
  }

  handleSideBarClose = () => {
    this.setState({ sidebarOpen: false });
  }

  render() {
    const props = this.props;
    const classes = props.classes;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Logo
              src="img/iseplive.jpg"
              alt="isep live logo"
              onClick={() => this.setState({ sidebarOpen: true })}
            />
            <NavMenu>
              {navList(Nav)}
            </NavMenu>
            <Profile>
              <img src="https://numeris-isep.fr/img/team//amalric.resized.jpg" alt=""/>
              <div>
                <span>Victor</span>
                <span>Ely</span>
              </div>
            </Profile>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={this.state.sidebarOpen}
          onRequestClose={this.handleSideBarClose}
          onClick={this.handleSideBarClose}
        >
          {navList(SideNav)}
        </Drawer>
        <Switch>
          <Redirect path="/" exact to="/accueil" />
          <Route path="/accueil" component={Home} />
          <Route path="/media" component={Media} />
          <Route path="/annuaire" component={AddressBook} />
          <Route path="/associations" component={Club} />
          <Route path="/evenements" component={Events} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer>
          <FluidContent>
            <Flex wrap>
              <Box w={[ 1, 1, 2/6 ]} p={2}>
                <h4>CONTACT</h4>
                <p>28, Rue Notre Dame des Champs</p>
                <p>75 006 Paris</p>
                <p>+33 00 00 00 00 00</p>
                <p>iseplive@gmail.com</p>
              </Box>
              <Box w={[ 1, 1, 1/6 ]} p={2}>
                <img src="img/iseplive.jpg" alt="logo" width="100%"/>
              </Box>
              <Box w={[ 1, 1, 1/6 ]} p={2}>
                <img src="img/iseplive.jpg" alt="logo" width="100%"/>
              </Box>
              <Box w={[ 1, 1, 2/6 ]} p={2}>
                <SocialBox>
                  <h2>Suivez-nous sur les réseaux de l'internet</h2>
                  <Flex>
                    <Box width={1/4} p={1}>
                      <img src="img/iseplive.jpg" alt="logo"/>
                    </Box>
                    <Box width={1/4} p={1}>
                      <img src="img/iseplive.jpg" alt="logo"/>
                    </Box>
                    <Box width={1/4} p={1}>
                      <img src="img/iseplive.jpg" alt="logo"/>
                    </Box>
                    <Box width={1/4} p={1}>
                      <img src="img/iseplive.jpg" alt="logo"/>
                    </Box>
                  </Flex>
                </SocialBox>
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
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Layout);
