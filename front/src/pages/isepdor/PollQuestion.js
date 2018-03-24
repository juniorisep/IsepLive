// @flow
import React from 'react';

import { Flex, Box } from 'grid-styled';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';

import {
  Paper,
  Title,
  Text,
  FluidContent,
  BgImage,
} from '../../components/common';
import Autocomplete from '../../components/Autocomplete';

import type {
  QuestionDor,
  EventDor,
  AnswerDor,
  VoteDor,
} from '../../data/dor/type';
import * as dorData from '../../data/dor';

import * as userData from '../../data/users/student';
import { backUrl } from '../../config';

type Props = {
  answer: ?VoteDor,
  question: QuestionDor,
  onAnswer: () => mixed,
};

type State = {
  selectedValue: string,
  selected: ?AnswerDor,
};

export default class PollQuestionDor extends React.Component<Props, State> {
  state = {
    selectedValue: '',
    selected: null,
  };

  renderSugg = (ans: AnswerDor) => {
    if (ans.type === 'student') {
      const name = `${ans.value.firstname} ${ans.value.lastname}`;
      const url = ans.value.photoUrlThumb
        ? backUrl + ans.value.photoUrlThumb
        : '/img/svg/user.svg';
      return (
        <div style={{ display: 'inherit', alignItems: 'inherit' }}>
          <Avatar alt={name} src={url} style={{ marginRight: 10 }} />
          <span>{name}</span>
        </div>
      );
    }
    return null;
  };

  onSelect = (data: AnswerDor) => {
    this.setState({
      selected: data,
    });
    if (data.type === 'student') {
      return `${data.value.firstname} ${data.value.lastname}`;
    }
    return '';
  };

  onSearch = (search: string): Promise<any[]> => {
    this.setState({ selectedValue: search });
    if (!search) {
      return Promise.resolve([]);
    }

    const { question } = this.props;
    const promoFilter = [];
    if (question.enablePromo) {
      promoFilter.push(question.promo);
    }
    const students = userData
      .searchStudents(search, promoFilter, 'a', 0)
      .then(res => {
        return res.data.content.map(s => ({
          type: 'student',
          value: s,
        }));
      });
    const all = [students];
    return Promise.all(all).then(res =>
      res.reduce((all, el) => all.concat(el), [])
    );
  };

  handleVote = () => {
    const { question } = this.props;
    const { selected } = this.state;
    if (selected) {
      dorData.handleVote(question.id, selected).then(res => {
        this.props.onAnswer();
      });
    }
  };

  getImg(): ?string {
    const { selected } = this.state;
    const { answer } = this.props;

    if (answer) {
      if (answer.resAuthor) {
        const author = answer.resAuthor;
        if (author.authorType === 'student') {
          return author.photoUrlThumb;
        }
      }
    }

    if (selected) {
      if (selected.type === 'student') {
        return selected.value.photoUrlThumb;
      }
    }

    return null;
  }

  getLabels() {
    const { question } = this.props;
    const style = {
      marginRight: 5,
    };
    return (
      <div>
        {question.enableStudent && <Chip style={style} label="Elève" />}
        {question.enableEmployee && <Chip style={style} label="Employé" />}
        {question.enableClub && <Chip style={style} label="Club" />}
        {question.enableEvent && <Chip style={style} label="Evènement" />}
        {question.enableParty && <Chip style={style} label="Soirée" />}
      </div>
    );
  }

  render() {
    const { question, answer } = this.props;
    let answerTextValue;
    if (answer) {
      if (answer.resAuthor) {
        const author = answer.resAuthor;
        if (author.authorType === 'student') {
          answerTextValue = `${author.firstname} ${author.lastname}`;
        }
      }
    }
    return (
      <Paper>
        <BgImage
          mh="200px"
          src={this.getImg()}
          defaultSrc="/img/svg/unknown.svg"
        />
        <Box p="20px">
          <Title invert>{question.title}</Title>
          <Box mb="10px">{this.getLabels()}</Box>
          <Autocomplete
            label="Mon choix"
            disabled={answer != null}
            value={answerTextValue}
            renderSuggestion={this.renderSugg}
            onSelect={this.onSelect}
            search={this.onSearch}
          />
          {!answer && (
            <Button
              onClick={this.handleVote}
              style={{ marginTop: 10 }}
              size="small"
              color="secondary"
            >
              Valider
            </Button>
          )}
        </Box>
      </Paper>
    );
  }
}
