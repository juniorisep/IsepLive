// @flow

import axios from 'axios';
import type { StudentUpdateDTO } from './type';

export function getStudents() {
  return axios.get('/user/student');
};

export function updateStudent(form: StudentUpdateDTO) {
  return axios.put('/user/student', form);
}

export function searchStudents(name: string) {
  return axios.get(`/user/student/search?name=${name}`);
}

export function getStudent(id: number) {
  return axios.get(`/user/student/${id}`);
};

export function getLoggedUser() {
  return axios.get('/user/student/me')
};
