// @flow

import axios from 'axios';

export function createImage(file) {
  var data = new FormData();
  data.append('image', file);
  return axios.post('/media/image', data);
};

export function createGallery(form) {
  var data = new FormData();
  data.append('name', form.title);
  for (var i = 0; i < form.images.length; i++) {
    data.append('images[]', form.images[i]);
  };
  return axios.post('/media/gallery', data);
}

export function getGallery(id: number) {
  return axios.get(`/media/gallery/${id}`);
}

export function matchStudent(photoId: number, studId: number) {
  return axios.put(`/media/image/${photoId}/match/${studId}/tag`);
}

export function unmatchStudent(photoId: number, studId: number) {
  return axios.put(`/media/image/${photoId}/match/${studId}/untag`);
}

export function getImageTags(id: number) {
  return axios.get(`/media/image/${id}/tags`);
}