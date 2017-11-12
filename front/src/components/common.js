// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import { backUrl } from '../config';

export const Separator = styled.div`
  width: 100%;
  height: 0;
  border-top: 4px dashed ${props => props.theme.accent};
  margin-bottom: ${props => props.m || '50px'};
`;

export const Filler = styled.div`
  min-height: ${props => props.h}px;
`;

export const FluidContent = styled.div`
  max-width: ${props => props.w || '1100'}px;
  margin: 0 auto;
  padding: ${props => props.p || '50px'};
  position: relative;

  @media (max-width: 40em) {
    padding: 5%;
  }
`;

export const Header = styled.header`
  background: url(${props => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: 20px;
  text-align: center;
`;

export const SearchBar = styled.input`
  width: 100%;
  border: 0;
  outline: none;
  font-size: 20px;
  border-radius: 20px;
  padding: 8px 25px;
  font-family: 'Roboto';
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

export const Banner = styled.div`
  background: rgba(27, 56, 142, 0.7);
  text-align: center;
  padding: 30px;
  margin: 0 -20px;
  margin-bottom: 50px;

  > h1 {
    font-size: 2em;
    font-weight: normal;
    margin: 0;
    margin-bottom: 10px;
    color: white;
  }

  > p {
    color: ${props => props.theme.accent};
    font-size: 1em;
    margin-bottom: 0;
  }
`;

const ImageStyle = styled.img`
  width: ${props => props.w};
  margin-left: ${props => props.ml || 'auto'};
  vertical-align: middle;
`;

type ImageType = {
  src?: string, alt?: string, w?: string | number, ml?: string
};

export const Image = (props: ImageType) => <ImageStyle {...props} src={props.src && backUrl + props.src} />;

export const BgImageProfileStyle = props => (
  <div style={{
    backgroundImage: `url(${props.src})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: props.sz,
    height: props.h || props.sz,
    marginLeft: props.ml || 'auto',
    minHeight: props.mh || '100%',
  }}></div>
);

export const ProfileImage = (props: ImageType) => {
  const src = props.src ? backUrl + props.src : '/img/svg/user.svg';
  return <BgImageProfileStyle {...props} src={src} />;
};

const BgImageStyle = styled.div`
  background: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  min-height: ${props => props.mh || '100%'};
`;

export const BgImage = (props) => {
  return <BgImageStyle {...props} src={props.src && backUrl + props.src} />
};

export const ImageLink = (props) => {
  return <a href={backUrl + props.src}>{props.children}</a>;
};

export const Text = styled.p`
  font-size: ${props => props.fs || '1em'};
  line-height: 1.2;
  margin: ${props => props.m || 'auto'};
  margin-bottom: ${props => props.mb || 0}em;
  color: ${props => props.color || '#949494'};
`;

export const Title = styled.h1`
  font-size: ${props => props.fontSize}em;
  font-weight: 500;
  display: inline-block;
  color: ${props => props.invert ? props.theme.main : props.theme.accent};
  ${props => props.framed && `background: ${props.invert ? props.theme.accent : props.theme.main};`}
  margin: 0;
  margin-bottom: .5em;
  padding: ${props => props.framed ? '.3em .4em' : 0};
`;

export const Subtitle = styled.h3`
  color: #9f9f9f;
  font-weight: normal;
  font-size: 15px;
  margin: 0;
`;

export class ScrollToTopOnMount extends Component {
  componentDidMount(prevProps) {
    window.scrollTo(0, 0)
  };

  render() {
    return null
  };
};

const IframeWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-bottom: 56.25%;
  top: 50%;
  margin-top: -28.1%;

  > iframe {
    border: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

export const FacebookVideo = (props) => {
  return (
    <IframeWrap>
      <iframe src={props.url} scrolling="no" allowTransparency allowFullScreen />
    </IframeWrap>
  );
};

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
`;

export const YoutubeVideo = (props) => {
  return <Iframe src={props.url} scrolling="no" allowTransparency allowFullScreen frameBorder="0"></Iframe>;
};

const VideoStyle = styled.video`
  width: 100%;
  vertical-align: middle;
`;

export const Video = props => {
  return (
    <VideoStyle preload='preload' src={backUrl + props.url} type="video/mp4" controls />
  );
};

export const Paper = styled.div`
  box-shadow: 0 0px 15px rgba(0, 0, 0, 0.1);
  background: white;
  padding: ${({ p }) => p || 0};
`;
