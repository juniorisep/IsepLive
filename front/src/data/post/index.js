import axios from 'axios';

export function getPosts() {
  return axios.get(`/post`);
}

export function getPost(id) {
  return axios.get(`/post/${id}`);
}
