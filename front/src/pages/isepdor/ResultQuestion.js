// @flow
import React from 'react';

import { Flex, Box } from 'grid-styled';
import Avatar from 'material-ui/Avatar';

import { Paper, Title, BgImage } from '../../components/common';

import type {
  QuestionDor,
  AnswerDor,
  AnswerDorScore,
} from '../../data/dor/type';

import { MAIN_COLOR, SECONDARY_COLOR } from '../../colors';
import { backUrl } from '../../config';

type Props = {
  question: QuestionDor,
  results: ?{ [id: number]: AnswerDorScore[] },
};

const DEFAULT_USER_IMAGE = '/img/svg/user.svg';
const DEFAULT_EVENT_IMAGE = '/img/svg/event-dor.svg';

function Rank({ pos, score }) {
  const isFirst = pos === 1;
  const style = {
    fontSize: isFirst ? 25 : 15,
    color: isFirst ? SECONDARY_COLOR : MAIN_COLOR,
  };
  return (
    <div
      style={{
        marginLeft: 'auto',
        textAlign: 'right',
      }}
    >
      <div style={style}>
        {pos}
        {isFirst ? 'er' : 'ème'}
      </div>
      <div style={{ color: '#aaa', fontSize: 13 }}>{score}%</div>
    </div>
  );
}

export default class ResultQuestion extends React.Component<Props> {
  renderResultItem = (ans: ?AnswerDor) => {
    let name, url;
    if (ans) {
      if (ans.type === 'author') {
        if (ans.value.authorType === 'student') {
          name = `${ans.value.firstname} ${ans.value.lastname}`;
          url = ans.value.photoUrlThumb
            ? this.buildBackUrl(ans.value.photoUrlThumb)
            : DEFAULT_USER_IMAGE;
        } else if (ans.value.authorType === 'club') {
          name = ans.value.name;
          url = this.buildBackUrl(ans.value.logoUrl);
        } else if (ans.value.authorType === 'employee') {
          name = `${ans.value.firstname} ${ans.value.lastname}`;
          url = DEFAULT_USER_IMAGE;
        }
      } else if (ans.type === 'event') {
        name = ans.value.name;
        url = DEFAULT_EVENT_IMAGE;
      }
    }
    return (
      <div style={{ display: 'inherit', alignItems: 'inherit' }}>
        <Avatar alt={name} src={url} style={{ marginRight: 10 }} />
        <span>{name}</span>
      </div>
    );
  };

  buildBackUrl(url: ?string): ?string {
    if (url) {
      return backUrl + url;
    }
    return null;
  }

  renderResults() {
    const { question, results } = this.props;
    if (results) {
      let resultList = results[question.id];
      if (results[question.id]) {
        const resultAnswers: AnswerDor[] = resultList.map(r => {
          if (r.voteDor.resAuthor) {
            return {
              type: 'author',
              score: r.score,
              value: r.voteDor.resAuthor,
            };
          } else if (r.voteDor.resEvent) {
            return {
              type: 'event',
              score: r.score,
              value: r.voteDor.resEvent,
            };
          }
        });

        const totalVotes = resultAnswers.reduce((all, v) => all + v.score, 0);
        const computeSharePercent = (total, score) =>
          Math.round(score * 100 / total);
        return resultAnswers.map((ans, index) => (
          <Box key={ans.value.id} mb={2}>
            <Flex align="center">
              {this.renderResultItem(ans)}
              <Rank
                pos={index + 1}
                score={computeSharePercent(totalVotes, ans.score)}
              />
            </Flex>
          </Box>
        ));
      }
    }
    return null;
  }

  getImg(): ?string {
    const { question, results } = this.props;

    if (results) {
      const answers = results[question.id];
      if (answers && answers.length > 0) {
        const res = answers[0];
        if (res.voteDor.resAuthor) {
          const author = res.voteDor.resAuthor;
          if (author.authorType === 'student') {
            return this.buildBackUrl(author.photoUrlThumb);
          }
          if (author.authorType === 'club') {
            return this.buildBackUrl(author.logoUrl);
          }
          if (author.authorType === 'employee') {
            return '/img/svg/user.svg';
          }
        }
        if (res.voteDor.resEvent) {
          return DEFAULT_EVENT_IMAGE;
        }
      }
    }

    return null;
  }

  render() {
    const { question, results } = this.props;
    return (
      <Paper>
        <BgImage
          mh="200px"
          local
          src={this.getImg()}
          defaultSrc="/img/svg/unknown.svg"
        />
        <Box p="20px">
          <Title invert>{question.title}</Title>
          <Flex flexDirection="column">{this.renderResults()}</Flex>
        </Box>
      </Paper>
    );
  }
}
