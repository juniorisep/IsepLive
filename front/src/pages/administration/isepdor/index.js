// @flow

import React from "react";

import Tabs, { Tab } from 'material-ui/Tabs';
import { FluidContent, Title, Paper } from "../../../components/common";

import Session from './Session';

type State = {
  activeTab: number,
}

export default class ImportStudents extends React.Component<{}, State> {
  state = {
    activeTab: 0,
  }

  handleChange = (event: any, value: number) => {
    this.setState({ activeTab: value });
  }


  render() {
    const { activeTab, sessions } = this.state;
    return (
      <FluidContent>
        <Title invert>ISEP d'Or</Title>
        <div style={{ minHeight: 500 }}>
          <Tabs textColor="primary" value={activeTab} onChange={this.handleChange}>
            <Tab label="Sessions" />
            <Tab label="Questions" />
            <Tab label="Diplome" />
          </Tabs>

          {
            activeTab == 0 &&
            <Session />
          }
        </div>
      </FluidContent>
    );
  }
}
