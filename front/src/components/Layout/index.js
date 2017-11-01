// @flow

import React from 'react';

import { NavLink, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Box, Flex } from 'grid-styled';

import axios from 'axios';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';

import Drawer from 'material-ui/Drawer';
import { ListItem, ListItemText } from 'material-ui/List';

import Auth from 'components/Auth/AuthComponent';
import AuthenticatedRoute from 'components/Auth/AuthenticatedRoute';

import Home from 'pages/home';
import PostDetail from 'pages/home/PostDetail';
import Media from 'pages/media';
import AddressBook from 'pages/addressbook';
import AddressBookDetail from 'pages/addressbook/addressbookDetail';
import Club from 'pages/club';
import ClubDetail from 'pages/club/clubDetail';
import Events from 'pages/events';
import EventDetail from 'pages/events/eventDetail';
import CalendarEvents from 'pages/events/calendar';
import NotFound from 'pages/404';
import Resume from 'pages/resume';
import Whoarewe from 'pages/whoAreWe';
import Contact from 'pages/contact';
import Help from 'pages/help';
import LegalNotice from 'pages/legalNotice';
import UserAgreement from 'pages/userAgreement';
import Admin from 'pages/administration';

import { MAIN_COLOR, SECONDARY_COLOR } from '../../colors';
import { backUrl, wsUrl } from '../../config';
import { FluidContent } from '../common';

import * as authData from 'data/auth';
import * as userData from 'data/users/student';

import Profile from './profile';
import LoginForm from '../LoginForm';

const Logo = styled.img`
  height: 50px;
  margin-right: 20px;
  cursor: pointer;
`;

const Footer = styled.footer`
  background: ${MAIN_COLOR};
  padding: 20px;
  color: white;

  p,
  h4 {
    margin: 0;
    margin-bottom: 5px;
  }

  h4 {
    text-transform: uppercase;
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

  @media (max-width: 63em) {
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

const Root = styled.div`
  width: 100%;
