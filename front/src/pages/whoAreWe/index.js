// @flow

import React, {Component} from 'react';

import {Banner, Filler, FluidContent, Header, SearchBar} from 'components/common';

import Paper from 'material-ui/Paper';
import Tabs, {Tab} from 'material-ui/Tabs';

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

  handleChange = (event, index) => {
    this.setState({index});
  };

  render() {
    return (
      <div>
        <Header url="/img/background.jpg">
          <Filler h={50} />
          <Banner>
            <h1>Qui sommes-nous ?</h1>
            <p>Nos objectifs, Notre équipe, Notre histoire, Hall of Fame...</p>
          </Banner>
          <FluidContent p="0">
            <SearchBar placeholder="Rechercher" />
          </FluidContent>
        </Header>
        <Paper>
          <Tabs
            index={this.state.index}
            onChange={this.handleChange}
            indicatorColor={SECONDARY_COLOR}
            textColor={MAIN_COLOR}
            centered
          >
            <Tab label="Nos objectifs" />
            <Tab label="Notre équipe" />
            <Tab label="Hall of Fame" />
          </Tabs>
          {this.state.index === 0 && <TabContainer>
            <Target />
          </TabContainer>}
          {this.state.index === 1 && <TabContainer>
            <Team />
          </TabContainer>}
          {this.state.index === 2 && <TabContainer>
            <HallOfFame />
          </TabContainer>}
        </Paper>
      </div>
    );
  };
};

export default Whoarewe;
