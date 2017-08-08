import axios from 'axios';

export function getStudents() {
  return axios.get('/user/student');
}

export function getClubAuthors() {
  return axios.get('/user/student/clubs/admin');
}
