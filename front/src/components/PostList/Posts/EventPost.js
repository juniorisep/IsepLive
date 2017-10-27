// @flow

import React, { Component } from 'react';

import Tooltip from 'material-ui/Tooltip';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import { backUrl } from '../../../config';

import {
  Post,
  PostTextView,
} from 'components/PostList';

import CountDown from '../../Time/CountDown';
import Time from '../../Time';

import {
  BgImage,
  ImageLink,
  Paper,
  Title,
} from 'components/common';

const Background = styled.div`
  // background: linear-gradient(to bottom right, ${({ theme }) => theme.main}, ${({ theme }) => theme.accent});
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FileLogo = styled.img`
  width: 90px;
  margin-bottom: 10px;
`;

const FileName = styled.h2`
  font-size: 1.3em;
  font-weight: bold;
  color: white;
  margin: 0;
`;


export default class EventPost extends Component {
  render() {
    const props = this.props;
    const size = props.preview ? [1] : [1, 1 / 2];
    return (
      <Post invert={props.invert}>
        <Box w={size}>
          <Paper>
            <BgImage src={props.post.media.imageUrl}>
              <Background>
                <FileLogo src="/img/svg/event.svg" />
                <FileName>{props.post.media.title}</FileName>
                <CountDown date={props.post.media.date} fs=".8em" endDisplay={
                  <Time date={props.post.media.date} format="DD/MM/YYYY HH:mm" />
                } />
              </Background>
            </BgImage>
          </Paper>
        </Box>
        <PostTextView
          post={props.post}
          refresh={props.refresh}
          w={size}
          preview={props.preview}
        />
      </Post>
    );
  }
}