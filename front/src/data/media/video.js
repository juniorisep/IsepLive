// @flow
import axios from 'axios';
import type { VideoEmbedDTO } from './type';

export function createVideoEmbed(form: VideoEmbedDTO) {
  return axios.post('/media/videoEmbed', form);
}
