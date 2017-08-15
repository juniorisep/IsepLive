// @flow

import React, {Component} from 'react';

import {FluidContent} from 'components/common';

import Paper from 'material-ui/Paper';

import styled from 'styled-components';
import {Box, Flex} from 'grid-styled';

const Circle = styled.div`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 2px solid;
  margin: auto;
`;

class Target extends Component {
  render() {
    return (
      <FluidContent style={{textAlign: 'center'}}>
        <h1 style={{color: '#ffc000'}}>Nos objectifs</h1>
        <Flex wrap>
          <Box width={1 / 3} p={1}>
            <Paper elevation={4} style={{padding: 20}}>
              <Circle />
              <h4>Objectif 1</h4>
              <p>tuykflgmhijopjihougiyoufit</p>
            </Paper>
          </Box>
          <Box width={1 / 3} p={1}>
            <Paper elevation={4} style={{padding: 20}}>
              <Circle />
              <h4>Objectif 2</h4>
              <p>tuykflgmhijopjihougiyoufit</p>
            </Paper>
          </Box>
          <Box width={1 / 3} p={1}>
            <Paper elevation={4} style={{padding: 20}}>
              <Circle />
              <h4>Objectif 3</h4>
              <p>tuykflgmhijopjihougiyoufit</p>
            </Paper>
          </Box>
          <Box ml='15%' width={1 / 3} p={1}>
            <Paper elevation={4} style={{padding: 20}}>
              <Circle />
              <h4>Objectif 4</h4>
              <p>tuykflgmhijopjihougiyoufit</p>
            </Paper>
          </Box>
          <Box width={1 / 3} p={1}>
            <Paper elevation={4} style={{padding: 20}}>
              <Circle />
              <h4>Objectif 5</h4>
              <p>tuykflgmhijopjihougiyoufit</p>
            </Paper>
          </Box>
        </Flex>
      </FluidContent>
    );
  };
};

export default Target;
