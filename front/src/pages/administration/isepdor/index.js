// @flow

import React from 'react';

import Tabs, { Tab } from 'material-ui/Tabs';
import { FluidContent, Title, Paper } from '../../../components/common';

import Session from './Session';
import Question from './Question';
import Events from './Events';

type State = {
  activeTab: number,
};

export default class ImportStudents extends React.Component<{}, State> {
  state = {
    activeTab: 0,
  };

  handleChange = (event: any, value: number) => {
    this.setState({ activeTab: value });
  };

  renderTab(tab: number) {
    switch (tab) {
      case 0:
        return <Session />;
      case 1:
        return <Question />;
      case 2:
        return <Events />;
      default:
        return null;
    }
  }

  render() {
    const { activeTab } = this.state;
    return (
      <div style={{ margin: 30 }}>
        <Title invert>ISEP d'Or</Title>
        <div style={{ minHeight: 500 }}>
          <Tabs
            textColor="primary"
            value={activeTab}
            onChange={this.handleChange}
          >
            <Tab label="Sessions" />
            <Tab label="Questions" />
            <Tab label="Evènements" />
            <Tab label="Diplome" />
          </Tabs>
          {this.renderTab(activeTab)}
        </div>
      </div>
    );
  }
}
