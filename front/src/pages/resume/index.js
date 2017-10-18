// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

//import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';
import PostListView from 'components/PostList';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

import { Box, Flex } from 'grid-styled';
import Time from 'components/Time';

import * as userData from '../../data/users/student';
import * as authData from '../../data/auth';

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

const PersonStyle = styled.div`
  > img {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

class Resume extends Component {
  state = {
    open: false,
    data: null,
    posts: [],
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleChange = (name: string) => ({ target }) => {
    this.setState({
      data: {
        ...this.state.data,
        [name]: target.value
      }
    });
  }

  handleUpdate = () => {
    if (this.state.data) {
      const {
        phone,
        birthDate,
        bio,
        address,
        mail,
        mailISEP,
        instagram,
        facebook,
        snapchat,
        twitter,
      } = this.state.data;
      userData.updateStudent({
        ...this.state.data,
        phone,
        birthDate,
        bio,
        address,
        mail,
        mailISEP,
        instagram,
        facebook,
        snapchat,
        twitter,
      }).then(() => this.setState({ open: false }))
    }
  }

  componentDidMount() {
    this.getUserData();
    this.refreshPosts();
  };

  getUserData = async () => {
    const { data } = await userData.getLoggedUser();
    this.setState({ data });
  }

  refreshPosts = async () => {
    const user = await authData.getUser();
    console.log(user)
    const { data } = await userData.getPosts(user.id);
    this.setState({ posts: data });
  }

  render() {

    if (!this.state.data) {
      return null;
    }

    const {
      data: {
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
      },
      posts,
    } = this.state;
    return (
      <div>
        <Header url="/img/background.jpg">
          <Filler h={50} />
          <Banner>
            <h1>Profil</h1>
            <p>Ton petit jardin secret</p>
          </Banner>
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
                    <Button raised color="primary" onClick={() => this.setState({ open: true })}>
                      Modifier
                    </Button>
                  </Box>
                </Flex>
                <Text>Promotion : <span>{promo}</span></Text>
                <Text>Numéro ISEP : <span>{studentId}</span></Text>
                <Text>Téléphone : <span>{phone}</span></Text>
                <Text>Adresse : <span>{address}</span></Text>
                <Text>Mail : <span>{mail}</span></Text>
                <Text>Mail ISEP : <span>{mailISEP}</span></Text>
                <Text>Date de naissance : <Time time={birthDate} format="DD/MM/YYYY" /></Text>
              </Paper>
            </Box>
            <Box p={2} width={1}>
              <Paper p="20px">
                <Title fontSize={1.3} invert>Parametres</Title>
                <div>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={<Text>Notification lorsqu'une association publie un post / évènement.</Text>}
                  />
                </div>
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
            <Box p={2}>
              <Title fontSize={1.5} invert>Publications</Title>
              {posts.length === 0 && <Text>Aucune publication</Text>}
              <PostListView posts={posts} refreshPosts={this.refreshPosts} />
            </Box>
          </Flex>
          <UpdateResume
            open={this.state.open}
            handleRequestClose={this.handleRequestClose}
            handleChange={this.handleChange}
            handleUpdate={this.handleUpdate}
            data={this.state.data} />
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
        <TextField margin="normal" label="Email" value={props.data.mail} fullWidth onChange={props.handleChange('mail')} />
        <TextField margin="normal" label="Téléphone" value={props.data.phone} fullWidth onChange={props.handleChange('phone')} />
        <TextField margin="normal" label="Adresse" value={props.data.address} fullWidth onChange={props.handleChange('address')} />
        <TextField margin="normal" label="Date de naissance" value={props.data.birthDate} fullWidth onChange={props.handleChange('birthDate')} />
        <TextField margin="normal" label="Lien Facebook" value={props.data.facebook} fullWidth onChange={props.handleChange('facebook')} />
        <TextField margin="normal" label="Lien Twitter" value={props.data.twitter} fullWidth onChange={props.handleChange('twitter')} />
        <TextField margin="normal" label="Lien Instagram" value={props.data.instagram} fullWidth onChange={props.handleChange('instagram')} />
        <TextField margin="normal" label="Lien Snapchat" value={props.data.snapchat} fullWidth onChange={props.handleChange('snapchat')} />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleUpdate} color="accent">
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Resume;
