// @flow

import React from 'react';

import { Link, Route, Switch, Redirect } from 'react-router-dom';

import Tabs, { Tab } from 'material-ui/Tabs';

import Users from './users';
import Import from './import';

class Admin extends React.Component {
  state = {
    tabOpen: 0,
  };

  handleChangeTab = (event: Event, index: number) => {
    this.setState({ tabOpen: index });
  }

  render() {
    const { match } = this.props;
    const { tabOpen } = this.state;
    return (
      <main>
        <Tabs
          value={tabOpen}
          indicatorColor="primary"
          textColor="primary"
          centered
          onChange={this.handleChangeTab}>
          <Tab label="Utilisateurs" component={Link} to={`${match.url}/utilisateurs`} />
          <Tab label="Importer" component={Link} to={`${match.url}/importer`} />
        </Tabs>
        <Switch>
          <Redirect path={`${match.url}`} exact to={`${match.url}/utilisateurs`} />
          <Route path={`${match.url}/utilisateurs`} component={Users} />
          <Route path={`${match.url}/importer`} component={Import} />
        </Switch>
      </main>
    );
  };
};

export default Admin;
