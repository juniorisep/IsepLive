// @flow

import React, { Component } from 'react';

import Tooltip from 'material-ui/Tooltip';
import { Box } from 'grid-styled';
import styled from 'styled-components';
import { backUrl } from '../../../config';

import {
  Post,
  PostTextView,
} from 'components/PostList';

import {
  BgImage,
  ImageLink,
  Paper,
  Title,
} from 'components/common';

const Background = styled.div`
  background: linear-gradient(to bottom right, ${({ theme }) => theme.main}, ${({ theme }) => theme.accent});
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


class GazettePost extends Component {
  render() {
    const props = this.props;
    const size = props.preview ? [1] : [1, 1 / 2];
    return (
      <Post invert={props.invert}>
        <Box w={size}>
          <Paper>
            <Background>
              <a href={backUrl + props.post.media.url}>
                <Tooltip title="Télécharger la gazette" placement="top">
                  <FileLogo src="/img/svg/gazette-icon.svg" />
                </Tooltip>
              </a>
              <FileName>{props.post.media.title}</FileName>
            </Background>
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

export default GazettePost;
