// @flow
import axios from 'axios';

export function createImage(file) {
  var data = new FormData();
  data.append('image', file);
  return axios.post('/media/image', data);
}
