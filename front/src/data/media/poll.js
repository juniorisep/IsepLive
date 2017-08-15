// @flow

import axios from 'axios';

import type {PollDTO} from './type';

export function createPoll(poll: PollDTO) {
  return axios.post('/poll', poll);
};

export function getPoll(id) {
  return axios.get(`/poll/${id}`);
};

export function vote(pollId, answerId) {
  return axios.put(`/poll/${pollId}/answer/${answerId}`);
};

export function getVotes(pollId) {
  return axios.get(`/poll/${pollId}/vote`);
};
