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

const styleSheet = createStyleSheet('Layout', {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  user_detail: {
    height: '100%',
    marginRight: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  user_name: {
    fontSize: '20px',
    display: 'block',
    textAlign: 'right',
    textTransform: 'capitalize',
  },
  user_badge: {
    display: 'block',
    fontSize: '10px',
    padding: '3px 5px',
    fontWeight: 'bold',
    background: 'white',
    color: '#8E7CC3',
    borderRadius: '3px',
    margin: '3px',
    verticalAlign: 'baseline',
  },
  user_group: {
    display: 'flex',
  }
});

function Layout(props) {
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
          <div className={classes.user_group}>
            <div className={classes.user_detail}>
              <div className={classes.user_name}>
                Victor ELY
              </div>
              <div className={classes.user_badge}>
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

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Layout);
