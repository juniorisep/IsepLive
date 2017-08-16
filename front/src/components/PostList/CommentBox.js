// @flow
import React, { Component } from 'react';

import styled from 'styled-components';

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

class CommentBox extends Component {
  state = {
    message: '',
    shift: false,
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
  }

  render() {
    return (
      <div>
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
