// @flow

import React from 'react';

import styled from 'styled-components';

import {Box, Flex} from 'grid-styled';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import Time from 'components/Time';
import {
  FluidContent,
  ProfileImage,
} from 'components/common';

const PersonStyle = styled.div`
  > img {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

export default function AdressbookDetailView(props) {
  return (
    <div>
      <FluidContent>
        <Flex wrap>
          <Box p={2} width={[ 1, 1 / 4 ]}>
            <PersonStyle>
              <ProfileImage src={props.photoUrl} w="100%" />
            </PersonStyle>
          </Box>
          <Box p={2} width={[
            1, 3 / 4
          ]}>
            <Paper elevation={4} style={{
              padding: 20,
              borderRadius: '10px'
            }}>
              <Typography type="headline" component="h3">
                <span>{props.firstname}</span>
                <span>{props.lastname}</span>
              </Typography>
              <Typography type="body1" component="p">
                Promotion : <span>{props.promo}</span>
              </Typography>
              <Typography type="body1" component="p">
                Numéro ISEP : <span>{props.studentId}</span>
              </Typography>
              <Typography type="body1" component="p">
                Téléphone : <span>{props.phone}</span>
              </Typography>
              <Typography type="body1" component="p">
                Adresse : <span>{props.adress}</span>
              </Typography>
              <Typography type="body1" component="p">
                Mail : <span>{props.mail}</span>
              </Typography>
              <Typography type="body1" component="p">
                Mail ISEP : <span>{props.mailISEP}</span>
              </Typography>
              <Typography type="body1" component="p">
                Date de naissance : <Time time={props.birthDate} format="DD/MM/YYYY" />
              </Typography>
            </Paper>
          </Box>
          <Box p={2} width={1}>
            <Paper elevation={4} style={{
              padding: 20,
              borderRadius: '10px'
            }}>
              <Typography type="headline" component="h3">
                Citation
              </Typography>
              <Typography type="body1" component="p">
                ryituoyipuoiùpuogypiftuodryitfuo
              </Typography>
            </Paper>
          </Box>
          <Box p={2} width={1}>
            <Paper elevation={4} style={{
              padding: 20,
              borderRadius: '10px'
            }}>
              <Typography type="headline" component="h3">
                Associations
              </Typography>
              <Typography type="body1" component="p">
                ryituoyipuoiùpuogypiftuodryitfuoygi
              </Typography>
            </Paper>
          </Box>
          <Box p={2} width={1}>
            <Paper elevation={4} style={{
              padding: 20,
              borderRadius: '10px'
            }}>
              <Typography type="headline" component="h3">
                Publications
              </Typography>
              <Typography type="body1" component="p">
                ryituoyipuoiùpuogypiftuodryitfuoygi
              </Typography>
            </Paper>
          </Box>
        </Flex>
      </FluidContent>
    </div>
  );
};
