import React, { Component } from 'react';
import styled from 'styled-components';

import * as pollData from '../../data/media/poll';

const Wrapper = styled.div`
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const TopBar = styled.div`
  background: ${props => props.theme.main};
  padding: 15px;
  font-size: 25px;
  font-weight: bold;
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
    voted: false,
    answer: null,
    data: this.props.data,
  }

  componentDidMount() {
    pollData.getVote(this.state.data.id).then(res => {
      if (res.data) {
        this.setState({ voted: true, answer: res.data.answer });
      }
    })
  }

  handleVote = (ans) => {
    if (!this.state.voted) {
      this.setState({ voted: true, answer: ans });
      pollData.vote(this.state.data.id, ans.id).then(res => {
        pollData.getPoll(this.props.data.id).then(res => {
          this.setState({ data: res.data });
        })
      });
    }
  }

  getTotal() {
    const poll = this.state.data;
    return poll.answers.reduce((acc, x) => acc + x.votesNb , 0);
  }

  render() {
    const poll = this.state.data;
    const total = this.getTotal();
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
                  vote={this.state.answer}
                  total={total}
                  onClick={() => this.handleVote(a)}
                  answer={a} />
              );
            })
          }
          {this.state.voted && <Caption>{total} votes</Caption>}
        </Main>
      </Wrapper>
    );
  }
}

export default Poll;

const AnswerStyle = styled.div`
  position: relative;
  background: rgba(63, 81, 181, 0.43);
  border-radius: 5px;
  margin-bottom: 10px;
  overflow: hidden;

  ${props => !props.voted && `
    &:hover {
      background: rgba(63, 81, 181, 0.7);
      color: white;
      cursor: pointer;
    }
  `}
`;

const AnswerText = styled.div`
  padding: 10px 15px;
  color: ${props => props.vote ? props.theme.accent : 'white'};
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
  transition: width .5s ease;
`;

function Answer(props) {
  const answer = props.answer;

  const percent = (answer.votesNb / props.total) * 100;
  return (
    <AnswerStyle voted={props.vote} onClick={props.onClick}>
      <AnswerText vote={props.vote && props.vote.id === answer.id}>
        {answer.content} {
          props.vote &&
          <span>- {answer.votesNb} vote{answer.votesNb != 1 && 's'}</span>
        }
      </AnswerText>
      <AnswerBar style={{ width: (props.vote ? percent : 0) + '%' }} />
    </AnswerStyle>
  )
}
