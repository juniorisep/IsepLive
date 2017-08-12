import axios from 'axios';

export function getClubs() {
  return axios.get('/club');
}

export function getClub(id) {
  return axios.get(`/club/${id}`);
}

export function getMembers(id) {
  return axios.get(`/club/${id}/member`);
}

export function getPosts(id) {
  return axios.get(`/club/${id}/post`);  
}
