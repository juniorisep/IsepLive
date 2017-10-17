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
