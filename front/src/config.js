// @flow

import axios from 'axios';

import * as authData from './data/auth';

export const backUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

export const FACEBOOK_APP_ID = "";

const token = localStorage.getItem('token');
const refreshToken = localStorage.getItem('refreshToken');
if (token && refreshToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  axios.defaults.headers.common['X-Refresh-Token'] = refreshToken;
};

// Add a response interceptor
// axios.interceptors.response.use(function (response) {
//   // Do something with response data
//   const token = response.headers['Authorization'];
//   const refreshToken = response.headers['X-Refresh-Token'];
//   if (token && refreshToken) {
//     authData.setToken({ token, refreshToken });
//   };
//   return response;
// }, function (error) {
//   // Do something with response error
//   return Promise.reject(error);
// });
