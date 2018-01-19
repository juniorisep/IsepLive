// @flow

import axios from 'axios';

import type { PollDTO } from './type';

export function createPoll(poll: PollDTO) {
  return axios.post('/poll', poll);
}

export function getPoll(id) {
  return axios.get(`/poll/${id}`);
}

export function getAllVote(pollid) {
  return axios.get(`/poll/${pollid}/vote/all`);
}

export function vote(pollId, answerId) {
  return axios.put(`/poll/${pollId}/answer/${answerId}`);
}

export function removeVote(pollid, answer) {
  return axios.delete(`/poll/${pollid}/answer/${answer.id}`);
}

export function getVotes(pollId) {
  return axios.get(`/poll/${pollId}/vote`);
}
