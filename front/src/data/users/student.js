import axios from 'axios';

export function getStudents() {
  return axios.get('/user/student');
}
