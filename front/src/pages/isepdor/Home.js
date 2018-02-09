import React from 'react';

import {
  Paper,
  Title,
  Text,
  FluidContent,
} from '../../components/common';

import Button from 'material-ui/Button';

const btnStyle = {
  margin: 10,
};

export default class IsepDorHome extends React.Component {
  render() {
    return (
      <FluidContent>
        <Paper p="2em">
          <Title>ISEP d'Or</Title>
          <Text>
            La session de 2018 est disponible !
          </Text>
          <div>
            <Button style={btnStyle} raised color="primary">Résultats 2018</Button>
            <Button style={btnStyle} color="primary">Voir tout</Button>
          </div>
        </Paper>
      </FluidContent>
    );
  }
}