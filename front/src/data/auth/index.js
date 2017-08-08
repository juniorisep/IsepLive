// @flow
import axios from 'axios';

export const hasRole = (roles) => {
  return roles.includes('ROLE_USER');
};

export const connect = (username, password) => {
  delete axios.defaults.headers.common['Authorization'];
  return axios.post('/auth', {
    username, password
  }).then(res => {
    storeToken(res.data);
  })
}

const storeToken = (token) => {
  localStorage.setItem('token', token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
