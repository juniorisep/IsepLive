// @flow

import axios from 'axios';

export const hasRole = (roles) => {
  return roles.includes('ROLE_USER');
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};

export const connect = (username, password) => {
  delete axios.defaults.headers.common['Authorization'];
  return axios.post('/auth', {
    username, password
  }).then(res => {
    setToken(res.data);
  });
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const logout = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
};

export const getUser = () => {
  const token = localStorage.getItem('token');
  const rawdata = token.split('.')[1];
  return JSON.parse(atob(rawdata));
};
