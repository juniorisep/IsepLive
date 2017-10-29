// @flow

import axios from 'axios';
import type { StudentUpdateDTO } from './type';

export function getStudents(page = 0) {
  return axios.get(`/user/student?page=${page}`);
};

export function updateStudent(form: StudentUpdateDTO) {
  return axios.put('/user/student', form);
}

export function searchStudents(
  name: string, promotionFilter: number[], sort: string, page: number = 0) {
  const promos = promotionFilter.join(',');
  return axios.get(`/user/student/search?name=${name}&promos=${promos}&sort=${sort}&page=${page}`);
}

export function getStudent(id: number) {
  return axios.get(`/user/student/${id}`);
};

export function getLoggedUser() {
  return axios.get('/user/student/me');
};

export function getPosts(id: number) {
  return axios.get(`/user/student/${id}/post`);
}

export function toggleNotifications() {
  return axios.put('/user/student/notification');
}

export function importStudents(csv, photos, onUploadProgress) {
  let form = new FormData();
  form.append('csv', csv);
  for (var index = 0; index < photos.length; index++) {
    form.append('images[]', photos[index]);
  }
  return axios.post('/user/student/import', form, { onUploadProgress });
}