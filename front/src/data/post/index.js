// @flow

import axios from 'axios';
import {PostDTO} from './type';

export function getPosts(page: number) {
  return axios.get(`/post?page=${page}`);
};

export function getPost(id: number) {
  return axios.get(`/post/${id}`);
};

export function createPost(post: PostDTO) {
  return axios.post('/post', post);
};

export function publishPost(id: number) {
  return axios.put(`/post/${id}/state/PUBLISHED`);
};

export function getAuthors() {
  return axios.get('/post/authors');
};

export function addMedia(id: number, mediaId: number) {
  return axios.put(`/post/${id}/embed/${mediaId}`);
};

export function toggleLikePost(id: number) {
  return axios.put(`/post/${id}/like`);
};
