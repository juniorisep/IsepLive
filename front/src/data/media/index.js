import axios from 'axios';

export function getAllMedia() {
  return axios.get('/media');
}
