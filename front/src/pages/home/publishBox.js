// @flow

import React, { Component } from 'react';

import styled from 'styled-components';
import { Box, Flex } from 'grid-styled';

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import { LinearProgress } from 'material-ui/Progress';

import AddCircleIcon from 'material-ui-icons/AddCircle';

import * as postData from 'data/post';
import * as mediaData from 'data/media';
import * as pollData from 'data/media/poll';
import * as imageData from 'data/media/image';
import * as videoData from 'data/media/video';
import * as authData from 'data/auth';
import type { PostDTO } from 'data/post/type';

import { makeCancelable } from '../../data/util';

import { sendAlert } from '../../components/Alert';

import {
  MediaCreator,
  PollForm,
  ImageForm,
  VideoEmbedForm,
  VideoForm,
  GalleryForm,
  DocumentForm,
  GazetteForm,
  EventForm
} from 'components/PostList/MediaForms';

import { ProfileImage, Text } from 'components/common';

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
  resize: none;
  min-height: 80px;
`;

function SendAs(props) {
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
    id: 'document',
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
];

class PublishBoxView extends Component {
  state = {
    title: '',
    message: '',
    isPrivateMessage: true,
    selectedIndex: -1,
    mediaMenuOpen: false,
    authorMenuOpen: false,
    author: null,
    authorList: [],
    mediaCreatorOpen: false,
    form: null,
    mediaSelected: null,
    isUploading: false,
    uploadMode: 'undeterminate',
    messageRows: 2,
  };

  componentDidMount() {
    if (authData.isLoggedIn()) {

      const savedMessage = localStorage.getItem('saved-message');
      if (savedMessage) {
        this.setState({ message: savedMessage })
      }

      this.getAuthorsReq = makeCancelable(postData.getAuthors());
      this.getAuthorsReq.promise.then(res => {
        const authors = res.data.map(a => {
          return {
            id: a.id,
            name: a.authorType === 'student' ? 'Moi' : a.name,
            image: a.authorType === 'club' ? a.logoUrl : a.photoUrl,
            type: a.authorType,
            isAdmin: a.authorType === 'club' ? a.admin : false,
          };
        });
        this.setState({ authorList: authors, author: authors[0] });
      }).catch(err => { });
    };
  };

  componentWillUnmount() {
    if (this.getAuthorsReq) {
      this.getAuthorsReq.cancel();
    }
  }

  onTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  onMessageChange = (e) => {
    localStorage.setItem('saved-message', e.target.value);
    const numLines = e.target.value.split('\n').length;
    this.setState({
      message: e.target.value,
      messageRows: Math.min(numLines + 1, 15),
    });
  };

  onPrivateToggle = () => {
    this.setState({ isPrivateMessage: !this.state.isPrivateMessage })
  };

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
  };

  handleErrors = (err) => {
    if (err.response) {
      sendAlert("Le post n'a pu être publié", 'error');
    }
  }

  onPublish = () => {
    if (this.state.mediaSelected) {
      const toUpload = ['gallery', 'video', 'document', 'image'];
      if (toUpload.includes(this.state.mediaSelected.id)) {
        this.setState({ isUploading: true });
      }

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
        .then(() => {
          sendAlert("Post publié");
          localStorage.removeItem('saved-message');
          this.setState({ title: '', message: '', isUploading: false })
        })
        .then(this.props.refreshPosts)
        .catch(this.handleErrors);
      return;
    };
    this.publishPost()
      .then(res => {
        sendAlert("Post publié");
        localStorage.removeItem('saved-message');
        this.setState({ title: '', message: '' })
      })
      .then(this.props.refreshPosts)
      .catch(this.handleErrors);
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
    const { author, title, message, mediaSelected } = this.state;

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
      let list = [
        ...mediaAvailable,
        { id: 'gallery', name: 'Gallerie' },
        { id: 'event', name: 'Evenement' },
      ];
      if (author.isAdmin) {
        list.push({ id: 'gazette', name: 'Gazette' })
      };
      return list;
    };
    return mediaAvailable;
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
      case 'event':
        return mediaData.createEvent(this.state.form, this.state.author.id);
      case 'document':
        return mediaData.createDocument(this.state.form);
      case 'gazette':
        return mediaData.createGazette(this.state.form);
      default:
        break;
    };
  };

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
      case 'document':
        return <DocumentForm update={this.onFormChange} />;
      case 'gazette':
        return <GazetteForm update={this.onFormChange} />;
      case 'event':
        return <EventForm update={this.onFormChange} />;
      default:
        break;
    };
  };

  render() {
    const { author, isUploading } = this.state;
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
            rows={this.state.messageRows}
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
          <Flex align="center" wrap>
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
                    checked={this.state.isPrivateMessage}
                    value={this.state.isPrivateMessage}
                    style={{ color: 'white' }}
                    onChange={this.onPrivateToggle} />
                }
                label={<span style={{ color: 'white', fontWeight: 500 }}>PRIVÉ</span>} />
            </Box>
            <Box ml="5px">
              <Button onClick={this.changeAuthor}>
                <SendAs author={this.state.author} />
              </Button>
            </Box>
            <Box ml="10px">
              <Button raised
                color="accent"
                style={{ float: "right" }}
                onClick={this.onPublish}
                disabled={!canPublish || isUploading}>Publier</Button>
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
          {isUploading && <LinearProgress />}
        </PublishBox>
      </div>
    );
  };
};

export default PublishBoxView;
