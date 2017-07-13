// @flow

import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';
import Lock from 'material-ui-icons/Lock';

import styled from 'styled-components';

const MAIN_COLOR = '#1b3b82';
const SECONDARY_COLOR = '#ffa101';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: url(${props => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: scroll;
  z-index: -2;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${MAIN_COLOR};
  opacity: 0.7;
  z-index: -1;
`;

const BackgroundContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0 100px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 1100px) {
    flex-direction: column;
    padding: 60px 0;
  }
`;

const Separator = styled.div`
  width: 0;
  border: 0;
  height: 50%;
  border-right: 4px dashed ${SECONDARY_COLOR};

  @media (max-width: 1100px) {
    width: 50%;
    height: 0;
    border: 0;
    border-top: 4px dashed ${SECONDARY_COLOR};
    margin-bottom: 50px;
  }
`;

const TitleContainer = styled.div`
  flex: 1;
  text-align: center;
  padding: 50px;
  @media screen and (max-width: 500px) {
    padding: 0;
    margin-bottom: 20px;
  }
`;

const TitleHeader = styled.div`
  text-align: left;
  @media (max-width: 1100px) {
    text-align: center;
  }
`;

const Title = styled.h1`
  font-size: 4em;
  display: inline-block;
  color: ${SECONDARY_COLOR};
  margin: 0;
  margin-bottom: 20px;
  background: ${MAIN_COLOR};
  padding: 17px 19px;

  @media screen and (max-width: 500px) {
    font-size: 3em;
    padding: 8px 12px;
  }
`;

const Subtitle = styled.h2`
  display: inline-block;
  color: ${MAIN_COLOR};
  margin: 0;
  margin-bottom: 30px;
  background: ${SECONDARY_COLOR};
  padding: 17px 19px;

  @media screen and (max-width: 500px) {
    font-size: 15px;
    padding: 8px 12px;
    margin-bottom: 20px;
  }
`;

const LogoPartner = styled.div`
  margin-top: 40px;
`;

const Logo = styled.img`
  margin: 10px;
  height: 100px;
  padding: 10px;
  border-radius: 10px;
  background: white;

  @media screen and (max-width: 500px) {
    height: 70px;
  }
`;

const AccessContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 30px;
  @media screen and (max-width: 500px) {
    margin-bottom: 100px;
  }
`;
const ButtonContainer = styled.div`
  width: 100%;
  text-align: center;
`;


const CUSTOM_STYLES = {
  underlineFocusStyle: {
    borderColor:"#77191c",
  },
  btn: {
    background: MAIN_COLOR,
    color: 'white',
    marginBottom: 10,
    fontSize: 20,
  },
}

export default class Login extends Component {
  state = {
    open: false,
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Container>
        <BackgroundContainer>
          <Background url="img/background.jpg" />
          <Overlay />
        </BackgroundContainer>
        <Content>
          <TitleContainer>
            <TitleHeader>
              <div><Title>ISEPLive.fr</Title></div>
              <Subtitle>Espace étudiant de l'Isep</Subtitle>
            </TitleHeader>
            <LogoPartner>
              <Logo src="img/alten.jpg" alt="Alten" />
              <Logo src="img/cosmoz.jpg" alt="BDE" />
              <Logo src="img/isep.png" alt="ISEP" />
            </LogoPartner>
          </TitleContainer>
          <Separator />
          <AccessContainer>
            <ButtonContainer>
              <Button
                style={CUSTOM_STYLES.btn}
                onClick={() => this.setState({ open: true })}
              >Se connecter</Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button style={CUSTOM_STYLES.btn}>Accès visiteur</Button>
            </ButtonContainer>
          </AccessContainer>
        </Content>
        <LoginForm
          open={this.state.open}
          handleRequestClose={this.handleRequestClose}
        />
      </Container>
    );
  }
}

function LoginForm(props) {
  return (
    <Dialog
      open={props.open}
      transition={Slide}
      onRequestClose={props.handleRequestClose}>
      <DialogTitle style={{textAlign: 'center'}}>
        <img alt="Isep Live" src="img/iseplive.jpg" style={{height: '200px'}} />
      </DialogTitle>
      <DialogContent>
        <TextField
          type="text"
          label="Nom d'utilisateur"
          fullWidth
          underlineFocusStyle={CUSTOM_STYLES.underlineFocusStyle}
        />
        <TextField
          type="password"
          label="Mot de passe"
          fullWidth
          underlineFocusStyle={CUSTOM_STYLES.underlineFocusStyle}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleRequestClose} color="primary">
          Mot de passe oublié
        </Button>
        <Button onClick={props.handleRequestClose} color="primary" >
          Connexion
        </Button>
      </DialogActions>
    </Dialog>
  )
}
