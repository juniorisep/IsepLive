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
  height: 100vh;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(${props => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -1;
`;

const ContentContainer = styled.div`
  display: flex;
  padding: 0 100px;
  width: 100%;
`;

const Separator = styled.div`
  width: 0;
  height: 400;
  border: 0;
  border-right: 4px dashed ${MAIN_COLOR};
`;

const TitleContainer = styled.div`
  flex: 1;
  text-align: center;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 4em;
  display: inline-block;
  color: ${SECONDARY_COLOR};
  margin-bottom: 10;
  background: ${MAIN_COLOR};
  padding: 17px 19px;
`;

const Subtitle = styled.h2`
  display: inline-block;
  color: ${MAIN_COLOR};
  margin: 0;
  margin-bottom: 50;
  background: ${SECONDARY_COLOR};
  padding: 17px 19px;
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
`;

const AccessContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
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
        <Background url="img/background.jpg" />
        <ContentContainer>
          <TitleContainer>
            <div style={{ textAlign: 'left' }}>
              <div>
                <Title>ISEPLive.fr</Title>
              </div>
              <Subtitle>Espace étudiant de l'Isep</Subtitle>
            </div>
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
        </ContentContainer>
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
