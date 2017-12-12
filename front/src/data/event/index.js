// @flow

import axios from 'axios';

export function getEvents() {
  return axios.get('/event');
};

export function getEvent(id: number) {
  return axios.get(`/event/${id}`);
};

export function updateEvent(id: number, data) {
  const form = new FormData();
  form.append('event', JSON.stringify({
    title: data.title,
    location: data.location,
    date: data.date,
    description: data.description,
  }));
  form.append('image', data.image);
  return axios.put(`/event/${id}`, form);
};


export function deleteEvent(id: number) {
  return axios.delete(`/event/${id}`);
}