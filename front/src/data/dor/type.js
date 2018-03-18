// @flow
export type SessionDor = {
  id: number,
  firstTurn: Date,
  secondTurn: Date,
  result: Date,
  enabled: boolean,
};

export type SessionDorCreate = {
  firstTurn: ?Date,
  secondTurn: ?Date,
  result: ?Date,
};

export type QuestionDor = {
  id: number,
  position: number,
  title: string,
  enableClub: boolean,
  enableStudent: boolean,
  enableEmployee: boolean,
  enableEvent: boolean,
  enableParty: boolean,
  enablePromo: boolean,
  promo: number,
};

export type QuestionDorCreate = {
  position: number,
  title: string,
  enableClub: boolean,
  enableStudent: boolean,
  enableEmployee: boolean,
  enableEvent: boolean,
  enableParty: boolean,
  enablePromo: boolean,
  promo: number,
};

export type EventDor = {
  id: number,
  name: string,
  party: boolean,
};

export type EventDorCreate = {
  name: string,
  party: boolean,
};