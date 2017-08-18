// @flow

import axios from 'axios';

import * as authData from './data/auth';

export const backUrl = process.env.REACT_APP_BACKEND_URL || "http://192.168.1.22:8080";

export const FACEBOOK_APP_ID = "1801340870119533";

const token = localStorage.getItem('token');
if (token != null) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  const respAuthToken = response.headers['Authorization'];
  if (respAuthToken) {
    authData.setToken(respAuthToken)
  };
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});