`;

function Nav(props) {
  return (
    <div>
      <Button color="contrast"
        component={NavLink}
        to={props.to}
        activeStyle={{
          color: SECONDARY_COLOR
        }}>{props.children}</Button>
    </div>
  );
};

function SideNav(props) {
  return (
    <NavLink to={props.to}>
      <ListItem button>
        <ListItemText primary={props.children} />
      </ListItem>
    </NavLink>
  );
};

const navList = (Component) => (
  <div>
    <Component to="/accueil">Accueil</Component>
    <Component to="/media">Media</Component>
    <Component to="/annuaire">Annuaire</Component>
    <Component to="/associations">Associations</Component>
    <Component to="/evenements">Evenements</Component>
    <Component to="/whoarewe">Qui sommes-nous ?</Component>
  </div>
);


const Intercept = (props) => {

  axios.interceptors.response.use((response) => {
    // Do something with response data
    const token = response.headers['authorization'];
    const refreshToken = response.headers['x-refresh-token'];
    if (token && refreshToken) {
      authData.setToken({ token, refreshToken });
    };
    return response;
  }, (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
        case 403:
          authData.logout();
          props.history.push('/');
          break;

        default:
          break;
      };
    };

    // Do something with response error
    return Promise.reject(error);
  });

  return null;
};

const Interceptor = withRouter(Intercept);

class Layout extends React.Component {
  state = {
    sidebarOpen: false,
    anchorEl: undefined,
    open: false,
    connexionOpen: false,
    username: '',
    password: '',
  };

  Profile = undefined;

  componentDidMount() {
    this.restartWS = true;
    this.setupNotifications();
  };

  componentWillUnmount() {
    if (this.conn) {
      this.restartWS = false;
      this.conn.close();
      clearTimeout(this.restartTimeout);
    };
  };

  initWebsocket() {
    this.conn = new WebSocket(wsUrl + '/ws/post');
    this.conn.onopen = () => {
      this.conn.send(localStorage.getItem('token'));
    };

    this.conn.onmessage = (msg) => {
      console.log("message", msg)
      try {
        const message = JSON.parse(msg.data);
        const authorData = message.author;
        const body = authorData.authorType === 'club' ? message.title : message.content;
        const image = authorData.authorType === 'club' ? authorData.logoThumbUrl : authorData.photoUrlThumb;

        Notification.requestPermission(function (status) {
          // console.log(status); // les notifications ne seront affichées que si "autorisées"
          const n = new Notification("Nouveau Post !", { body, icon: backUrl + image }); // this also shows the notification
          const postEvent = new CustomEvent('new-post');
          document.dispatchEvent(postEvent);
        });
      } catch (error) {
        console.log(error)
      };
    };

    this.conn.onclose = (e) => {
      console.log('closing ws', e)
      if (this.restartWS) {
        this.restartTimeout = setTimeout(() => {
          this.initWebsocket();
        }, 5000);
      };
    };
  };

  setupNotifications = async () => {
    if (authData.isLoggedIn()) {
      const res = await userData.getLoggedUser();
      if (res.data.allowNotifications) {
        if (window.WebSocket) {
          this.initWebsocket();
        };
      };
    };
  };

  handleSideBarClose = () => {
    this.setState({ sidebarOpen: false });
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
    this.setState({ connexionOpen: false });
  };

  handleDisconnect = () => {
    authData.logout();
    this.setState({ open: false });
  };

  handleConnect = () => {
    const { username, password } = this.state;
    authData.connect(username, password).then(res => {
      this.handleRequestClose();
      this.props.history.push('/')
    }).catch(err => {
      alert('wooops')
    });
  };

  render() {
    return (
      <Root>
        <Interceptor />
        <AppBar style={{ position: 'relative' }}>
          <Toolbar>
            <Logo
              src="/img/layout/iseplive.png"
              alt="isep-live-logo"
              onClick={() => this.setState({ sidebarOpen: true })} />
            <NavMenu>
              {navList(Nav)}
            </NavMenu>
            <span style={{ marginLeft: 'auto' }}>
              <Auth roles={['ROLE_STUDENT']}>
                <Profile onClick={this.handleClick} />
                <Menu id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  open={this.state.open}
                  onRequestClose={this.handleRequestClose}
                >
                  <MenuItem onClick={this.handleRequestClose} component={NavLink} to="/administration">Administration</MenuItem>
                  <MenuItem onClick={this.handleRequestClose} component={NavLink} to="/profile">Profil</MenuItem>
                  <MenuItem onClick={this.handleDisconnect} component={NavLink} to="/connexion">Déconnexion</MenuItem>
                </Menu>
              </Auth>
            </span>
            <Auth not>
              <Button color="contrast" onClick={() => this.setState({ connexionOpen: true })}>Se connecter</Button>
              <LoginForm
                open={this.state.connexionOpen}
                handleRequestClose={this.handleRequestClose}
                onChange={this.handleLoginForm}
                onConnexion={this.handleConnect}
              />
            </Auth>
          </Toolbar>
        </AppBar>
        {window.innerWidth < 1009 &&
          <Drawer anchor="left" open={this.state.sidebarOpen} onRequestClose={this.handleSideBarClose} onClick={this.handleSideBarClose}>
            {navList(SideNav)}
          </Drawer>
        }
        <Switch>
          <Redirect path="/" exact to="/accueil" />
          <Route path="/accueil" component={Home} />
          <Route path="/post/:id" component={PostDetail} />
          <Route path="/media" component={Media} />
          <Route exact path="/annuaire" component={AddressBook} />
          <Route path="/annuaire/:id" component={AddressBookDetail} />
          <Route exact path="/associations" component={Club} />
          <Route path="/associations/:id" component={ClubDetail} />
          <Route exact path="/evenements" component={Events} />
          <Route path="/evenements/calendrier" component={CalendarEvents} />
          <Route path="/evenements/:id" component={EventDetail} />
          <Route path="/profile" component={Resume} />
          <Route path="/whoarewe" component={Whoarewe} />
          <Route path="/contact" component={Contact} />
          <Route path="/aide" component={Help} />
          <Route path="/convention-utilisation" component={UserAgreement} />
          <Route path="/mentions-legales" component={LegalNotice} />
          {/* <AuthenticatedRoute roles={['ROLE_STUDENT', 'ROLE_ADMIN']} path="/administration" component={Admin} /> */}
          <Route path="/administration" component={Admin} />
          <Route path="*" component={NotFound} />
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
              <Box w={[1, 1, 2 / 6]} p={2}>
                <SocialBox>
                  <h2>Suivez-nous sur les réseaux de l'internet</h2>
                  <Flex>
                    <Box width={1 / 4} p={1}>
                      <a href="https://www.facebook.com/IsepLive/?fref=ts" target="_blank" rel="noopener noreferrer"><img src="/img/svg/facebook.svg" alt="Facebook logo" /></a>
                    </Box>
                    <Box width={1 / 4} p={1}>
                      <a href="https://twitter.com/iseplive" target="_blank" rel="noopener noreferrer"><img src="/img/svg/twitter.svg" alt="Twitter logo" /></a>
                    </Box>
                    <Box width={1 / 4} p={1}>
                      <a href="https://www.instagram.com/iseplive/" target="_blank" rel="noopener noreferrer"><img src="/img/svg/instagram.svg" alt="Instagram logo" /></a>
                    </Box>
                    <Box width={1 / 4} p={1}>
                      <a href="" target="_blank" rel="noopener noreferrer"><img src="/img/svg/snapchat.svg" alt="Snapchat logo" /></a>
                    </Box>
                  </Flex>
                </SocialBox>
              </Box>
              <Box w={[1, 1, 2 / 6]} p={2}>
                <SocialBox>
                  <h2>Partenaires</h2>
                  <Flex>
                    <Box width={1 / 3} p={1}>
                      <a href="https://www.juniorisep.com" target="_blank" rel="noopener noreferrer"><img src="/img/layout/juniorisep.png" alt="Junior ISEP logo" /></a>
                    </Box>
                    <Box width={1 / 3} p={1}>
                      <a href="https://aupontier.wixsite.com/cosmozbde2017" target="_blank" rel="noopener noreferrer"><img src="/img/layout/cosmoz.png" alt="Cosmoz logo" /></a>
                    </Box>
                    <Box width={1 / 3} p={1}>
                      <a href="http://www.alten.fr/" target="_blank" rel="noopener noreferrer"><img src="/img/layout/isep.png" alt="Alten logo" /></a>
                    </Box>
                  </Flex>
                </SocialBox>
              </Box>
              <Box w={1} p={2}>
                <SocialBox>
                  <h2>Site Internet développé par Guillaume CARRE et Victor ELY</h2>
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
      </Root>
    );
  };
};

export default Layout;
