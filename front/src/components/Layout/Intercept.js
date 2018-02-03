// @flow

import React from 'react';

import Button from 'material-ui/Button';

import { withRouter } from 'react-router-dom';
import { sendAlert } from '../../components/Alert';
import axios from 'axios';
import * as authData from 'data/auth';

import { MAIN_COLOR } from '../../colors';

const errNetPhrases = [
  'Uhmm... la connexion au réseau semble coupée 😅  !',
  'Whoops ! On dirait que la connexion est coupée 🙊  !',
];

const errServPhrases = [
  "Whoops nos serveurs ne répondent plus, nos techniciens s'en occupe 👊 !",
];

const noConnectStyle = {
  fontSize: '2em',
  fontWeight: 'bold',
  color: MAIN_COLOR,
  marginBottom: 30,
};

function refreshPage(){
    window.location.reload();
}

const ErrorView = (props) => (
  <div>
    <div style={noConnectStyle}>
      {props.title}
    </div>
    <div style={{
      ...noConnectStyle,
      fontSize: '1em',
      fontWeight: 'normal',
      textAlign: 'center',
      lineHeight: 1.5,
    }}>
      {props.message} <br />
      Essayez de recharger votre page.
    </div>
    <div style={{textAlign: 'center'}}>
      <Button raised color="primary" onClick={refreshPage}>
        Recharger
      </Button>
    </div>
  </div>
);

class Intercept extends React.Component {

  state = {
    error: '',
  }

  intercept: any;

  componentDidMount() {
    const props = this.props;
    this.intercept = axios.interceptors.response.use((response) => {
      // Do something with response data
      const token = response.headers['authorization'];
      const refreshToken = response.headers['x-refresh-token'];
      if (token && refreshToken) {
        authData.setToken({ token, refreshToken });
      }
      return response;
    }, (error) => {
      if (!error.response) {
        sendAlert("Connexion interrompue", 'error');
        document.body.style.overflow = 'hidden';
        this.setState({ error: 'network' });
      }

      if (error.response) {
        switch (error.response.status) {

          case 400:
          case 404:
            props.history.push('/404');
            break;

          case 401:
          case 403:
            authData.logout();
            sendAlert("Vous avez été déconnecté", 'error');
            props.history.push('/');
            break;

          case 500:
            sendAlert("Oops.. petit problème 😁", 'error');
            break;
          case 503:
            sendAlert("Serveur indisponible", 'error');
            document.body.style.overflow = 'hidden';
            this.setState({ error: 'server' });
            break;

          default:
            break;
        }
      }

      // Do something with response error
      return Promise.reject(error);
    });
  }

  componentWillUnmount() {
    axios.interceptors.response.eject(this.intercept);
  }

  selectRandom(phrases) {
    const rnd = Math.round(Math.random() * (phrases.length - 1));
    return phrases[rnd];
  }

  render() {
    if (this.state.error !== '') {

      return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#fff',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }} >
          {
            this.state.error === 'network' &&
            <ErrorView
              title="Connexion interrompue"
              message={this.selectRandom(errNetPhrases)} />
          }
          {
            this.state.error === 'server' &&
            <ErrorView
              title="Serveur indisponible"
              message={this.selectRandom(errServPhrases)} />
          }
        </div>
      );
    }
    return null;
  }
}

export default withRouter(Intercept);
