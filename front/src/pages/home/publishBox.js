import React, {Component} from 'react';

import styled from 'styled-components';
import {Flex, Box} from 'grid-styled';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Menu, {MenuItem} from 'material-ui/Menu';
import AddCircleIcon from 'material-ui-icons/AddCircle';

import * as postData from '../../data/post';
import {PostDTO} from '../../data/post/type';

const PublishBox = styled.div `
  background: ${props => props.theme.main};
  margin-bottom: 20px;
  padding: 20px;
`;

const MessageBox = styled.textarea `
  font-family: 'Roboto';
  font-size: 1.3em;
  padding: .4em;
  border: 5px solid transparent;
  outline: 0;
  border-radius: 5px;
  width: 100%;
  resize: vertical;
`;

class PublishBoxView extends Component {

  state = {
    message: '',
    selectedIndex: -1,
    mediaMenuOpen: false
  }

  onMessageChange = (event) => {
    this.setState({message: event.target.value});
  }

  onPublish = () => {
    const dto : PostDTO = {
      authorId: 1,
      content: this.state.message,
      title: null
    }
    postData.createPost(dto).then(res => res.data.id).then(postData.publishPost).then(res => {
      this.setState({message: ''});
    }).then(this.props.refreshPosts);
  }

  handleMediaSelect = (item) => {
    switch (item) {
      case 'poll':
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

  render() {
    return (
      <PublishBox>
        <MessageBox placeholder="Tapez votre message" onChange={this.onMessageChange} value={this.state.message}/>
        <Flex align="center">
          <Box>
            <IconButton color="contrast" onClick={this.openMediaMenu}>
              <AddCircleIcon/>
            </IconButton>
          </Box>
          <Box ml="auto">
            <Button raised color="accent" style={{
              float: "right"
            }} onClick={this.onPublish} disabled={this.state.message === ''}>Publier</Button>
          </Box>
        </Flex>
        <input ref={inputFile => this.inputFile = inputFile} accept="jpg,jpeg,JPG,JPEG" id="file" multiple type="file" style={{
          display: 'none'
        }}/>
        <Menu anchorEl={this.state.anchorEl} open={this.state.mediaMenuOpen} onRequestClose={this.handleMediaMenuClose}>
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
