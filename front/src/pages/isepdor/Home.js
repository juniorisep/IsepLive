import React from 'react';

import { Paper, Title, Text, FluidContent } from '../../components/common';

import Button from 'material-ui/Button';

import StarIcon from 'material-ui-icons/Star';
const btnStyle = {
  margin: 10,
};

const pollBtnStyle = {
  position: 'fixed',
  right: 0,
  bottom: 0,
  margin: 20,
};

export default class IsepDorHome extends React.Component {
  render() {
    return (
      <Paper p="2em">
        <Title>ISEP d'Or</Title>
        <Text>Les résultats de la session de 2018 sont disponibles !</Text>
        <div>
          <Button style={btnStyle} variant="raised" color="primary">
            Résultats
          </Button>
          <Button style={btnStyle} color="primary">
            Voir tout
          </Button>
        </div>
        {/* <ToolTip title="ISEP d'Or" placement="left"> */}
        <Button variant="fab" color="secondary" style={pollBtnStyle}>
          <StarIcon />
        </Button>
        {/* </ToolTip> */}
      </Paper>
    );
  }
}
