// @flow

import axios from 'axios';

export function getEvents() {
  return axios.get('/event');
};

export function getEvent(id: number) {
  return axios.get(`/event/${id}`);
};

export function updateEvent(id: number, data, authorId) {
  const form = new FormData();
  console.log(authorId)
  form.append('event', JSON.stringify({
    title: data.title,
    location: data.location,
    date: data.date,
    description: data.description,
    clubId: authorId,
  }));
  form.append('image', data.image);
  return axios.put(`/event/${id}`, form);
};


export function deleteEvent(id: number) {
  return axios.delete(`/event/${id}`);
}