// @flow

import axios from 'axios';
import type { VideoEmbedDTO, VideoDTO } from './type';

export function createVideoEmbed(form: VideoEmbedDTO) {
  return axios.post('/media/videoEmbed', form);
};

export function createVideo(form: VideoDTO) {
  var data = new FormData();
  data.append('video', form.video);
  data.append('name', form.name);
  return axios.post('/media/video', data);
};
