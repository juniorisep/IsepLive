// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

//import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';

import { Box, Flex } from 'grid-styled';
import Time from 'components/Time';

import {
  Banner,
  Filler,
  FluidContent,
  Header,
  ProfileImage,
  SearchBar,
  Paper,
  Text,
  Title,
} from 'components/common';

import * as userData from 'data/users/student';

const PersonStyle = styled.div`
  > img {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

class Resume extends Component {
  state = {
    open: false,
    photoUrl: '',
    firstname: '',
    lastname: '',
    phone: '',
    studentId: '',
    birthDate: '',
    promo: '',
    bio: '',
    address: '',
    email: '',
    emailISEP: '',
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    userData.getLoggedUser().then(res => {
      this.setState({ ...res.data });
    });
  };

  render() {
    const {
      photoUrl,
      firstname,
      lastname,
      phone,
      studentId,
      birthDate,
      promo,
      bio,
      address,
      mail,
      mailISEP,
    } = this.state;
    return (
      <div>
        <Header url="/img/background.jpg">
          <Filler h={50} />
          <Banner>
            <h1>Profil</h1>
            <p>Ton petit jardin secret</p>
          </Banner>
          <FluidContent p="0">
            <SearchBar placeholder="Rechercher" />
          </FluidContent>
        </Header>
        <FluidContent>
          <Flex wrap>
            <Box p={2} width={[1, 1 / 4]}>
              <PersonStyle>
                <ProfileImage src={photoUrl} w="100%" />
              </PersonStyle>
            </Box>
            <Box p={2} width={[
              1, 3 / 4
            ]}>
              <Paper p="20px">
                <Flex>
                  <Box>
                    <Title>
                      {firstname} {lastname}
                    </Title>
                  </Box>
                  <Box ml="auto">
                    <Button raised color="primary">Modifier</Button>
                  </Box>
                </Flex>
                <Text>Promotion : <span>{promo}</span></Text>
                <Text>Numéro ISEP : <span>{studentId}</span></Text>
                <Text>Téléphone : <span>{phone}</span></Text>
                <Text>Adresse : <span>{address}</span></Text>
                <Text>Mail : <span>{mail}</span></Text>
                <Text>Mail ISEP : <span>{mailISEP}</span></Text>
                <Text>Date de naissance: <Time time={birthDate} format="DD/MM/YYYY" /></Text>
              </Paper>
            </Box>
            <Box p={2} width={1}>
              <Paper p="20px">
                <Title fontSize={1.3} invert>Citation</Title>
                <Text>{bio || <i>Pas de bio</i>}</Text>
              </Paper>
            </Box>
            <Box p={2} width={1}>
              <Paper p="20px">
                <Title fontSize={1.3} invert>Associations</Title>
                <Text>ryituoyipuoiùpuogypiftuodryitfuoygi</Text>
              </Paper>
            </Box>
            <Box p={2} width={1}>
              <Paper p="20px">
                <Flex>
                  <Box>
                    <Title fontSize={1.3} invert>Publications</Title>
                  </Box>
                  <Box ml="auto">
                    <Button raised color="primary">
                      Modifier
                    </Button>
                    <Button color="accent">
                      Supprimer
                    </Button>
                  </Box>
                </Flex>
                <Text>hjdshfjkdshf</Text>
              </Paper>
            </Box>
          </Flex>
          <UpdateResume open={this.state.open} handleRequestClose={this.handleRequestClose} />
        </FluidContent>
      </div>
    );
  };
};

function UpdateResume(props) {
  return (
    <Dialog open={props.open} transition={Slide} onRequestClose={props.handleRequestClose}>
      <DialogTitle style={{
        textAlign: 'center'
      }}>
        {"Modifier vos informations"}
      </DialogTitle>
      <DialogContent>
        <TextField type="text" label="Email" fullWidth />
        <TextField type="text" label="Téléphone" fullWidth />
        <TextField type="text" label="Adresse" fullWidth />
        <TextField type="text" label="Date de naissance" fullWidth />
        <TextField type="text" label="Lien Facebook" fullWidth />
        <TextField type="text" label="Lien Instagram" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleRequestClose} color="accent">
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Resume;
