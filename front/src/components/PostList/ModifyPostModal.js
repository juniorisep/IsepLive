// @flow

import React from 'react';

import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import { EventForm } from './MediaForms';
import { Title } from 'components/common';

import * as postData from 'data/post';
import * as eventData from 'data/event';


export default class ModifyPostModal extends React.Component {

  requestSave = async () => {
    const { title, content } = this.props.post;
    await postData.updatePost(this.props.post.id, {
      title,
      content,
    });
    if (this.props.post.media) {
      const media = this.props.post.media;
      if (media.mediaType === 'event') {
        await eventData.updateEvent(media.id, media);
      };
    };
    this.props.refresh();
    this.props.requestClose();
  };

  change = name => event => {
    this.props.modifyPost({
      ...this.props.post,
      [name]: event.target.value,
    });
  };

  changeMedia = data => {
    const {
      title,
      location,
      date,
      description,
      image,
    } = data;

    this.props.modifyPost({
      ...this.props.post,
      media: {
        ...this.props.post.media,
        title,
        date,
        location,
        description,
        image,
      },
    });
  };

  render() {
    const props = this.props;
    return (
      <Dialog fullWidth open={this.props.open} onRequestClose={this.props.requestClose}>
        <DialogTitle>Modifier un post</DialogTitle>
        {
          props.post &&
          <DialogContent>
            {
              props.post.author.authorType === 'club' &&
              <TextField margin="dense" label="Titre" value={this.props.post.title} onChange={this.change('title')} fullWidth />
            }
            <TextField
              multiline
              fullWidth
              rows="6"
              margin="normal"
              label="Message"
              value={this.props.post.content}
              onChange={this.change('content')} />
            {
              props.post.media && props.post.media.mediaType === 'event' &&
              <div>
                <Title fontSize={1.4} invert>Evenement</Title>
                <EventForm fullw post={this.props.post} update={this.changeMedia} />
              </div>
            }
          </DialogContent>
        }
        <DialogActions>
          <Button onClick={this.props.requestClose} color="default" autoFocus >
            Annuler
          </Button>
          <Button onClick={this.requestSave} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
};
