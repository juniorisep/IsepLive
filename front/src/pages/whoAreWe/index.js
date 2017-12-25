// @flow

import React, { Component } from 'react';

import { Banner, Filler, Header } from 'components/common';
import { Link, Route, Switch, Redirect } from 'react-router-dom';

import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';

import { MAIN_COLOR, SECONDARY_COLOR } from '../../colors';

import Team from './team';
import HallOfFame from './hallOfFame';
import Target from './target';

const TabContainer = props => <div>
  {props.children}
</div>;

class Whoarewe extends Component {
  state = {
    index: 0,
  };

  componentDidMount() {
    const base = this.props.match.url;
    const urlToTab = {
      [base + '/target']: 0,
      [base + '/team']: 1,
      [base + '/hall-of-fame']: 2,
    }
    if (urlToTab[this.props.location.pathname]) {
      this.setState({ index: urlToTab[this.props.location.pathname] });
    }
  }

  handleChange = (event, index) => {
    this.setState({ index });
  };

  render() {
    const { match } = this.props;
    return (
      <div>
        <Header url="/img/background.jpg">
          <Filler h={50} />
          <Banner>
            <h1>Qui sommes-nous ?</h1>
            <p>Nos objectifs, Notre équipe, Notre histoire, Hall of Fame...</p>
          </Banner>
        </Header>
        <Paper>
          <Tabs
            value={this.state.index}
            onChange={this.handleChange}
            indicatorColor={SECONDARY_COLOR}
            textColor={MAIN_COLOR}
            centered
          >
            <Tab label="Nos objectifs" component={Link} to={`${match.url}/target`} />
            <Tab label="Notre équipe" component={Link} to={`${match.url}/team`} />
            <Tab label="Hall of Fame" component={Link} to={`${match.url}/hall-of-fame`} />
          </Tabs>
          <Switch>
            <Redirect path={`${match.url}`} exact to={`${match.url}/target`} />
            <Route path={`${match.url}/target`} component={Target} />
            <Route path={`${match.url}/team`} component={Team} />
            <Route path={`${match.url}/hall-of-fame`} component={HallOfFame} />
          </Switch>
        </Paper>
      </div>
    );
  };
};

export default Whoarewe;
