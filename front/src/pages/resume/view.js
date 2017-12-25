// @flow

import React from 'react';

import styled from 'styled-components';
import { Box, Flex } from 'grid-styled';

import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import { Link } from 'react-router-dom';

import Time from 'components/Time';
import PostListView from 'components/PostList';
import FullScreenView from '../../components/FullScreen/View';

import * as clubData from '../../data/club';

import {
  Banner,
  Filler,
  FluidContent,
  Header,
  ProfileImage,
  Paper,
  Text,
  Title,
  BgImage,
} from 'components/common';

import DatePicker from '../../components/DatePicker';
import SocialMedia from '../../components/SocialMedia';

const PersonStyle = styled.div`
  > div {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  width: 100%;
  height: 100%;
`;

export default function ResumeView(props) {
  const {
    data,
    posts,
    clubMembers,
  } = props;
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
    allowNotifications,
  } = data;
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
            <PersonStyle onClick={props.setFullScreen(true)} style={{ cursor: 'pointer' }}>
              <ProfileImage
                src={photoUrl}
                sz="100%"
                mh="200px" />
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
              <Text>Promotion : <span>{promo || <i>Pas de promotion</i>}</span></Text>
              <Text>Numéro ISEP : <span>{studentId || <i>Pas de numéro étudiant</i>}</span></Text>
              <Text>Téléphone : <span>{phone || <i>Pas de téléphone</i>}</span></Text>
              <Text>Adresse : <span>{address || <i>Pas d'adresse</i>}</span></Text>
              <Text>Mail : <span>{mail || <i>Pas d'adresse mail</i>}</span></Text>
              <Text>Mail ISEP : <span>{mailISEP || <i>Pas d'adresse mail de l'ISEP</i>}</span></Text>
              <Text>Date de naissance : {birthDate ? <Time date={birthDate} format="DD/MM/YYYY" /> : <i>Pas de date de naissance</i>}</Text>
              <SocialMedia socials={data} />
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
            <Title fontSize={1.5} invert>Associations</Title>
            {clubMembers.length === 0 && <Text>Membre d'aucunes associations</Text>}
            <Flex wrap>
              {
                clubMembers.map(cm => {
                  return (
                    <Box w={[1, 1 / 3, 1 / 4]} key={cm.club.id} p={2}>
                      <Link to={`/associations/${cm.club.id}`}>
                        <Paper>
                          <BgImage src={cm.club.logoUrl} mh="200px" />
                          <div style={{ textAlign: 'center', padding: '.5em' }}>
                            <div>
                              <Title invert fontSize={1.5}>{cm.club.name}</Title>
                            </div>
                            <Title fontSize={1.1}>{clubData.getClubRoleName(cm.role.name)}</Title>
                          </div>
                        </Paper>
                      </Link>
                    </Box>
                  )
                })
              }
            </Flex>
          </Box>
          <Box p={2} w={1}>
            <Title fontSize={1.5} invert>Publications</Title>
            {posts.length === 0 && <Text>Aucunes publications</Text>}
            <PostListView posts={posts} refreshPosts={props.refreshPosts} />
            {
              !props.lastPage && posts.length > 0 &&
              <div style={{ textAlign: 'center' }}>
                <Button color="accent" raised onClick={props.onSeeMore}>Voir plus</Button>
              </div>
            }
          </Box>
        </Flex>
        <FullScreenView
          visible={props.fullscreenOpen}
          image={photoUrl}
          onEscKey={props.setFullScreen(false)} />
        <UpdateResume
          open={props.open}
          handleRequestClose={props.handleRequestClose}
          handleUpdate={props.handleUpdate}
          data={props.data} />
      </FluidContent>
    </div>
  );
};

class UpdateResume extends React.Component {
  state = {
    form: this.props.data,
  };

  handleChange = (name: string) => ({ target }) => {
    this.handleChangeForm(name, target.value);
  };

  handleChangeForm = (name: string, value) => {
    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      },
    });
  };

  render() {
    const props = this.props;
    let data = this.state.form;
    return (
      <Dialog open={props.open} transition={Slide} onRequestClose={props.handleRequestClose}>
        <DialogTitle style={{
          textAlign: 'center'
        }}>
          Modifier vos informations
        </DialogTitle>
        <DialogContent>
          <TextField margin="normal" label="Email" value={data.mail} fullWidth onChange={this.handleChange('mail')} />
          <TextField margin="normal" label="Téléphone" value={data.phone} fullWidth onChange={this.handleChange('phone')} />
          <TextField margin="normal" label="Adresse" value={data.address} fullWidth onChange={this.handleChange('address')} />
          <div>
            <Text>Date de naissance</Text>
            <DatePicker
              dateonly
              startYear={new Date().getFullYear() - 30}
              date={data.birthDate}
              onChange={(date) => this.handleChangeForm('birthDate', date)} />
          </div>
          <TextField
            multiline
            rows="4"
            margin="normal"
            label="Bio"
            value={data.bio || ''}
            fullWidth
            onChange={this.handleChange('bio')} />
          <TextField margin="normal" label="Lien Facebook" value={data.facebook || ''} fullWidth onChange={this.handleChange('facebook')} />
          <TextField margin="normal" label="Lien Twitter" value={data.twitter || ''} fullWidth onChange={this.handleChange('twitter')} />
          <TextField margin="normal" label="Lien Instagram" value={data.instagram || ''} fullWidth onChange={this.handleChange('instagram')} />
          <TextField margin="normal" label="Lien Snapchat" value={data.snapchat || ''} fullWidth onChange={this.handleChange('snapchat')} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.handleUpdate(data)} color="accent">
            Valider
        </Button>
        </DialogActions>
      </Dialog>
    );
  };
};
