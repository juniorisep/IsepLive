// @flow

import axios from 'axios';

export function getEvents() {
  return axios.get('/event');
};

export function getEvent(id) {
  return axios.get(`/event/${id}`);
};
