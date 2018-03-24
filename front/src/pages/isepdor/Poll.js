// @flow

import React from 'react';
import { Flex, Box } from 'grid-styled';
import Avatar from 'material-ui/Avatar';

import {
  Paper,
  Title,
  Text,
  FluidContent,
  BgImage,
} from '../../components/common';

import Autocomplete from '../../components/Autocomplete';

import type { QuestionDor, VoteDor, SessionDor } from '../../data/dor/type';
import * as dorData from '../../data/dor';

import * as userData from '../../data/users/student';
import { backUrl } from '../../config';

import Time from '../../components/Time';

import PollQuestion from './PollQuestion';

const SessionDisplay = ({ secondTurn, result }) => {
  const now = new Date().getTime();
  if (secondTurn > now) {
    return (
      <Text>
        Fin du premier tour le <Time date={secondTurn} format="Do MMMM YYYY" />
      </Text>
    );
  }
  if (result > now) {
    return (
      <Text>
        Résultats le <Time date={result} format="Do MMMM YYYY" />
      </Text>
    );
  }
  return null;
};

type State = {
  questions: QuestionDor[],
  answers: VoteDor[],
  session: ?SessionDor,
};

export default class DorPoll extends React.Component<{}, State> {
  state = {
    questions: [],
    answers: [],
    session: null,
  };

  componentDidMount() {
    this.getQuestions();
    this.getCurrentSession().then(session => {
      this.getCurrentVotes(this.getCurrentRound(session));
    });
  }

  getCurrentRound(session: SessionDor): number {
    return session.secondTurn > new Date().getTime() ? 1 : 2;
  }

  async getCurrentSession() {
    const res = await dorData.getCurrentSession();
    this.setState({
      session: res.data,
    });
    return res.data;
  }

  async getQuestions() {
    const res = await dorData.getQuestions();
    this.setState({
      questions: res.data,
    });
  }

  async getCurrentVotes(round: number) {
    const res = await dorData.getCurrentVotes(round);
    this.setState({
      answers: res.data,
    });
  }

  onAnswer = () => {
    if (this.state.session) {
      this.getCurrentVotes(this.getCurrentRound(this.state.session));
    }
  };

  renderQuestions = (question: QuestionDor) => {
    const { answers } = this.state;
    const answer = answers.find(ans => ans.questionDor.id === question.id);

    return (
      <Box key={question.id} p={3} w={[1, 1 / 3]}>
        <PollQuestion
          question={question}
          answer={answer}
          onAnswer={this.onAnswer}
        />
      </Box>
    );
  };

  render() {
    const { session, questions } = this.state;
    return (
      <FluidContent mh="700px">
        <Title mb="0.2em" fontSize={3}>
          ISEP d'Or
        </Title>
        {session && (
          <Box mb="20px">
            <SessionDisplay
              secondTurn={session.secondTurn}
              result={session.result}
            />
          </Box>
        )}
        <Flex flexWrap="wrap">{questions.map(this.renderQuestions)}</Flex>
      </FluidContent>
    );
  }
}
