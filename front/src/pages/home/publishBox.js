// @flow

import React, { Component } from 'react';

import styled from 'styled-components';
import { Box, Flex } from 'grid-styled';

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import {
  FormControlLabel,
} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

import AddCircleIcon from 'material-ui-icons/AddCircle';

import * as postData from 'data/post';
import * as pollData from 'data/media/poll';
import * as imageData from 'data/media/image';
import * as videoData from 'data/media/video';
import * as authData from 'data/auth';
import type { PostDTO } from 'data/post/type';

import {
  MediaCreator,
  PollForm, ImageForm, VideoEmbedForm, VideoForm, GalleryForm
} from './mediaForms';

import {
  ProfileImage,
  Text,
} from 'components/common';

const PublishBox = styled.div`
  background: ${props => props.theme.main};
  margin-bottom: 20px;
  padding: 20px;
`;

const TitleBox = styled.input`
  font-family: 'Roboto';
  font-size: 1.3em;
  padding: 0.4em;
  border: 5px solid transparent;
  outline: 0;
  border-radius: 5px;
  width: 100%;
  margin-bottom: ${props => props.m || '5px'};
`;

let MessageBox = TitleBox.withComponent('textarea');
MessageBox = MessageBox.extend`
  resize: vertical;
`;

function SendAs(props) {
  const Wrapper = styled.div`
    padding: 5px;
    display: inline-block;
    border-radius: 5px;

    &:hover {
      cursor: pointer;
      background: rgba(255, 255, 255, 0.2);
    }

    &:active {
      background: rgba(255, 255, 255, 0.4);
    }
  `;
  const author = props.author;
  return (
    <Flex align="center">
      <Box mr="10px"><ProfileImage sz="20px" src={author && author.image} /></Box>
      <Box><Text color={props.c || 'white'} m="0">{author && author.name}</Text></Box>
    </Flex>
  );
};

const mediaAvailable = [
  {
    id: 'poll',
    name: 'Sondage',
  },
  {
    id: 'image',
    name: 'Image',
  },
  {
    id: 'file',
    name: 'Pièce jointe',
  },
  {
    id: 'video',
    name: 'Video',
  },
  // {
  //   id: 'videoEmbed',
  //   name: 'Video FB/YT',
  // },
]

class PublishBoxView extends Component {

  state = {
    title: '',
    message: '',
    isPrivateMessage: false,
    selectedIndex: -1,
    mediaMenuOpen: false,
    authorMenuOpen: false,
    author: null,
    authorList: [],
    mediaCreatorOpen: false,
    form: null,
    mediaSelected: null,
  };

  componentDidMount() {
    if (authData.isLoggedIn()) {
      postData.getAuthors().then(res => {
        const authors = res.data.map(a => {
          return {
            id: a.id,
            name: a.authorType === 'student' ? 'Moi' : a.name,
            image: a.authorType === 'club' ? a.logoUrl : a.photoUrl,
            type: a.authorType,
          };
        });
        this.setState({ authorList: authors, author: authors[0] });
      });
    };
  };

  onTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  onMessageChange = (event) => {
    this.setState({ message: event.target.value });
  };

  onPrivateToggle = () => {
    this.setState({ isPrivateMessage: !this.state.isPrivateMessage })
  }

  publishPost() {
    const dto: PostDTO = {
      authorId: this.state.author.id,
      content: this.state.message,
      title: this.state.title,
      private: this.state.isPrivateMessage,
    };
    return postData.createPost(dto)
      .then(res => res.data.id)
      .then(id => {
        return postData.publishPost(id)
          .then(() => id);
      });
  }

  onPublish = () => {
    if (this.state.mediaSelected) {
      this.createMedia()
        .then(res => res.data.id)
        .then(mediaId => {
          return this.publishPost()
            .then((postId) => ({ mediaId, postId }));
        })
        .then((ids) => {
          return postData.addMedia(ids.postId, ids.mediaId)
            .then(() => ids.postId)
        })
        .then(this.closeMediaCreator)
        .then(res => {
          this.setState({ title: '', message: '' })
        })
        .then(this.props.refreshPosts);
      return;
    };
    this.publishPost()
      .then(res => {
        this.setState({ title: '', message: '' })
      })
      .then(this.props.refreshPosts);
  };

  createMedia = () => {
    switch (this.state.mediaSelected.id) {
      case 'poll':
        return pollData.createPoll(this.state.form);
      case 'image':
        return imageData.createImage(this.state.form.file);
      case 'videoEmbed':
        return videoData.createVideoEmbed(this.state.form);
      case 'video':
        return videoData.createVideo(this.state.form);
      case 'gallery':
        return imageData.createGallery(this.state.form);
    };
  };

