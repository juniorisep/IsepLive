// @flow
import axios from 'axios';

import {PollDTO} from './type';

export function createPoll(poll: PollDTO) {
  return axios.post('/poll', poll);
}

export function getPoll(id) {
  return axios.get(`/poll/${id}`);
}

export function vote(pollId, answerId) {
  return axios.put(`/poll/${pollId}/answer/${answerId}`);
}

export function getVote(pollId) {
  return axios.get(`/poll/${pollId}/vote`);
}
