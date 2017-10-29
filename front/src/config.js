// @flow

import axios from 'axios';

const url = process.env.REACT_APP_BACKEND_URL || "localhost:8080";
const httpProtocol = process.env.REACT_APP_HTTP_PROTOCOL || "http";
const wsProtocol = process.env.REACT_APP_WS_PROTOCOL || "ws";

export const backUrl = `${httpProtocol}://${url}`;
export const wsUrl = `${wsProtocol}://${url}`;

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
