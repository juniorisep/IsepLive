// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import { backUrl } from 'config';

const STYLE = {
  margin: 40,
  display: 'flex',
}

const InputButton = styled.button`
  outline: none;
  background: rgba(255,255,255,0.1);
  color: white;
  border-radius: 30px;
  padding: 7px 12px;
  border: 0;
  font-family: inherit;
  transition: background .3s ease;
  cursor: pointer; 

  &:hover {
    background: rgba(255,255,255,0.2);
  }
  &:active {
    background: rgba(255,255,255,0.3);
  }
`;

export default class PeopleMatcher extends Component {
  render() {
    if (!this.props.image) return null;
    return (
      <div style={STYLE}>
        {
          this.props.image.matched.map(e => {
            return <Chip
              key={e.id}
              style={{ marginRight: 10 }}
              avatar={<Avatar src={backUrl + e.match.photoUrlThumb} />}
              label={`${e.match.firstname} ${e.match.lastname}`} />;
          })
        }
        <InputButton>Ajouter un ami</InputButton>
      </div>
    )
  }
}