import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import { MuiThemeProvider } from 'material-ui/styles';

import Login from './pages/login';

const App = () => (
  <MuiThemeProvider>
    <Router>
      <Switch>
        <Redirect path="/" exact to="/login" />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  </MuiThemeProvider>
)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
