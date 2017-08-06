// @flow
import axios from 'axios';
import { PostDTO } from './type';

export function getPosts(page: number) {
  return axios.get(`/post?page=${page}`);
}

export function getPost(id: number) {
  return axios.get(`/post/${id}`);
}

export function createPost(post: PostDTO) {
  return axios.post('/post', post)
}

export function publishPost(id: number) {
  return axios.put(`/post/${id}/state/PUBLISHED`)
}
