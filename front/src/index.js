// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { MAIN_COLOR, SECONDARY_COLOR } from './colors';
import createPalette from 'material-ui/styles/palette';
import indigo from 'material-ui/colors/indigo';
import orange from 'material-ui/colors/orange';

import Login from './pages/login';
import Layout from './components/Layout'

const theme = createMuiTheme({
  palette: createPalette({
    primary: indigo,
    accent: orange,
  }),
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Redirect path="/" exact to="/connexion" />
        <Route path="/connexion" component={Login} />
        <Route path="/" component={Layout} />
      </Switch>
    </Router>
  </MuiThemeProvider>
)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
