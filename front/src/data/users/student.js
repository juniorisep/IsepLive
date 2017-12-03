// @flow

import axios from 'axios';
import type { StudentUpdateDTO } from './type';

export function getStudents(page = 0) {
  return axios.get(`/user/student?page=${page}`);
};

export function updateStudent(form: StudentUpdateDTO) {
  return axios.put('/user/student', form);
};

export function updateStudentFull(data) {
  const form = new FormData();

  form.append('form', JSON.stringify({
    id: data.id,
    firstname: data.firstname,
    lastname: data.lastname,
    birthDate: data.birthDate,
    mail: data.mail,
    mailISEP: data.mailISEP,
    address: data.address,
    phone: data.phone,
    promo: data.promo,
    bio: data.bio,
    twitter: data.twitter,
    facebook: data.facebook,
    instagram: data.instagram,
    snapchat: data.snapchat,
    roles: data.roles,
  }));

  form.append('image', data.file);

  return axios.put('/user/student/admin', form);
}

export function searchStudents(
  name: string, promotionFilter: number[] = [], sort: string = 'a', page: number = 0) {
  const promos = promotionFilter.join(',');
  return axios.get(`/user/student/search?name=${name}&promos=${promos}&sort=${sort}&page=${page}`);
};

export function getStudent(id: number) {
  return axios.get(`/user/student/${id}`);
};

export function getStudentRoles(id: number) {
  return axios.get(`/user/student/${id}/roles`);
}

export function getLoggedUser() {
  return axios.get('/user/student/me');
};

export function getPosts(id: number, page: number = 0) {
  return axios.get(`/user/student/${id}/post?page=${page}`);
};

export function toggleNotifications() {
  return axios.put('/user/student/notification');
};

export function importStudents(csv, photos, onUploadProgress) {
  let form = new FormData();
  form.append('csv', csv);
  for (var index = 0; index < photos.length; index++) {
    form.append('images[]', photos[index]);
  };
  return axios.post('/user/student/import', form, { onUploadProgress });
};

export function deleteStudent(id: number) {

}

export function getClubMembers(id: number) {
  return axios.get(`/user/student/${id}/club`);
}