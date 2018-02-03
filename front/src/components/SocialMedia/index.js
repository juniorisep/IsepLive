// @flow

import React from 'react';

import IconButton from 'material-ui/IconButton';

const iconStyle = {
  width: 40,
};

const MediaIcon = props => (
  <IconButton>
    <a href={props.url} target="_blank">
      <img style={iconStyle} src={`/img/svg/social-media/${props.icon}`} alt={props.iconAlt} />
    </a>
  </IconButton>
);

export default class SocialMedia extends React.Component {
  render() {
    const { facebook, twitter, snapchat, instagram } = this.props.socials;
    return (
      <div style={{ marginTop: 10 }}>
        {facebook && <MediaIcon url={facebook} icon="Facebook.svg" iconAlt="fb" />}
        {twitter && <MediaIcon url={twitter} icon="Twitter.svg" iconAlt="twitter" />}
        {snapchat && <MediaIcon url={snapchat} icon="Snapchat.svg" iconAlt="snapchat" />}
        {instagram && <MediaIcon url={instagram} icon="Instagram.svg" iconAlt="instagram" />}
      </div>
    );
  }
}
