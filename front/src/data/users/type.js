// @flow

export type StudentUpdate = {
  id: ?number,
  birthDate: ?Date,
  phone: ?string,
  bio: ?string,
  mail: string,
  address: string,
};

export type AuthorType = 'student' | 'club' | 'employee';

type AuthorValue = {
  id: number,
  authorType: AuthorType,
};

export type Author = Student | Club;

type ClubValue = {
  name: string,
  description: string,
  creation: Date,
  website: string,
  isAdmin: boolean,
  logoUrl: string,
};
export type Club = AuthorValue & ClubValue;

type StudentValue = {
  promo: number,
  firstname: string,
  lastname: string,
  birthDate: ?Date,
  phone: ?string,
  address: ?string,
  studentId: string,
  mail: ?string,
  mailISEP: ?string,
  facebook: ?string,
  twitter: ?string,
  instagram: ?string,
  snapchat: ?string,
  allowNotification: boolean,
  photoUrl: ?string,
  photoUrlThumb: ?string,
  bio: ?string,
};

export type Student = AuthorValue & StudentValue;

export type Role = {
  id: number,
  name: string,
};