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
import { ThemeProvider } from 'styled-components';

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

const styledTheme = {
  main: MAIN_COLOR,
  accent: SECONDARY_COLOR,
}

const App = () => (
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={styledTheme}>
      <Router>
        <Switch>
          <Redirect path="/" exact to="/connexion" />
          <Route path="/connexion" component={Login} />
          <Route path="/" component={Layout} />
        </Switch>
      </Router>
    </ThemeProvider>
  </MuiThemeProvider>
)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
