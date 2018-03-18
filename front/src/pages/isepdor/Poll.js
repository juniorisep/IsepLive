// @flow

import React from 'react';
import { Flex, Box } from 'grid-styled';
import Avatar from 'material-ui/Avatar';

import { Paper, Title, Text, FluidContent } from '../../components/common';

import Autocomplete from '../../components/Autocomplete';

import type { QuestionDor } from '../../data/dor/type';
import * as dorData from '../../data/dor';

import * as userData from '../../data/users/student';

import { backUrl } from '../../config';

type State = {
  questions: QuestionDor[],
};

export default class DorPoll extends React.Component<{}, State> {
  state = {
    questions: [],
    answers: [],
  };

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const res = await dorData.getQuestions();
    this.setState({
      questions: res.data,
    });
  }

  renderStudentSugg = stud => {
    const name = `${stud.firstname} ${stud.lastname}`;
    const url = stud.photoUrlThumb
      ? backUrl + stud.photoUrlThumb
      : '/img/svg/user.svg';
    return (
      <div style={{ display: 'inherit', alignItems: 'inherit' }}>
        <Avatar alt={name} src={url} style={{ marginRight: 10 }} />
        <span>{name}</span>
      </div>
    );
  };

  selectStudent = (data, name) => {};
  searchStudent = search => {
    this.setState({ selectValue: search });
    if (!search) {
      this.setState({ selected: false });
      return Promise.resolve([]);
    }
    return userData.searchStudents(search, [], 'a', 0).then(res => {
      return res.data.content;
    });
  };

  renderQuestions = (question: QuestionDor) => {
    return (
      <Box p={3} w={[1 / 2]}>
        <Paper p="20px">
          <Title invert>{question.title}</Title>
          {question.enableStudent && (
            <Autocomplete
              label="Elève"
              renderSuggestion={this.renderStudentSugg}
              onSelect={this.selectStudent}
              search={this.searchStudent}
            />
          )}
        </Paper>
      </Box>
    );
  };

  render() {
    const { questions } = this.state;
    return (
      <FluidContent mh="700px">
        <Title>ISEP d'Or</Title>
        <Flex flexWrap="wrap">{questions.map(this.renderQuestions)}</Flex>
      </FluidContent>
    );
  }
}
