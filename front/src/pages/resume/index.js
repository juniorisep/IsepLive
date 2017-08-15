// @flow

import React, {Component} from 'react';

import styled from 'styled-components';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';

import {Box, Flex} from 'grid-styled';
import Time from 'components/Time';

import {
  Banner,
  Filler,
  FluidContent,
  Header,
  ProfileImage,
  SearchBar,
} from 'components/common';

import * as userData from 'data/users/student';

const Person = (props) => {
  const PersonStyle = styled.div`
    > img {
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
  `;
  return (
    <PersonStyle>
      <ProfileImage src={props.url} w="100%" />
    </PersonStyle>
  );
};

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
  };

  handleRequestClose = () => {
    this.setState({open: false});
  };

  componentDidMount() {
    userData.getLoggedUser().then(res => {
      const {photoUrl, firstname, lastname, phone, studentId, birthDate, promo} = res.data;
      this.setState({photoUrl, firstname, lastname, phone, studentId, birthDate, promo});
    });
  };

  render() {
    const {photoUrl, firstname, lastname, phone, studentId, birthDate, promo} = this.state;
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
            <Box p={2} width={[ 1, 1 / 4 ]}>
              <Person src={photoUrl} />
            </Box>
            <Box p={2} width={[
              1, 3 / 4
            ]}>
              <Paper elevation={4} style={{
                padding: 20,
                borderRadius: '10px'
              }}>
                <Typography type="headline" component="h3">
                  <span>{firstname}</span>
                  <span>{lastname}</span>
                  <Button raised color="primary" style={{
                    float: 'right'
                  }} onClick={() => this.setState({open: true})}>
                    Modifier
                  </Button>
                </Typography>
                <Typography type="body1" component="p">
                  Promotion : <span>{promo}</span>
                </Typography>
                <Typography type="body1" component="p">
                  Numéro ISEP : <span>{studentId}</span>
                </Typography>
                <Typography type="body1" component="p">
                  Téléphone : <span>{phone}</span>
                </Typography>
                <Typography type="body1" component="p">
                  Adresse :
                </Typography>
                <Typography type="body1" component="p">
                  Mail :
                </Typography>
                <Typography type="body1" component="p">
                  Mail ISEP :
                </Typography>
                <Typography type="body1" component="p">
                  Date de naissance : <Time time={birthDate} format="DD/MM/YYYY" />
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
                  <Button raised color="primary" style={{
                    float: 'right'
                  }}>
                    Modifier
                  </Button>
                  <Button color="accent" style={{
                    float: 'right'
                  }}>
                    Supprimer
                  </Button>
                </Typography>
                <Typography type="body1" component="p">
                  ryituoyipuoiùpuogypiftuodryitfuoygi
                </Typography>
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
