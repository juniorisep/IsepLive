// @flow

import React from 'react';
import styled from 'styled-components';

import Time from 'components/Time';
import { Link } from 'react-router-dom';
import {
  Title, Text, BgImage,
} from 'components/common';

const Cell = styled.div`
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

export const Album = (props) => {
  const AlbumStyle = Cell.extend`
    .caption {
      padding: 10px;
      color: ${props => props.theme.main};
    }
  `;
  return (
    <AlbumStyle onClick={props.onClick}>
      <Link to={`/gallery/${props.id}`}>
        <BgImage src={props.url} mh="200px" />
      </Link>
      <div className="caption">
        <Title invert fontSize={1.3} >{props.name}</Title>
        <Text fs=".8em"><Time date={props.creation} format="Do MMMM YYYY" /></Text>
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
  `;
  return (
    <VideoStyle>
      <div className="image">
        <img src="/img/svg/play.svg" alt="play" />
      </div>
      <div className="caption">
        <Title invert fontSize={1.3} >{props.name}</Title>
        <Text fs=".8em"><Time date={props.creation} format="Do MMMM YYYY" /></Text>
      </div>
    </VideoStyle>
  );
};

export const Gazette = (props) => {
  const GazetteStyle = Cell.extend`
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
  `;
  return (
    <GazetteStyle>
      <div className="image">
        <img src="/img/svg/gazette-icon.svg" alt="file" />
      </div>
      <div className="caption">
        <Title invert fontSize={1.3} >{props.title}</Title>
        <Text fs=".8em"><Time date={props.creation} format="Do MMMM YYYY" /></Text>
      </div>
    </GazetteStyle>
  );
};
