// @flow

import React from 'react';

import PropTypes from 'prop-types';

import {NavLink, Route, Switch, Redirect} from 'react-router-dom';

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

const styleSheet = createStyleSheet('ButtonAppBar', {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
});

const STYLE_USER_DETAIL = {
  height: '100%',
  marginRight: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  flexDirection: 'column',
};

const STYLE_USER_NAME = {
  fontSize: '20px',
  display: 'block',
  textAlign: 'right',
  textTransform: 'capitalize',
};

const STYLE_USER_BADGE = {
  display: 'block',
  fontSize: '10px',
  padding: '3px 5px',
  fontWeight: 'bold',
  background: 'white',
  color: '#8E7CC3',
  borderRadius: '3px',
  margin: '3px',
  verticalAlign: 'baseline',
};

const STYLE_USER_GROUP = {
  display: 'flex',
};

function ButtonAppBar(props) {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img alt="Isep Live" src="img/iseplive.jpg" style={{height: '50px'}}/>
          <Button color="contrast">Acccueil</Button>
          <Button color="contrast">Media</Button>
          <Button color="contrast">Annuaire</Button>
          <Button color="contrast">Association</Button>
          <Button color="contrast">Evenements</Button>
          <Button color="contrast">Qui sommes-nous ?</Button>
          <div style={STYLE_USER_GROUP}>
            <div style={STYLE_USER_DETAIL}>
              <div style={STYLE_USER_NAME}>
                Victor ELY
              </div>
              <div style={STYLE_USER_BADGE}>
                SysAdmin
              </div>
            </div>
          </div>
          <MenuOpen />
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

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(ButtonAppBar);
