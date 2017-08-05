import axios from 'axios';

export function getClubs() {
  return axios.get('/club');
}
