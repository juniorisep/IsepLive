// @flow

import axios from 'axios';

export function getClubs() {
  return axios.get('/club');
};

export function getClub(id: number) {
  return axios.get(`/club/${id}`);
};

export function getMembers(id: number) {
  return axios.get(`/club/${id}/member`);
};

export function getPosts(id: number) {
  return axios.get(`/club/${id}/post`);
};

export function createClub(form) {
  const formData = new FormData();
  formData.append('club', JSON.stringify({
    name: form.name,
    creation: form.creation.getTime(),
    adminId: form.president,
    description: form.description,
    website: form.website,
  }));
  formData.append('logo', form.logo);
  return axios.post('/club', formData);
}

export function updateClub(id: number, form) {
  const formData = new FormData();
  formData.append('club', JSON.stringify({
    name: form.name,
    creation: form.creation.getTime(),
    description: form.description,
    website: form.website,
  }));
  formData.append('logo', form.logo);
  return axios.put(`/club/${id}`, formData);
}

export function deleteClub(id: number) {
  return axios.delete(`/club/${id}`);
}