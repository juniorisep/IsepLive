// @flow

import React from 'react';

import styled from 'styled-components';
import { Box, Flex } from 'grid-styled';

import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';


import Time from 'components/Time';
import PostListView from 'components/PostList';

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
  > div {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  width: 100%;
  height: 100%;
`;

export default function ResumeView(props) {
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
    allowNotifications,
    },
    posts,
  } = props;
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
              <ProfileImage src={photoUrl} sz="100%" mh="200px" />
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
                  <Button raised color="primary" onClick={props.onModify}>
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
                  control={<Checkbox checked={allowNotifications} onChange={props.toggleNotif} />}
                  label="Notification lorsqu'une association publie un post / évènement."
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
              <Text>Not implemented</Text>
            </Paper>
          </Box>
          <Box p={2} w={1}>
            <Title fontSize={1.5} invert>Publications</Title>
            {posts.length === 0 && <Text>Aucune publication</Text>}
            <PostListView posts={posts} refreshPosts={props.refreshPosts} />
          </Box>
        </Flex>
        <UpdateResume
          open={props.open}
          handleRequestClose={props.handleRequestClose}
          handleUpdate={props.handleUpdate}
          data={props.data} />
      </FluidContent>
    </div>
  );
}


class UpdateResume extends React.Component {
  state = {
    form: this.props.data,
  }

  handleChange = (name: string) => ({ target }) => {
    this.setState({
      form: {
        ...this.state.form,
        [name]: target.value,
      }
    });
  }

  render() {
    const props = this.props;
    let data = this.state.form;
    return (
      <Dialog open={props.open} transition={Slide} onRequestClose={props.handleRequestClose}>
        <DialogTitle style={{
          textAlign: 'center'
        }}>
          {"Modifier vos informations"}
        </DialogTitle>
        <DialogContent>
          <TextField margin="normal" label="Email" value={data.mail} fullWidth onChange={this.handleChange('mail')} />
          <TextField margin="normal" label="Téléphone" value={data.phone} fullWidth onChange={this.handleChange('phone')} />
          <TextField margin="normal" label="Adresse" value={data.address} fullWidth onChange={this.handleChange('address')} />
          <TextField margin="normal" label="Date de naissance" value={data.birthDate} fullWidth onChange={this.handleChange('birthDate')} />
          <TextField
            multiline
            rows="4"
            margin="normal"
            label="Bio"
            value={data.bio || ''}
            fullWidth
            onChange={this.handleChange('bio')} />
          <TextField margin="normal" label="Lien Facebook" value={data.facebook} fullWidth onChange={this.handleChange('facebook')} />
          <TextField margin="normal" label="Lien Twitter" value={data.twitter} fullWidth onChange={this.handleChange('twitter')} />
          <TextField margin="normal" label="Lien Instagram" value={data.instagram} fullWidth onChange={this.handleChange('instagram')} />
          <TextField margin="normal" label="Lien Snapchat" value={data.snapchat} fullWidth onChange={this.handleChange('snapchat')} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.handleUpdate(data)} color="accent">
            Valider
        </Button>
        </DialogActions>
      </Dialog>
    );
  }
};
