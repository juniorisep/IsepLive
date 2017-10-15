// @flow

import React from 'react';
import styled from 'styled-components';

import Time from 'components/Time';

import {
  Title, Text
} from 'components/common';

const Cell = styled.div`
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`

export const Album = (props) => {
  const AlbumStyle = Cell.extend`
    .image {
      width: 100%;
      height: 200px;
      background: url(${props => props.url});
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }

    .caption {
      padding: 10px;
      color: ${props => props.theme.main};
    }
  `;
  return (
    <AlbumStyle url={props.url} onClick={props.onClick}>
      <div className="image"></div>
      <div className="caption">
        <Title invert fontSize={1.3} >{props.name}</Title>
        <Text fs=".8em"><Time date={props.creation} format="DD/MM/YYYY" /></Text>
      </div>
    </AlbumStyle>
  );
};

export const Video = (props) => {
  const VideoStyle = Cell.extend`
    .image {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 200px;
      background: linear-gradient(to bottom right, ${props => props.theme.main}, ${props => props.theme.accent});
      color: white;
      font-size: 2em;
    }
    .image img {
      width: 80px;
    }
    .caption {
      padding: 10px;
      color: ${props => props.theme.main};
    }
  `
  return (
    <VideoStyle>
      <div className="image">
        <img src="/img/svg/play.svg"/>
      </div>
      <div className="caption">
        <Title invert fontSize={1.3} >{props.name}</Title>
        <Text fs=".8em"><Time date={props.creation} format="DD/MM/YYYY" /></Text>
      </div>
    </VideoStyle>
  )
}
