// @flow

import React, {Component} from 'react';

import {FluidContent, ProfileImage} from 'components/common';

import Paper from 'material-ui/Paper';

import {Box, Flex} from 'grid-styled';

import styled from 'styled-components';

const PersonStyle = styled.div`
  > img {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

class HallOfFame extends Component {
  render() {
    return (
      <FluidContent style={{textAlign: 'center'}}>
        <h1 style={{color: '#ffc000'}}>All of Fame</h1>
        <Flex wrap>
          <Box width={1} p={2}>
            <Paper elevation={4} style={{padding: 20, borderRadius: '10px'}}>
              <p>tuykflgmhijopjihougiyoufit</p>
            </Paper>
          </Box>
          <Box p={2} width={[ 1, 1 / 4 ]}>
            <PersonStyle>
              <ProfileImage src="" w="100%" />
            </PersonStyle>
          </Box>
          <Box p={2} width={[
            1, 3 / 4
          ]}>
            <Paper elevation={4} style={{
              padding: 20,
              borderRadius: '10px'
            }}>
            <p>fukglhjiùopihglyfutkygliuhmj</p>
            </Paper>
          </Box>
          <Box p={2} width={[
            1, 3 / 4
          ]}>
            <Paper elevation={4} style={{
              padding: 20,
              borderRadius: '10px'
            }}>
            <p>fukglhjiùopihglyfutkygliuhmj</p>
            </Paper>
          </Box>
          <Box p={2} width={[ 1, 1 / 4 ]}>
            <PersonStyle>
              <ProfileImage src="" w="100%" />
            </PersonStyle>
          </Box>
        </Flex>
      </FluidContent>
    );
  };
};

export default HallOfFame;
