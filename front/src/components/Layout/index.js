// @flow

import React from 'react';

import { NavLink, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import axios from 'axios';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';

import IconButton from 'material-ui/IconButton';
import LockOpen from 'material-ui-icons/LockOpen';

import Drawer from 'material-ui/Drawer';
import { ListItem, ListItemText } from 'material-ui/List';

import Auth from 'components/Auth/AuthComponent';
import AuthenticatedRoute from 'components/Auth/AuthenticatedRoute';

import Forum from 'material-ui-icons/Forum';
import Play from 'material-ui-icons/PlayCircleFilled';
import People from 'material-ui-icons/People';
import Casino from 'material-ui-icons/Casino';
import Event from 'material-ui-icons/Event';
import HelpIcon from 'material-ui-icons/Help';


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
import Gallery from 'pages/gallery';

import { MAIN_COLOR, SECONDARY_COLOR } from '../../colors';
import { backUrl, wsUrl } from '../../config';

import Footer from './Footer';

import * as authData from 'data/auth';
import * as userData from 'data/users/student';

import * as roles from '../../constants';

import { sendAlert } from '../../components/Alert';

import Profile from './profile';
import LoginForm from '../LoginForm';


const WIDTH_THRESHOLD = 1080;

const Logo = styled.img`
  height: 50px;
  margin-right: 20px;
  cursor: pointer;
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

  @media (max-width: ${props => WIDTH_THRESHOLD + 'px'}) {
    display: none;
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


const NavItem = (props) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
  }}>{props.children}</div>
)

const NavIcon = (props) => (
  <props.icon style={{ color: MAIN_COLOR, marginRight: 10 }} />
)

const navListMenu = (Component) => (
  <div>
    <Component to="/accueil">
      <NavItem>
        <NavIcon icon={Forum} />
        <div style={{ color: MAIN_COLOR }}>Accueil</div>
      </NavItem>
    </Component>
    <Component to="/media">
      <NavItem>
        <NavIcon icon={Play} />
        <div style={{ color: MAIN_COLOR }}>Media</div>
      </NavItem>
    </Component>
    <Component to="/annuaire">
      <NavItem>
        <NavIcon icon={People} />
        <div style={{ color: MAIN_COLOR }}>Annuaire</div>
      </NavItem>
    </Component>
    <Component to="/associations">
      <NavItem>
        <NavIcon icon={Casino} />
        <div style={{ color: MAIN_COLOR }}>Associations</div>
      </NavItem>
    </Component>
    <Component to="/evenements">
      <NavItem>
        <NavIcon icon={Event} />
        <div style={{ color: MAIN_COLOR }}>Evenements</div>
      </NavItem>
    </Component>
    <Component to="/whoarewe">
      <NavItem>
        <NavIcon icon={HelpIcon} />
        <div style={{ color: MAIN_COLOR }}>Qui sommes-nous ?</div>
      </NavItem>
    </Component>
  </div>
);


const navListBar = (Component) => (
  <div>
    <Component to="/accueil">
      Accueil
    </Component>
    <Component to="/media">
      Media
    </Component>
    <Component to="/annuaire">
      Annuaire
    </Component>
    <Component to="/associations">
      Associations
    </Component>
    <Component to="/evenements">
      Evenements
    </Component>
    <Component to="/whoarewe">
      Qui sommes-nous ?
    </Component>
  </div>
)


class Intercept extends React.Component {

  componentDidMount() {
    const props = this.props;
    this.intercept = axios.interceptors.response.use((response) => {
      // Do something with response data
      const token = response.headers['authorization'];
      const refreshToken = response.headers['x-refresh-token'];
      if (token && refreshToken) {
        authData.setToken({ token, refreshToken });
      };
      return response;
    }, (error) => {
      if (!error.response) {
        sendAlert("Connexion interrompu", 'error');
      }

      if (error.response) {
        switch (error.response.status) {

          case 404:
          case 400:
            props.history.push('/404');
            break;

          case 401:
          case 403:
            authData.logout();
            sendAlert("Non autorisé", 'error');
            props.history.push('/');
            break;
          case 503:
            sendAlert("Serveur indisponible", 'error');
            break;

          default:
            break;
        };
      };

      // Do something with response error
      return Promise.reject(error);
    });
  }

  componentWillUnmount() {
    axios.interceptors.response.eject(this.intercept);
  }

  render() {
    return null;
  }
};

const Interceptor = withRouter(Intercept);


class Layout extends React.Component {
  state = {
    sidebarOpen: false,
    anchorEl: undefined,
    open: false,
    error: false,
    loading: false,
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
      try {
        const message = JSON.parse(msg.data);
        const authorData = message.author;
        const body = authorData.authorType === 'club' ? message.title : message.content;
        const image = authorData.authorType === 'club' ? authorData.logoThumbUrl : authorData.photoUrlThumb;

        Notification.requestPermission(function (status) {
          new Notification("Nouveau Post !", { body, icon: backUrl + image }); // this also shows the notification
          const postEvent = new CustomEvent('new-post');
          document.dispatchEvent(postEvent);
        });
      } catch (error) {
        console.log(error)
      };
    };

    this.conn.onclose = (e) => {
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

  handleLoginForm = (name, event) => {
    this.setState({ [name]: event.target.value });
  }

  handleConnect = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    authData.connect(username, password).then(res => {
      this.handleRequestClose();
      this.props.history.push('/')
    }).catch(err => {
      if (err.response) {
        this.setState({ error: true, loading: false });
      }
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
              onClick={() => {
                if (window.innerWidth > WIDTH_THRESHOLD) {
                  this.props.history.push('/');
                }
                this.setState({ sidebarOpen: true })
              }} />
            <NavMenu>
              {navListBar(Nav)}
            </NavMenu>
            <span style={{ marginLeft: 'auto' }}>
              <Auth >
                <Profile onClick={this.handleClick} />
                <Menu id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  open={this.state.open}
                  onRequestClose={this.handleRequestClose}
                >
                  {
                    authData.hasRole([roles.ADMIN, roles.USER_MANAGER]) &&
                    <MenuItem
                      onClick={this.handleRequestClose}
                      component={NavLink}
                      to="/administration">Administration</MenuItem>
                  }
                  <MenuItem
                    onClick={this.handleRequestClose}
                    component={NavLink}
                    to="/profile">Profil</MenuItem>
                  <MenuItem
                    onClick={this.handleDisconnect}
                    component={NavLink}
                    to="/connexion">Déconnexion</MenuItem>
                </Menu>
              </Auth>
            </span>
            <Auth not>
              <IconButton
                style={{ marginLeft: 10 }}
                color="contrast"
                onClick={() => this.setState({ connexionOpen: true })}>
                <LockOpen />
              </IconButton>
              <LoginForm
                loading={this.state.loading}
                error={this.state.error}
                open={this.state.connexionOpen}
                handleRequestClose={this.handleRequestClose}
                onChange={this.handleLoginForm}
                onConnexion={this.handleConnect}
              />
            </Auth>
          </Toolbar>
        </AppBar>
        {
          window.innerWidth < WIDTH_THRESHOLD &&
          <Drawer
            anchor="left"
            open={this.state.sidebarOpen}
            onRequestClose={this.handleSideBarClose}
            onClick={this.handleSideBarClose}>
            {navListMenu(SideNav)}
          </Drawer>
        }
        <Switch>
          <Redirect path="/" exact to="/accueil" />
          <Route path="/accueil" component={Home} />
          <Route path="/post/:id" component={PostDetail} />
          <Route path="/media" component={Media} />
          <Route path="/gallery/:id" component={Gallery} />
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
          <AuthenticatedRoute roles={[roles.ADMIN, roles.USER_MANAGER]} path="/administration" component={Admin} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </Root>
    );
  };
};

export default Layout;
