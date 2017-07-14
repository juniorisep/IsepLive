// @flow

import React from 'react';

import PropTypes from 'prop-types';

import {NavLink, Route, Switch, Redirect} from 'react-router-dom';
import styled from 'styled-components';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import MenuOpen from '../MenuOpen';

import Home from '../../pages/home';
import NotFound from '../../pages/404'

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

const styleSheet = createStyleSheet('Layout', {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
});

function Layout(props) {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Logo src="img/iseplive.jpg" alt="isep live logo"/>
          <Button color="contrast">Acccueil</Button>
          <Button color="contrast">Media</Button>
          <Button color="contrast">Annuaire</Button>
          <Button color="contrast">Association</Button>
          <Button color="contrast">Evenements</Button>
          <Button color="contrast">Qui sommes-nous ?</Button>
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
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Layout);
