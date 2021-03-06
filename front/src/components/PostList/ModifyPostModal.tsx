import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { Title } from '../../components/common';
import * as eventData from '../../data/event';
import { Event } from '../../data/media/type';
import * as postData from '../../data/post';
import { Post } from '../../data/post/type';
import { EventForm } from './MediaForms';

interface ModifyPostModalProps {
  open: boolean;
  post: Post | null;
  refresh: () => void;
  requestClose: () => void;
  modifyPost: (postModified: Post) => void;
}

interface ModifyPostModalState {
  post: Post | null;
}

export default class ModifyPostModal extends React.Component<
  ModifyPostModalProps,
  ModifyPostModalState
> {
  state: ModifyPostModalState = {
    post: null,
  };

  componentDidUpdate(prevProps: ModifyPostModalProps) {
    if (prevProps.post !== this.state.post) {
      this.setState({ post: prevProps.post });
    }
  }

  requestSave = async () => {
    const { post } = this.state;
    if (post) {
      await postData.updatePost(post.id, {
        title: post.title,
        content: post.content,
        private: post.private,
      });

      if (post.media) {
        if (post.media.mediaType === 'event') {
          await eventData.updateEvent(
            post.media.id,
            post.media as Event,
            post.author.id,
          );
        }
      }
      this.props.refresh();
      this.props.requestClose();
    }
  };

  change = (name: keyof Post) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const post = this.state.post;
    if (post) {
      if (name === 'private') {
        post.private = event.target.checked;
      } else {
        (post[name] as any) = event.target.value;
      }

      this.setState({ post });
    }
  };

  changeMedia = ({ title, location, date, description, image }: any) => {
    this.setState(
      state =>
        state.post &&
        ({
          post: {
            ...state.post,
            media: {
              ...state.post.media,
              title,
              location,
              date,
              description,
              image,
            },
          },
        } as any),
    );
  };

  render() {
    const { post } = this.state;
    return (
      <Dialog
        fullWidth
        open={this.props.open}
        onClose={this.props.requestClose}
      >
        <DialogTitle>Modifier un post</DialogTitle>
        {post && (
          <DialogContent>
            {post.author.authorType === 'club' && (
              <TextField
                margin="dense"
                label="Titre"
                value={post.title}
                onChange={this.change('title')}
                fullWidth
              />
            )}
            <TextField
              multiline
              fullWidth
              rows="6"
              margin="normal"
              label="Message"
              value={post.content}
              onChange={this.change('content')}
            />
            {post.media && post.media.mediaType === 'event' && (
              <div style={{ marginTop: 20 }}>
                <Title fontSize={1.4} invert>
                  Evenement
                </Title>
                <EventForm fullw post={post} update={this.changeMedia} />
              </div>
            )}
            <FormControlLabel
              color="primary"
              control={
                <Checkbox
                  checked={post.private}
                  color="primary"
                  onChange={this.change('private')}
                />
              }
              label={<span style={{ fontWeight: 500 }}>PRIVÉ</span>}
            />
          </DialogContent>
        )}
        <DialogActions>
          <Button
            onClick={this.props.requestClose}
            variant="contained"
            color="primary"
            autoFocus
          >
            Annuler
          </Button>
          <Button
            onClick={this.requestSave}
            variant="contained"
            color="secondary"
          >
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  static defaultProps: ModifyPostModalProps = {
    open: false,
    post: null,
    refresh: () => {},
    requestClose: () => {},
    modifyPost: () => {},
  };
}
