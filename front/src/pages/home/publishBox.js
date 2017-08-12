import React, {Component} from 'react';

import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Menu, {MenuItem} from 'material-ui/Menu';
import AddCircleIcon from 'material-ui-icons/AddCircle';

import * as postData from '../../data/post';
import * as authData from '../../data/auth';
import {PostDTO} from '../../data/post/type';

import {
  Filler,
  ProfileImage,
  Text,
} from '../../components/common';

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
  margin-bottom: ${props => props.m || '5px'};
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
  )
}

class PublishBoxView extends Component {

  state = {
    title: null,
    message: '',
    selectedIndex: -1,
    mediaMenuOpen: false,
    authorMenuOpen: false,
    author: null,
    authorList: [],
  }

  componentDidMount() {
    if (authData.isLoggedIn()) {
      postData.getAuthors().then(res => {
        const authors = res.data.map(a => {
          return {
            id: a.id,
            name: a.authorType === 'student' ? 'Moi' : a.name,
            image: a.authorType === 'club' ? a.logoUrl : a.photoUrl,
            type: a.authorType,
          }
        })
        this.setState({ authorList: authors, author: authors[0] });
      })
    }
  }

  onTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  onMessageChange = (event) => {
    this.setState({ message: event.target.value });
  }

  onPublish = () => {
    const dto: PostDTO = {
      authorId: this.state.author.id,
      content: this.state.message,
      title: this.state.title
    }
    postData.createPost(dto)
    .then(res => res.data.id)
    .then(postData.publishPost)
    .then(res => {
      this.setState({ title: null, message: '' });
    }).then(this.props.refreshPosts);
  }

  handleMediaSelect = (item) => {
    switch (item) {
      case 'poll':
        break;
      case 'file':
        this.inputFile.click();
        break;
    }
    this.handleMediaMenuClose();
  }

  handleMediaMenuClose = () => {
    this.setState({mediaMenuOpen: false});
  }

  openMediaMenu = (event) => {
    this.setState({mediaMenuOpen: true, anchorEl: event.currentTarget});
  }

  handleAuthorMenuClose = () => {
    this.setState({ authorMenuOpen: false });
  }

  handleAuthorSelect = (author) => {
    this.setState({
      title: null, message: '',
      author, authorMenuOpen: false
    });
  }

  changeAuthor = (event) => {
    this.setState({ authorMenuOpen: true, anchorEl: event.currentTarget });
  }

  canPublish() {
    const { author, title, message } = this.state;
    if (author && author.type === 'club') {
      if (title && message && title !== '' && message !== '') {
        return true;
      }
    } else {
      if (message && message !== '') {
        return true
      }
    }
    return false;
  }

  render() {
    const { author } = this.state;
    const canPublish = this.canPublish();
    return (
      <PublishBox>
        {
          author && author.type == 'club' &&
          <TitleBox
            placeholder="Titre"
            m="15px"
            onChange={this.onTitleChange}
            value={this.state.title} />
        }
        <MessageBox
          placeholder="Tapez votre message"
          onChange={this.onMessageChange}
          value={this.state.message}/>
        <Flex align="center">
          <Box>
            <IconButton color="contrast" onClick={this.openMediaMenu}>
              <AddCircleIcon/>
            </IconButton>
          </Box>
          <Box ml="auto">
            <Button onClick={this.changeAuthor}>
              <SendAs author={this.state.author} />
            </Button>
          </Box>
          <Box ml="10px">
            <Button raised color="accent" style={{ float: "right" }} onClick={this.onPublish} disabled={!canPublish}>Publier</Button>
          </Box>
        </Flex>

        <input ref={inputFile => this.inputFile = inputFile} accept="jpg,jpeg,JPG,JPEG" id="file" multiple type="file" style={{display: 'none'}} />
        <Menu
          anchorEl={this.state.anchorEl}
          open={this.state.authorMenuOpen}
          onRequestClose={this.handleAuthorMenuClose}
        >
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
          onRequestClose={this.handleMediaMenuClose}
        >
          <MenuItem onClick={() => this.handleMediaSelect('poll')}>Sondage</MenuItem>
          <MenuItem onClick={() => this.handleMediaSelect('gallery')}>Gallerie</MenuItem>
          <MenuItem onClick={() => this.handleMediaSelect('videoEmbed')}>Vid. FB/YT</MenuItem>
          <MenuItem onClick={() => this.handleMediaSelect('file')}>Fichier</MenuItem>
        </Menu>
      </PublishBox>
    );
  }
}

export default PublishBoxView;
