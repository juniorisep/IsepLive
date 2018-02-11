// @flow
export type SessionDor = {
  id: number,
  firstTurn: Date,
  secondTurn: Date,
  result: Date,
  enabled: boolean,
};

export type SessionDorCreate = {
  firstTurn: Date,
  secondTurn: Date,
  result: Date,
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
  promo: number,
};