// @flow

import axios from 'axios';
import * as constants from '../../constants';

export function getClubs() {
  return axios.get('/club');
};

export function getClub(id: number) {
  return axios.get(`/club/${id}`);
};

export function getMembers(id: number) {
  return axios.get(`/club/${id}/member`);
};

export function getAdmins(id: number) {
  return axios.get(`/club/${id}/admins`);
};

export function getPosts(id: number, page: number = 0) {
  return axios.get(`/club/${id}/post?page=${page}`);
};

export function createClub(form) {
  const formData = new FormData();
  formData.append('club', JSON.stringify({
    name: form.name,
    creation: form.creation.getTime(),
    adminId: form.president,
    description: form.description,
    website: form.website,
  }));
  formData.append('logo', form.logo);
  return axios.post('/club', formData);
}

export function updateClub(id: number, form) {
  const formData = new FormData();
  formData.append('club', JSON.stringify({
    name: form.name,
    creation: form.creation.getTime(),
    description: form.description,
    website: form.website,
  }));
  formData.append('logo', form.logo);
  return axios.put(`/club/${id}`, formData);
}

export function deleteClub(id: number) {
  return axios.delete(`/club/${id}`);
}

export function updateMemberRole(memberId: number, roleId: number) {
  return axios.put(`/club/member/${memberId}/role/${roleId}`);
}

export function addAdmin(clubid: number, studentid: number) {
  return axios.put(`/club/${clubid}/admin/${studentid}`);
}

export function removeAdmin(clubid: number, studentid: number) {
  return axios.delete(`/club/${clubid}/admin/${studentid}`);
}

export function addMember(clubid: number, userid: number) {
  return axios.put(`/club/${clubid}/member/${userid}`);
}

export function deleteMember(memberId: number) {
  return axios.delete(`/club/member/${memberId}`);
}

export function getClubRoleName(roleName: string) {
  switch (roleName) {
    case constants.CLUB_ROLE_PRESIDENT:
      return "Président";
    case constants.CLUB_ROLE_MEMBER:
      return "Membre";

    default:
      return roleName;
  }
}