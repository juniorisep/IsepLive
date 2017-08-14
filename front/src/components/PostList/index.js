// @flow

import React from 'react';

import styled from 'styled-components';
import {Box, Flex} from 'grid-styled';

import Button from 'material-ui/Button';

import LikeButton from './LikeButton';

import {
  ProfileImage,
  Subtitle,
  Text,
  BgImage,
  Title,
  ImageLink,
} from '../common';

import Time from '../Time';
import Author from '../Author';
import Poll from '../Poll';

const PostList = styled.ul`
  padding: 0;
`;

const Post = styled.li`
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  background: white;
  margin-bottom: 20px;
  display: flex;
  overflow: hidden;
  flex-direction: ${props => props.invert ? 'row-reverse' : 'row'};

  @media (max-width: 40em) {
    flex-direction: column;
  }
`;

const PostContent = styled.div`
  height: 100%;
  position: relative;
  ${props => props.bg && 'background: black;'}

  @media (max-width: 40em) {
    height: 300px;
  }
`;

const PostText = Box.extend`
  padding: 20px;
  padding-bottom: 70px;
  position: relative;

  @media (max-width: 40em) {
    height: auto;
  }
`;

const IframeWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-bottom: 56.25%;
  top: 50%;
  margin-top: -28.1%;

  > iframe {
    border: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

const PostActions = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px;
  width: 100%;
  display: flex;
  align-items: center;
`;

function PostTitleView({ post }) {
  const dateFormat = 'Do MMMM YYYY [à] H[h]mm';
  if (post.author.authorType === 'student') {
    return (
      <Flex align="center" mb="10px">
        <Box mr="10px"><ProfileImage src={post.author.photoUrl} alt="logo-profile" w="40px" /></Box>
        <Box>
          <Title fontSize={1} invert>{post.author.firstname} {post.author.lastname}</Title>
          <Subtitle>Posté le <Time date={post.creationDate} format={dateFormat} /></Subtitle>
        </Box>
      </Flex>
    );
  };
  return (
    <Flex mb="10px">
      <Box>
        {
          post.title &&
          <Title fontSize={2} invert>{post.title}</Title>
        }
        <Subtitle>Posté le <Time date={post.creationDate} format={dateFormat} /></Subtitle>
      </Box>
      <Box ml="auto">
        <Author data={post.author} />
      </Box>
    </Flex>
  );
};

function PostTextView({post, handleLike, ...other}) {
  return (
    <PostText {...other}>
      <PostTitleView post={post} />
      <PostTextContent content={post.content} />
      <PostActions>
        <Button dense color="accent">Voir plus</Button>
        <Box ml="auto">
          <LikeButton post={post} />
        </Box>
      </PostActions>
    </PostText>
  );
};

function PostTextContent(props) {
  return (
    <div>
      {props.content.split('\n').map((par, i) => <Text key={i} mb={2}>{par}</Text>)}
    </div>
  );
};

export default function PostListView(props) {
  return (
    <PostList>
      {
        props.posts.map((p, i) => {
          const invert = i % 2 === 1;
          if (p.media) {
            switch (p.media.mediaType) {
              case 'poll':
                return (
                  <Post key={p.id} invert={invert}>
                    <Box w={[1, 1 / 2]}>
                      <Poll data={p.media} />
                    </Box>
                    <PostTextView post={p} w={[1, 1 / 2]} />
                    {/* <PostText w={[1, 1/2]}>
                      <PostTitleView post={p} />
                      <PostTextContent content={p.content} />
                      <PostActions>
                        <Button dense color="accent">Voir plus</Button>
                        <Box ml="auto">
                      <LikeButton post={p} />
                        </Box>
                      </PostActions>
                    </PostText> */}
                  </Post>
                );
              case 'image':
                return (
                  <Post key={p.id} invert={invert}>
                    <Box w={[1, 1 / 2]}>
                      <ImageLink src={p.media.fullSizeUrl}>
                        <BgImage src={p.media.thumbUrl} mh="250px" />
                      </ImageLink>
                    </Box>
                    <PostTextView post={p} w={[1, 1 / 2]} />
                  </Post>
                )
              case 'videoEmbed':
                return (
                  <Post key={p.id} invert={invert}>
                    <Box w={[1, 1 / 2]}>
                      <PostContent bg>
                        <IframeWrap>
                          <iframe src={p.media.url} scrolling="no" allowTransparency allowFullScreen></iframe>
                        </IframeWrap>
                      </PostContent>
                    </Box>
                    <PostTextView post={p} w={[1, 1 / 2]} />
                  </Post>
                );
            };
          } else {
            return (
              <Post key={p.id} invert={invert}>
                <PostTextView post={p} w={[1]} />
              </Post>
            );
          };
        })
      }
    </PostList>
  );
};
