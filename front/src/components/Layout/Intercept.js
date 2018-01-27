// @flow

import React from 'react';

import { withRouter } from 'react-router-dom';
import { sendAlert } from '../../components/Alert';
import axios from 'axios';
import * as authData from 'data/auth';

import { MAIN_COLOR } from '../../colors';


const phrases = [
  'Uhmm... la connexion au réseau semble coupée 😅  !',
  'Woops ! On dirait que la connexion a coupé 🙊  !',
]

class Intercept extends React.Component {

  state = {
    noConnection: false,
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
      };
      return response;
    }, (error) => {
      if (!error.response) {
        sendAlert("Connexion interrompu", 'error');
        document.body.style.overflow = 'hidden';
        this.setState({ noConnection: true });
      }

      if (error.response) {
        this.setState({ noConnection: false });
        document.body.style.overflow = '';
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
            break;

          default:
            break;
        };
      };

      // Do something with response error
      return Promise.reject(error);
    });
  }

  componentWillUnmount() {
    axios.interceptors.response.eject(this.intercept);
  }

  selectRandom() {
    const rnd = Math.round(Math.random() * (phrases.length - 1));
    return phrases[rnd];
  }

  render() {
    if (this.state.noConnection) {
      const noConnectStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
        color: MAIN_COLOR,
        marginBottom: 30,
      }
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
          <img src="/img/iseplive.jpg" alt="iseplive" style={{ width: 70, marginBottom: 30 }} />
          <div style={noConnectStyle}>
            Connexion interrompu
          </div>
          <div style={{
            ...noConnectStyle,
            fontSize: '1em',
            fontWeight: 'normal',
            textAlign: 'center',
            lineHeight: 1.5,
          }}>
            {this.selectRandom()} <br />
            Essayez de recharger votre page.
          </div>
        </div>
      )
    }
    return null;
  }
};

export default withRouter(Intercept);