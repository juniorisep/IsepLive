// @flow

import React from 'react';

import PropTypes from 'prop-types';

import {NavLink, Route, Switch, Redirect} from 'react-router-dom';
import styled from 'styled-components';
import {Flex, Box} from 'grid-styled';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Menu, {MenuItem} from 'material-ui/Menu';

import Drawer from 'material-ui/Drawer';
import {ListItem, ListItemText} from 'material-ui/List';

import Auth from '../../components/Auth/AuthComponent';
import AuthenticatedRoute from '../../components/Auth/AuthenticatedRoute';

import Home from '../../pages/home';
import Media from '../../pages/media';
import AddressBook from '../../pages/addressbook';
import Club from '../../pages/club';
import ClubDetail from '../../pages/club/clubDetail';
import Events from '../../pages/events';
import NotFound from '../../pages/404';
import Resume from '../../pages/resume';
import Whoarewe from '../../pages/whoarewe';
import Admin from '../../pages/administration';
import Contact from '../../pages/contact';
import Help from '../../pages/help';
import LegalNotice from '../../pages/legalNotice';
import UserAgreement from '../../pages/userAgreement';

import {MAIN_COLOR, SECONDARY_COLOR} from '../../colors';
import {FluidContent} from '../common';

import * as authData from '../../data/auth';

import Profile from './profile';

const Logo = styled.img `
  height: 50px;
  margin-right: 20px;
  cursor: pointer;
`;

const Footer = styled.footer `
  background: ${MAIN_COLOR};
  padding: 20px;
  color: white;
  p, h4 {
    margin: 0;
    margin-bottom: 5px;
  }
`;

const LinksBar = styled.div `
  background: ${SECONDARY_COLOR};
  color: white;
  padding: 10px 0;
  font-weight: bold;
  > div {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 50px;
  }
`;

