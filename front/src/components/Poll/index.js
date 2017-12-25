// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import * as moment from 'moment';
import { Flex, Box } from 'grid-styled';
import { Text } from '../common';

import * as pollData from 'data/media/poll';
import * as authData from 'data/auth';

const Wrapper = styled.div`
  background: white;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`;

const TopBar = styled.div`
  background: ${props => props.theme.main};
  padding: 15px;
  font-size: 25px;
  font-weight: 500;
  color: ${props => props.theme.accent};
`;

const Question = styled.h1`
  color: ${props => props.theme.main};
  margin: 0;
  margin-bottom: 20px;
  font-size: 20px;
`;

const Main = styled.div`
  padding: 20px;
`;

const Caption = styled.p`
  margin: 0;
  color: ${props => props.theme.main};
  font-size: 15px;
  text-align: right;
`;

class Poll extends Component {
  state = {
    showVote: false,
    answers: [],
    data: this.props.data,
    ended: false,
  };

  componentDidMount() {

    if (this.isEnded()) {
      this.setState({ showVote: true, ended: true });
    };

    if (!authData.isLoggedIn()) {
      this.setState({ showVote: true });
    } else {
      pollData.getVotes(this.state.data.id).then(res => {
        if (res.data.length > 0) {
          this.setState({ showVote: true, answers: res.data.map(d => d.answer) });
        };
      });
    };
  };

  isEnded = () => {
    return this.state.data.endDate < new Date().getTime();
  };

  handleVote = (ans) => {
    const { showVote, data, answers } = this.state;
    if (!this.isEnded()) {
      if (!showVote || (data.multiAnswers &&
        answers.length < data.answers.length)) {
        this.setState({ showVote: true, answers: [...answers, ans] });
        pollData.vote(data.id, ans.id).then(res => {
          pollData.getPoll(this.props.data.id).then(res => {
            this.setState({ data: res.data });
          });
        });
      };
    };
  };

  getTotal() {
    const poll = this.state.data;
    return poll.answers.reduce((acc, x) => acc + x.votesNb, 0);
  };

  render() {
    const poll = this.state.data;
    const total = this.getTotal();
    const remainDate = moment(poll.endDate).fromNow();
    return (
      <Wrapper>
        <TopBar>Sondage</TopBar>
        <Main>
          <Question>{poll.name}</Question>
          {
            poll.answers.map(a => {
              return (
                <Answer
                  key={a.id}
                  showVote={this.state.showVote || this.isEnded()}
                  voted={this.state.answers.filter(as => as.id === a.id).length > 0}
                  total={total}
                  multiAnswers={poll.multiAnswers}
                  ended={this.isEnded()}
                  onClick={() => this.handleVote(a)}
                  answer={a} />
              );
            })
          }
          {poll.multiAnswers && <Text fs="0.8em" mb={0.5}>Plusieurs réponses possibles</Text>}
          <Flex>
            <Box>
              <Text fs="0.9em">
                {!this.state.ended ? `Fini ${remainDate}` : 'Sondage terminé le ' + moment(poll.endDate).format('Do MMMM YYYY [à] HH:mm')}
              </Text>
            </Box>
            <Box ml="auto">
              {this.state.showVote && <Caption>{total} vote{total !== 1 && 's'}</Caption>}
            </Box>
          </Flex>
        </Main>
      </Wrapper>
    );
  };
};

export default Poll;

const AnswerStyle = styled.div`
  position: relative;
  background: rgba(63, 81, 181, 0.43);
  border-radius: 5px;
  margin-bottom: 10px;
  overflow: hidden;
  &:hover {
    ${props => (props.selectable || !props.showVote) && `
      background: rgba(63, 81, 181, 0.7);
      color: white;
      cursor: pointer;
    `}
  }
`;

const AnswerText = styled.div`
  padding: 10px 15px;
  color: ${props => props.voted ? props.theme.accent : 'white'};
  position: relative;
  z-index: 1;
`;

const AnswerBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background: ${props => props.theme.main};
  border-radius: 5px;
  transition: width 0.5s ease;
`;

function Answer(props) {
  const answer = props.answer;
  const percent = props.total > 0 ? Math.round((answer.votesNb / props.total) * 100) : 0;
  return (
    <AnswerStyle
      showVote={props.showVote}
      selectable={!props.voted && props.multiAnswers && !props.ended}
      onClick={props.onClick}>
      <AnswerText voted={props.voted}>
        {answer.content}
        {
          props.showVote &&
          <span> - {percent}%</span>
        }
      </AnswerText>
      <AnswerBar style={{
        width: (props.showVote ? percent : 0) + '%'
      }} />
    </AnswerStyle>
  );
};