  handleMediaSelect = (item) => {
    this.setState({ mediaSelected: item, mediaCreatorOpen: true });
    this.handleMediaMenuClose();
  };

  handleMediaMenuClose = () => {
    this.setState({ mediaMenuOpen: false });
  };

  openMediaMenu = (event) => {
    this.setState({ mediaMenuOpen: true, anchorEl: event.currentTarget });
  };

  handleAuthorMenuClose = () => {
    this.setState({ authorMenuOpen: false });
  };

  handleAuthorSelect = (author) => {
    this.setState({
      title: '', message: '',
      author, authorMenuOpen: false
    });
  };


  changeAuthor = (event) => {
    this.setState({ authorMenuOpen: true, anchorEl: event.currentTarget });
  };

  closeMediaCreator = () => {
    this.setState({ mediaCreatorOpen: false, form: null, mediaSelected: null });
  };

  onFormChange = (form) => {
    this.setState({ form });
  };

  canPublish() {
    const { author, title, message } = this.state;
    if (author && author.type === 'club') {
      if (title && message && title !== '' && message !== '') {
        return true;
      };
    } else {
      if (message && message !== '') {
        return true
      };
    };
    return false;
  };

  getMediaPublishList() {
    const { author } = this.state;
    if (author && author.type === 'club') {
      return [
        ...mediaAvailable,
        { id: 'gallery', name: 'Gallerie' },
      ];
    }
    return mediaAvailable;
  }

  renderForm() {
    switch (this.state.mediaSelected.id) {
      case 'poll':
        return <PollForm update={this.onFormChange} />;
      case 'image':
        return <ImageForm update={this.onFormChange} />;
      case 'videoEmbed':
        return <VideoEmbedForm update={this.onFormChange} />;
      case 'video':
        return <VideoForm update={this.onFormChange} />;
      case 'gallery':
        return <GalleryForm update={this.onFormChange} />;
    }
  }

  render() {
    const { author } = this.state;
    const canPublish = this.canPublish();
    return (
      <div>
        <PublishBox>
          {
            author && author.type === 'club' &&
            <TitleBox
              placeholder="Titre"
              m="15px"
              onChange={this.onTitleChange}
              value={this.state.title}
            />
          }
          <MessageBox
            placeholder="Tapez votre message"
            onChange={this.onMessageChange}
            value={this.state.message}
          />
          {
            this.state.mediaSelected &&
            <MediaCreator
              title={this.state.mediaSelected.name}
              show={this.state.mediaCreatorOpen}
              onDelete={this.closeMediaCreator}>
              {this.renderForm()}
            </MediaCreator>
          }
          <Flex align="center">
            <Box>
              <IconButton color="contrast" onClick={this.openMediaMenu}>
                <AddCircleIcon />
              </IconButton>
            </Box>
            <Box ml="auto">
              <FormControlLabel
                color="accent"
                control={
                  <Checkbox
                    value={this.state.isPrivateMessage}
                    style={{ color: 'white' }}
                    onChange={this.onPrivateToggle} />
                }
                label={<span style={{ color: 'white', fontWeight: 'bold' }}>PRIVÉ</span>} />
            </Box>
            <Box ml="5px">
              <Button onClick={this.changeAuthor}>
                <SendAs author={this.state.author} />
              </Button>
            </Box>
            <Box ml="10px">
              <Button raised color="accent" style={{ float: "right" }} onClick={this.onPublish} disabled={!canPublish}>Publier</Button>
            </Box>
          </Flex>
          <input
            id="file"
            type="file"
            ref={inputFile => this.inputFile = inputFile}
            accept="jpg,jpeg,JPG,JPEG"
            multiple
            style={{ display: 'none' }}
          />
          <Menu
            anchorEl={this.state.anchorEl}
            open={this.state.authorMenuOpen}
            onRequestClose={this.handleAuthorMenuClose}>
            {
              this.state.authorList.map(a => {
                return (
                  <MenuItem
                    key={a.id}
                    onClick={() => this.handleAuthorSelect(a)}
                    selected={this.state.author === a}>
                    <SendAs author={a} c="black" />
                  </MenuItem>
                );
              })
            }
          </Menu>
          <Menu
            anchorEl={this.state.anchorEl}
            open={this.state.mediaMenuOpen}
            onRequestClose={this.handleMediaMenuClose}>
            {
              this.getMediaPublishList().map(l => {
                return <MenuItem key={l.name} onClick={() => this.handleMediaSelect(l)}>{l.name}</MenuItem>
              })
            }
          </Menu>
        </PublishBox>
      </div>
    );
  };
};

export default PublishBoxView;
