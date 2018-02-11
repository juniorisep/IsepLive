// @flow
import axios from 'axios';
import type { AxiosPromise } from 'axios';
import type {
  SessionDorCreate,
    SessionDor,
    QuestionDor,
    QuestionDorCreate,
} from './type';

export function getSessions(): AxiosPromise<SessionDor[]> {
  return axios.get('/dor/session');
}

export function createSession(session: SessionDorCreate): AxiosPromise<SessionDor> {
  return axios.post('/dor/session', session);
}

export function getQuestions(): AxiosPromise<QuestionDor[]> {
  return axios.get('/dor/question');
}

export function createQuestion(question: QuestionDorCreate): AxiosPromise<QuestionDor> {
  return axios.post('/dor/question', question);
}