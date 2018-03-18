// @flow
import axios from 'axios';
import type { AxiosPromise } from 'axios';
import type {
  SessionDorCreate,
  SessionDor,
  QuestionDor,
  QuestionDorCreate,
  EventDor,
  EventDorCreate,
} from './type';

export function getSessions(): AxiosPromise<SessionDor[]> {
  return axios.get('/dor/session');
}

export function createSession(
  session: SessionDorCreate,
): AxiosPromise<SessionDor> {
  return axios.post('/dor/session', session);
}

export function updateSession(
  id: number,
  session: SessionDor,
): AxiosPromise<SessionDor> {
  return axios.put(`/dor/session/${id}`, session);
}

export function deleteSession(id: number): AxiosPromise<{}> {
  return axios.delete(`/dor/session/${id}`);
}

export function getQuestions(): AxiosPromise<QuestionDor[]> {
  return axios.get('/dor/question');
}

export function createQuestion(
  question: QuestionDorCreate,
): AxiosPromise<QuestionDor> {
  return axios.post('/dor/question', question);
}

export function updateQuestion(
  id: number,
  question: QuestionDorCreate,
): AxiosPromise<QuestionDor> {
  return axios.put(`/dor/question/${id}`, question);
}

export function deleteQuestion(id: number): AxiosPromise<{}> {
  return axios.delete(`/dor/question/${id}`);
}

export function getEvents(): AxiosPromise<EventDor[]> {
  return axios.get('/dor/event');
}

export function createEvent(event: EventDorCreate): AxiosPromise<EventDor> {
  return axios.post('/dor/event', event);
}

export function deleteEvent(id: number): AxiosPromise<{}> {
  return axios.delete(`/dor/event/${id}`);
}

export function updateEvent(
  id: number,
  event: EventDorCreate,
): AxiosPromise<EventDor> {
  return axios.put(`/dor/event/${id}`, event);
}
