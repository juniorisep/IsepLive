// @flow

import axios from 'axios';
import type { PostDTO } from './type';

export function getPosts(page: number) {
  return axios.get(`/post?page=${page}`);
};

export function getPinnedPosts() {
  return axios.get('/post/pinned');
};

export function getPost(id: number) {
  return axios.get(`/post/${id}`);
};

export function updatePost(id: number, form) {
  return axios.put(`/post/${id}`, form);
};

export function getComments(postId: number) {
  return axios.get(`/post/${postId}/comment`);
};

export function comment(postId: number, message: string) {
  return axios.put(`/post/${postId}/comment`, { message });
};

export function toggleLikeComment(postId: number, comId: number) {
  return axios.put(`/post/${postId}/comment/${comId}/like`);
};

export function deletePost(id: number) {
  return axios.delete(`/post/${id}`);
};

export function createPost(post: PostDTO) {
  return axios.post('/post', post);
};

export function pinPost(id: number, state: boolean) {
  return axios.put(`/post/${id}/pinned/${state ? 'true' : 'false'}`);
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

export function getLikes(type: string, id: number) {
  if (type === 'post') {
    return axios.get(`/post/${id}/likes`);
  }
  if (type === 'comment') {
    return axios.get(`/post/comment/${id}/likes`);
  }
}