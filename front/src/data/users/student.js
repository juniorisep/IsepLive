// @flow

import axios from 'axios';

export function getStudents() {
  return axios.get('/user/student');
};

export function getStudent(id) {
  return axios.get(`/user/student/${id}`);
};

export function getLoggedUser() {
  return axios.get('/user/student/me')
};