const NavMenu = styled.div `
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
  @media (max-width: 63em) {
    display: none;
  }
`;
const SocialBox = styled.div `
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
    width: '100%'
  },
  flex: {
    flex: 1
  }
});

function Nav(props) {
  return (
    <div>
      <Button color="contrast" component={NavLink} to={props.to} activeStyle={{
        color: SECONDARY_COLOR
      }}>{props.children}</Button>
    </div>
  )
}

function SideNav(props) {
  return (
    <NavLink to={props.to}>
      <ListItem button>
        <ListItemText primary={props.children}/>
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
    anchorEl: undefined,
    open: false
  }

  Profile = undefined;

  handleSideBarClose = () => {
    this.setState({sidebarOpen: false});
  }

  handleClick = event => {
    this.setState({open: true, anchorEl: event.currentTarget});
  };

  handleRequestClose = () => {
    this.setState({open: false});
  };

  handleDisconnect = () => {
    authData.logout();
    this.setState({open: false});
  }

  render() {
    const props = this.props;
    const classes = props.classes;
    return (
      <div className={classes.root}>
        <AppBar style={{ position: 'relative' }}>
          <Toolbar>
            <Logo
              src="/svg/iseplive.svg"
              alt="isep-live-logo"
              onClick={() => this.setState({sidebarOpen: true})} />
            <NavMenu>
              {navList(Nav)}
            </NavMenu>

            <Auth roles={['ROLE_USER']}>
              <Profile onClick={this.handleClick} />
              <Menu id="simple-menu"
                anchorEl={this.state.anchorEl}
                open={this.state.open}
                onRequestClose={this.handleRequestClose} >
                <MenuItem onClick={this.handleRequestClose} component={NavLink} to="/administration">Administration</MenuItem>
                <MenuItem onClick={this.handleRequestClose} component={NavLink} to="/profile">Profil</MenuItem>
                <MenuItem onClick={this.handleDisconnect} component={NavLink} to="/connexion">Déconnexion</MenuItem>
              </Menu>
            </Auth>
            <Auth not>
              <Button color="contrast" component={NavLink} to="/connexion">Accueil</Button>
            </Auth>
          </Toolbar>
        </AppBar>
        {window.innerWidth < 1009 && <Drawer anchor="left" open={this.state.sidebarOpen} onRequestClose={this.handleSideBarClose} onClick={this.handleSideBarClose}>
          {navList(SideNav)}
        </Drawer>
        }
        <Switch>
          <Redirect path="/" exact to="/accueil"/>
          <Route path="/accueil" component={Home}/>
          <Route path="/media" component={Media}/>
          <Route path="/annuaire" component={AddressBook}/>
          <Route exact path="/associations" component={Club}/>
          <Route path="/associations/:id" component={ClubDetail}/>
          <Route path="/evenements" component={Events}/>
          <Route path="/profile" component={Resume}/>
          <Route path="/whoarewe" component={Whoarewe}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/aide" component={Help}/>
          <Route path="/convention-utilisation" component={UserAgreement}/>
          <Route path="/mentions-legales" component={LegalNotice}/>
          <AuthenticatedRoute roles={['ROLE_ADMIN']} path="/administration" component={Admin}/>
          <Route path="*" component={NotFound}/>
        </Switch>
        <Footer>
          <FluidContent>
            <Flex wrap>
              <Box w={[
                1, 1, 2 / 6
              ]} p={2}>
                <h4>CONTACT</h4>
                <p>28, rue Notre Dame des Champs</p>
                <p>75 006 PARIS</p>
                <p>iseplive@gmail.com</p>
              </Box>
              <Box w={[ 1, 1, 2 / 6 ]} p={2}>
                <SocialBox>
                  <h2>Suivez-nous sur les réseaux de l'internet</h2>
                  <Flex>
                    <Box width={1 / 4} p={1}>
                      <a href="https://www.facebook.com/IsepLive/?fref=ts" target="_blank" rel="noopener noreferrer"><img src="/svg/facebook.svg" alt="Facebook logo"/></a>
                    </Box>
                    <Box width={1 / 4} p={1}>
                      <a href="https://twitter.com/iseplive" target="_blank" rel="noopener noreferrer"><img src="/svg/twitter.svg" alt="Twitter logo"/></a>
                    </Box>
                    <Box width={1 / 4} p={1}>
                      <a href="https://www.instagram.com/iseplive/" target="_blank" rel="noopener noreferrer"><img src="/svg/instagram.svg" alt="Instagram logo"/></a>
                    </Box>
                    <Box width={1 / 4} p={1}>
                      <a href="" target="_blank" rel="noopener noreferrer"><img src="/svg/snapchat.svg" alt="Snapchat logo"/></a>
                    </Box>
                  </Flex>
                </SocialBox>
              </Box>
              <Box w={[ 1, 1, 2 / 6 ]} p={2}>
                <SocialBox>
                  <h2>Partenaires</h2>
                  <Flex>
                    <Box width={1 / 3} p={1}>
                      <a href="https://www.juniorisep.com" target="_blank" rel="noopener noreferrer"><img src="/img/partenaires/juniorisep.png" alt="Junior ISEP logo" width="100%"/></a>
                    </Box>
                    <Box width={1 / 3} p={1}>
                      <a href="http://www.alten.fr/" target="_blank" rel="noopener noreferrer"><img src="/img/partenaires/alten.png" alt="Alten logo"/></a>
                    </Box>
                    <Box width={1 / 3} p={1}>
                      <a href="https://www.facebook.com/cosmozbde/?fref=ts" target="_blank" rel="noopener noreferrer"><img src="/img/partenaires/cosmoz.png" alt="Cosmoz logo"/></a>
                    </Box>
                  </Flex>
                </SocialBox>
              </Box>
            </Flex>
          </FluidContent>
        </Footer>
        <LinksBar>
          <div>
            <span>© 2017 ISEPLive
            </span>
            <Button color="contrast" component={NavLink} to="/aide" activeStyle={{
              color: MAIN_COLOR
            }}>Aide</Button>
            <Button color="contrast" component={NavLink} to="/mentions-legales" activeStyle={{
              color: MAIN_COLOR
            }}>Mentions Légales</Button>
            <Button color="contrast" component={NavLink} to="/convention-utilisation" activeStyle={{
              color: MAIN_COLOR
            }}>Convention d'utilisation</Button>
            <Button color="contrast" component={NavLink} to="/contact" activeStyle={{
              color: MAIN_COLOR
            }}>Contact</Button>
          </div>
        </LinksBar>
      </div>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet)(Layout);
