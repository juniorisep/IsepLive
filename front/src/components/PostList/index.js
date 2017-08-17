// @flow

import React, {Component} from 'react';

import styled from 'styled-components';
import {Box, Flex} from 'grid-styled';

import {NavLink} from 'react-router-dom';

import Button from 'material-ui/Button';
import FacebookPlayer from 'react-facebook-player';

import LikeButton from './LikeButton';
import EditButton from './EditButton';
import PostTitleView from './PostTitleView';

import * as postData from 'data/post';


import PollPost from './Posts/PollPost';
import ImagePost from './Posts/ImagePost';
import TextPost from './Posts/TextPost';
import VideoPost from './Posts/VideoPost';

import {FACEBOOK_APP_ID} from 'config';

import {
  ProfileImage,
  Subtitle,
  Text,
  BgImage,
  Title,
  ImageLink,
  YoutubeVideo,
  FacebookVideo,
} from '../common';

import Time from '../Time';
import Author from '../Author';
import Poll from '../Poll';

const PostList = styled.ul`
  padding: 0;
`;

export const Post = styled.li`
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  background: white;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  flex-direction: ${props => props.invert ? 'row-reverse' : 'row'};

  @media (max-width: 40em) {
    flex-direction: column;
  }
`;

const PostContent = styled.div`
  height: ${props => props.fb ? 'auto' : '250px'};
  position: relative;
  ${props => props.fb && 'background: black;'}

  @media (max-width: 40em) {
    height: ${props => props.fb ? 'auto': '300px'};
  }
`;

export const PostText = Box.extend`
  padding: 20px;
  padding-bottom: 70px;
  position: relative;

  @media (max-width: 40em) {
    height: auto;
  }
`;

export const PostActions = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px;
  width: 100%;
  display: flex;
  align-items: center;
`;

export class PostTextView extends Component {

  toggleLike = () => {
    postData.toggleLikePost(this.props.post.id);
  }

  render() {
    const {post, refresh, preview} = this.props;
    return (
      <PostText w={this.props.w}>
        <PostTitleView post={post} />
        <PostTextContent content={post.content} preview={!preview} />
        <PostActions>
          {
            !preview &&
            <Button dense color="accent" component={NavLink} to={`/post/${post.id}`}>
              Voir plus
            </Button>
          }
          {
            post.hasWriteAccess &&
            <Box ml="5px">
              <EditButton post={post} refresh={refresh} />
            </Box>
          }
          <Box ml="auto">
            <LikeButton liked={post.liked} likes={post.nbLikes} toggleLike={this.toggleLike} />
          </Box>
        </PostActions>
      </PostText>
    );
  }
};

export function PostTextContent(props) {
  const text = props.preview ? props.content
  .slice(0, 200)
  .split('\n')
  .slice(0,3) : props.content.split('\n');
  return (
    <div>
      { text.map((par, i) => <Text key={i} mb={1}>{par}</Text>) }
    </div>
  );
};

export function PostView(props) {
  if (props.post.media) {
    switch (props.post.media.mediaType) {
      case 'poll':
        return <PollPost {...props} />;
      case 'image':
        return <ImagePost {...props} />;
      case 'video':
        return <VideoPost {...props} />;
      default:
        return null;
    }
  } else {
    return <TextPost {...props} />
  }
}

export default function PostListView(props) {
  return (
    <PostList>
      {
        props.posts.map((p, i) => {
          const invert = i % 2 === 1;
          return (
            <PostView
              key={p.id}
              preview={false}
              post={p}
              list={true}
              invert={invert}
              refresh={props.refreshPosts}
            />
          );
        })
      }
    </PostList>
  );
};


//     case 'videoEmbed':
//       return (
//         <Post key={p.id} invert={invert}>
//           <Box w={[1, 1 / 2]}>
//             <PostContent fb={p.media.type === 'FACEBOOK'}>
//               {
//                 p.media.type === 'FACEBOOK' ?
//                   // <FacebookVideo url={p.media.url} />
//                     <FacebookPlayer
//                       appId={FACEBOOK_APP_ID}
//                       videoId={p.media.url}
//                     />
//                 :
//                 <YoutubeVideo url={p.media.url} />
//               }
//             </PostContent>
//           </Box>
//           <PostTextView refresh={props.refresh} post={p} w={[1, 1 / 2]} />
//         </Post>
//       );
