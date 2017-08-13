// @flow
import React, {Component} from 'react';

import styled from 'styled-components';
import {Box, Flex} from 'grid-styled';

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Menu, {MenuItem} from 'material-ui/Menu';
import AddCircleIcon from 'material-ui-icons/AddCircle';

import * as postData from 'data/post';
import * as pollData from 'data/media/poll';
import * as authData from 'data/auth';
import {PostDTO} from 'data/post/type';

import {MediaCreator, PollForm} from './mediaForms';

import {ProfileImage, Text,} from 'components/common';

const PublishBox = styled.div`
  background: ${props => props.theme.main};
  margin-bottom: 20px;
  padding: 20px;
`;

const TitleBox = styled.input`
  font-family: 'Roboto';
  font-size: 1.3em;
  padding: .4em;
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
      <Box mr="10px"><ProfileImage w="20px" src={author && author.image} /></Box>
      <Box><Text color={props.c || 'white'} m="0">{author && author.name}</Text></Box>
    </Flex>
  );
};

class PublishBoxView extends Component {

  state = {
    title: null,
    message: '',
    selectedIndex: -1,
    mediaMenuOpen: false,
    authorMenuOpen: false,
    author: null,
    authorList: [],
    mediaCreatorOpen: false,
    form: null,
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
        this.setState({authorList: authors, author: authors[0]});
      });
    };
  };

  onTitleChange = (event) => {
    this.setState({title: event.target.value});
  };

  onMessageChange = (event) => {
    this.setState({message: event.target.value});
  };

  onPublish = () => {
    const dto: PostDTO = {
      authorId: this.state.author.id,
      content: this.state.message,
      title: this.state.title
    };
    let postId;
    postData.createPost(dto)
      .then(res => {
        postId = res.data.id;
        return res.data.id
      })
      .then(postData.publishPost)
      .then(res => {
        this.setState({title: null, message: ''});
      }).then(() => {
      if (this.state.mediaSelected) {
        this.createMedia()
          .then(res => res.data.id)
          .then(id => {
            return id;
          })
          .then((mediaId) => postData.addMedia(postId, mediaId))
          .then(this.closeMediaCreator)
          .then(this.props.refreshPosts);
        return;
      };
      this.props.refreshPosts();
    });
  };

  createMedia = () => {
    switch (this.state.mediaSelected) {
      case 'poll':
        return pollData.createPoll(this.state.form);
    };
  };

  handleMediaSelect = (item) => {
    switch (item) {
      case 'poll':
        break;
      case 'file':
        this.inputFile.click();
        break;
    };
    this.setState({mediaSelected: item, mediaCreatorOpen: true});
    this.handleMediaMenuClose();
  };

  handleMediaMenuClose = () => {
    this.setState({mediaMenuOpen: false});
  };

  openMediaMenu = (event) => {
    this.setState({mediaMenuOpen: true, anchorEl: event.currentTarget});
  };

  handleAuthorMenuClose = () => {
    this.setState({authorMenuOpen: false});
  };

  handleAuthorSelect = (author) => {
    this.setState({
      title: null, message: '',
      author, authorMenuOpen: false
    });
  };


  changeAuthor = (event) => {
    this.setState({authorMenuOpen: true, anchorEl: event.currentTarget});
  };

  closeMediaCreator = () => {
    this.setState({mediaCreatorOpen: false, form: null, mediaSelected: null});
  };

  onFormChange = (form) => {
    this.setState({form});
  };

  canPublish() {
    const {author, title, message} = this.state;
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

  render() {
    const {author} = this.state;
    const canPublish = this.canPublish();
    return (
      <div>
        <PublishBox>
          {
            author && author.type == 'club' &&
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
          <Flex align="center">
            <Box>
              <IconButton color="contrast" onClick={this.openMediaMenu}>
                <AddCircleIcon />
              </IconButton>
            </Box>
            <Box ml="auto">
              <Button onClick={this.changeAuthor}>
                <SendAs author={this.state.author} />
              </Button>
            </Box>
            <Box ml="10px">
              <Button raised color="accent" style={{float: "right"}} onClick={this.onPublish} disabled={!canPublish}>Publier</Button>
            </Box>
          </Flex>
          <input
            id="file"
            type="file"
            ref={inputFile => this.inputFile = inputFile}
            accept="jpg,jpeg,JPG,JPEG"
            multiple
            style={{display: 'none'}}
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
                    selected={this.state.author == a}>
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
            <MenuItem onClick={() => this.handleMediaSelect('poll')}>Sondage</MenuItem>
            <MenuItem onClick={() => this.handleMediaSelect('gallery')}>Gallerie</MenuItem>
            <MenuItem onClick={() => this.handleMediaSelect('videoEmbed')}>Vid. FB/YT</MenuItem>
            <MenuItem onClick={() => this.handleMediaSelect('file')}>Fichier</MenuItem>
          </Menu>
          {/* <MediaDialog
            open={this.state.dialogOpen}
            handleRequestClose={this.closeDialogMedia}
            onCreate={this.onCreateMedia}
            title="Sondage"
            >

          </MediaDialog> */}
        </PublishBox>
        <MediaCreator
          title="Sondage"
          show={this.state.mediaCreatorOpen}
          onDelete={this.closeMediaCreator}>
          {this.state.mediaSelected === 'poll' && <PollForm update={this.onFormChange} />}
        </MediaCreator>
      </div>
    );
  };
};

export default PublishBoxView;
