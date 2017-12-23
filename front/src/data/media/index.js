// @flow

import axios from 'axios';

import type { Media } from './type';

export function getAllMedia(page: number = 0) {
  return axios.get(`/media?page=${page}`);
};

export function groupMedia(list: Media[]) {
  const monthlyGrouped = {};
  list.forEach((media: Media) => {
    const date = new Date(media.creation);
    const formedDate = date.getMonth() + '-' + date.getFullYear();
    if (!monthlyGrouped[formedDate]) {
      monthlyGrouped[formedDate] = {
        date, medias: []
      };
    };
    monthlyGrouped[formedDate].medias.push(media);
  });
  return Object.keys(monthlyGrouped)
    .map(k => monthlyGrouped[k])
    .sort((a, b) => a.date < b.date ? 1 : -1);
};

export function createDocument({ name, document }) {
  const form = new FormData();
  form.append('name', name);
  form.append('document', document);
  return axios.post('/media/document', form);
};

export function createGazette({ title, file }) {
  const form = new FormData();
  form.append('title', title);
  form.append('file', file);
  return axios.post('/media/gazette', form);
};

export function createEvent(state: any, authorId: number) {
  const form = new FormData();
  form.append('event', JSON.stringify({
    title: state.title,
    location: state.location,
    date: state.date.getTime(),
    description: state.description,
    clubId: authorId,
  }));
  form.append('image', state.image);
  return axios.post('/event', form);
};
