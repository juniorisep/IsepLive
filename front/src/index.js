// @flow

import React from 'react';

import ReactDOM from 'react-dom';

import axios from 'axios';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import indigo from 'material-ui/colors/indigo';
import orange from 'material-ui/colors/orange';

import { ThemeProvider } from 'styled-components';

// import AuthenticatedRoute from './components/Auth/AuthenticatedRoute';

import { MAIN_COLOR, SECONDARY_COLOR } from './colors';

import Login from './pages/login';
import Layout from './components/Layout';
import AlertCenter from 'components/Alert';

import { backUrl } from './config';


axios.defaults.baseURL = backUrl;

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: orange,
  },
});

const styledTheme = {
  main: MAIN_COLOR,
  accent: SECONDARY_COLOR,
};

const App = () => (
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={styledTheme}>
      <div>
        <Router>
          <Switch>
            <Redirect path="/" exact to="/connexion" />
            <Route path="/connexion" component={Login} />
            {/* <AuthenticatedRoute roles={['ROLE_USER', 'ROLE_ADMIN']} path="/" component={Layout} /> */}
            <Route path="/" component={Layout} />
          </Switch>
        </Router>
        <AlertCenter />
      </div>
    </ThemeProvider>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />, document.getElementById('root'));
registerServiceWorker();
