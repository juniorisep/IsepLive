// @flow

import React from 'react';

import { withRouter } from 'react-router-dom';
import { sendAlert } from '../../components/Alert';
import axios from 'axios';
import * as authData from 'data/auth';



class Intercept extends React.Component {

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

  render() {
    return null;
  }
};

export default withRouter(Intercept);