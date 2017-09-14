import axios from 'axios';

import { Media } from './type';

export function getAllMedia() {
  return axios.get('/media');
}

export function getAllGroupedMedia(): [{ date: Date, medias: Media[] }] {
  return axios.get('/media')
  .then(res => res.data)
  .then((list: Media[]) => {
    const monthlyGrouped = {};
    list.map((media: Media) => {
      const date = new Date(media.creation);
      const formedDate = date.getMonth() + '-' + date.getFullYear();
      if (!monthlyGrouped[formedDate]) {
        monthlyGrouped[formedDate] = {
          date, medias: []
        }
      }
      monthlyGrouped[formedDate].medias.push(media);
    })
    return Object.keys(monthlyGrouped)
      .map(k => monthlyGrouped[k])
      .sort((a, b) => a.date > b.date);
  });
}
