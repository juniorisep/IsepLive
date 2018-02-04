// @flow

import axios from 'axios';
import type { AxiosPromise } from 'axios';

import type { StudentUpdate, Student, Role } from './type';
import type { Post } from '../post/type';
import type { Image } from '../media/type';
import type { ClubMember } from '../club/type';

export function getStudents(page = 0): AxiosPromise<Student[]> {
  return axios.get(`/user/student?page=${page}`);
}

export function getStudentsForAdmin(page = 0): AxiosPromise<Student[]> {
  return axios.get(`/user/student/admin?page=${page}`);
}

export function updateStudent(form: StudentUpdate): AxiosPromise<Student> {
  return axios.put('/user/student', form);
}

export function updateStudentFull(data): AxiosPromise<Student> {
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
  name: string, promotionFilter: number[] = [], sort: string = 'a', page: number = 0): AxiosPromise<Student[]> {
  const promos = promotionFilter.join(',');
  return axios.get(`/user/student/search?name=${name}&promos=${promos}&sort=${sort}&page=${page}`);
}

export function searchStudentsAdmin(
  name: string,
  rolesFilter: string[] = [],
  promotionFilter: number[] = [],
  sort: string = 'a', page: number = 0): AxiosPromise<Student[]> {
  const promos = promotionFilter.join(',');
  const roles = rolesFilter.join(',');
  return axios.get(
    `/user/student/search/admin?name=${name}&roles=${roles}&promos=${promos}&sort=${sort}&page=${page}`
  );
}

export function getStudent(id: number): AxiosPromise<Student> {
  return axios.get(`/user/student/${id}`);
}

export function getStudentRoles(id: number): AxiosPromise<Role[]> {
  return axios.get(`/user/student/${id}/roles`);
}

export function getLoggedUser(): AxiosPromise<Student> {
  return axios.get('/user/student/me');
}

export function getPosts(id: number, page: number = 0): AxiosPromise<Post[]> {
  return axios.get(`/user/student/${id}/post?page=${page}`);
}

export function getTaggedPhotos(id: number, page: number = 0): AxiosPromise<Image[]> {
  return axios.get(`/user/student/${id}/photo?page=${page}`);
}

export function toggleNotifications(): AxiosPromise<void> {
  return axios.put('/user/student/notification');
}

export function importStudents(csv: File, photos: File[], onUploadProgress: () => mixed): AxiosPromise<any> {
  let form = new FormData();
  form.append('csv', csv);
  for (var index = 0; index < photos.length; index++) {
    form.append('images[]', photos[index]);
  }
  return axios.post('/user/student/import', form, { onUploadProgress });
}

export function getClubMembers(id: number): AxiosPromise<ClubMember[]> {
  return axios.get(`/user/student/${id}/club`);
}

export function getPromo(promo: number, render?: (val: string) => any): any {
  const date = new Date();
  date.setFullYear(new Date().getFullYear() + 5);
  let lastPromo = date.getFullYear();

  if (date.getMonth() < 9) {
    lastPromo--;
  }

  let display = "";
  switch (promo) {
    case lastPromo:
      display = "Sup";
      break;
    case lastPromo - 1:
      display = "Spe";
      break;
    case lastPromo - 2:
      display = "A1";
      break;
    case lastPromo - 3:
      display = "A2";
      break;
    case lastPromo - 4:
      display = "A3";
      break;

    default:
      break;
  }

  if (render) {
    return render(display);
  }

  return display;
}

export function toggleArchiveStudent(userID: number): AxiosPromise<void> {
  return axios.put(`/user/student/${userID}/archive`);
}