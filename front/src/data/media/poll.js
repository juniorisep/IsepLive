import axios from 'axios';

export function getPoll(id) {
  return axios.get(`/poll/${id}`);
}

export function vote(pollId, answerId) {
  return axios.put(`/poll/${pollId}/answer/${answerId}`);
}

export function getVote(pollId) {
  return axios.get(`/poll/${pollId}/vote`);
}
