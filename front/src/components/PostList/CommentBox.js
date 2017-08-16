// @flow
import React, { Component } from 'react';

import styled from 'styled-components';

import { EditorState } from 'draft-js';

import Button from 'material-ui/Button';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './editor.css';

const Input = styled.textarea`
  border: 2px solid #999999;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.2em;
  outline: none;
  color: #909090;
  font-family: 'Roboto';
  width: 100%;

  &:focus {
    border-color: ${props => props.theme.main};
  }
`;

const STYLE_BUTTON = {
  maxWidth: 300,
  margin: '10px auto',
  backgroundColor: '#ffc000',
  color: '#e6e6e6',
};

class CommentBox extends Component {
  state = {
    message: '',
    shift: false,
    editorState: EditorState.createEmpty(),
  }

  keyDown = (event) => {
    if (event.key === 'Enter' && !this.state.shift) {
      event.preventDefault();
    }
    if (event.key === 'Shift') {
      this.setState({ shift: true });
    }
  }

  keyUp = (event) => {
    if (event.key === 'Shift') {
      this.setState({ shift: false });
    }

    if (event.key === 'Enter') {
      if (!this.state.shift && this.state.message !== '') {
        this.props.onComment(this.state.message);
        this.setState({ message: '' });
      }
    }
  }

  change = (event) => {
    this.setState({ message: event.target.value });
  };

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <div style={{margin: 20, border: '1px solid black'}}>
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
          />
        </div>
        <div style={{textAlign: 'center'}}>
          <Button style={STYLE_BUTTON} onClick={this.onConfirm}>Ajouter</Button>
        </div>
        <Input
          type="text"
          placeholder="Appuyez sur Entré pour envoyer..."
          value={this.state.message}
          onKeyUp={this.keyUp}
          onKeyDown={this.keyDown}
          onChange={this.change}/>
      </div>
    );
  }
}

export default CommentBox;
