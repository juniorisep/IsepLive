// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';

import { Flex, Box } from 'grid-styled';

import {
  FluidContent,
  Header,
  SearchBar,
  Filler,
  Banner,
} from '../../components/common';

const Person = (props) => {
  const PersonStyle = styled.div`
    box-shadow: 10px 10px 5px rgba(0,0,0,0.1);
    > img {
      width: 100%;
    }
  `;
  return (
    <PersonStyle>
      <img src={props.url} alt="person-image"/>
    </PersonStyle>
  )
}

class Resume extends Component {
  state = {
    open: false,
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Header url="img/background.jpg">
          <Filler h={50} />
          <Banner>
            <h1>Profile</h1>
            <p>Ton petit jardin secret</p>
          </Banner>
          <FluidContent p="0">
            <SearchBar placeholder="Rechercher"/>
          </FluidContent>
        </Header>
        <FluidContent>
          <Flex wrap>
            <Box p={2} width={[ 1, 1/4 ]}>
              <Person
                url="https://numeris-isep.fr/img/team//amalric.resized.jpg"
              />
          	</Box>
            <Box p={2} width={[ 1, 3/4 ]}>
              <Paper elevation={4} style={{ padding: 20, borderRadius: '10px'}}>
                <Typography type="headline" component="h3">
                  Antoine Ratel
                  <Button raised color="primary" style={{float: 'right'}} onClick={() => this.setState({ open: true })}>
                    Modifier
                  </Button>
                </Typography>
                <Typography type="body1" component="p">
                  Promotion :
                </Typography>
                <Typography type="body1" component="p">
                  Numéro ISEP :
                </Typography>
                <Typography type="body1" component="p">
                  Téléphone :
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
                  Date de naissance :
                </Typography>
              </Paper>
            </Box>
            <Box p={2} width={1}>
              <Paper elevation={4} style={{ padding: 20, borderRadius: '10px'}}>
                <Typography type="headline" component="h3">
                  Citation
                </Typography>
                <Typography type="body1" component="p">
                  ryituoyipuoiùpuogypiftuodryitfuo
                </Typography>
              </Paper>
            </Box>
            <Box p={2} width={1}>
              <Paper elevation={4} style={{ padding: 20, borderRadius: '10px'}}>
                <Typography type="headline" component="h3">
                  Associations
                </Typography>
                <Typography type="body1" component="p">
                  ryituoyipuoiùpuogypiftuodryitfuoygi
                </Typography>
              </Paper>
            </Box>
            <Box p={2} width={1}>
              <Paper elevation={4} style={{ padding: 20, borderRadius: '10px'}}>
                <Typography type="headline" component="h3">
                  Publications
                  <Button raised color="primary" style={{float: 'right'}}>
                    Modifier
                  </Button>
                  <Button color="accent" style={{float: 'right'}}>
                    Supprimer
                  </Button>
                </Typography>
                <Typography type="body1" component="p">
                  ryituoyipuoiùpuogypiftuodryitfuoygi
                </Typography>
              </Paper>
            </Box>
          </Flex>
          <UpdateResume
            open={this.state.open}
            handleRequestClose={this.handleRequestClose}
          />
        </FluidContent>
      </div>
    );
  }
}

function UpdateResume(props) {
  return (
    <Dialog
      open={props.open}
      transition={Slide}
      onRequestClose={props.handleRequestClose}>
      <DialogTitle style={{textAlign: 'center'}}>
        {"Modifier vos informations"}
      </DialogTitle>
      <DialogContent>
        <TextField
          type="text"
          label="Email"
          fullWidth
        />
        <TextField
          type="text"
          label="Téléphone"
          fullWidth
        />
        <TextField
          type="text"
          label="Adresse"
          fullWidth
        />
        <TextField
          type="text"
          label="Date de naissance"
          fullWidth
        />
        <TextField
          type="text"
          label="Lien Facebook"
          fullWidth
        />
        <TextField
          type="text"
          label="Lien Instagram"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleRequestClose} color="accent" >
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Resume;
