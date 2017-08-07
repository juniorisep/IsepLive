// @flow

import React, {Component} from 'react';

import Paper from 'material-ui/Paper';
import Tabs, {Tab} from 'material-ui/Tabs';

import {FluidContent} from '../../components/common';

import Users from './users';
import Club from './club';

const TabContainer = props => <div style={{
  padding: 20
}}>
  {props.children}
</div>;

class Admin extends Component {
  state = {
    index: 0
  };

  handleChange = (event, index) => {
    this.setState({index});
  };

  render() {
    return (
      <div>
        <FluidContent>
          <Paper>
            <Tabs index={this.state.index} onChange={this.handleChange} indicatorColor="primary" textColor="primary" centered>
              <Tab label="Utilisateurs"/>
              <Tab label="Associations"/>
              <Tab label="ISEP D'OR"/>
            </Tabs>
          </Paper>
          {this.state.index === 0 && <TabContainer>
            <Users/>
          </TabContainer>}
          {this.state.index === 1 && <TabContainer>
            <Club/>
          </TabContainer>}
          {this.state.index === 2 && <TabContainer>
            {'Item Three'}
          </TabContainer>}
        </FluidContent>
      </div>
    );
  }
};

export default Admin;
