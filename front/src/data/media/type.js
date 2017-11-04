// @flow

export type PollDTO = {
  title: string,
  answers: Array<string>,
  isMultiAnswers: boolean,
  endDate: Date,
};

type VideoEmbedType = "YOUTUBE" | "FACEBOOK";

export type VideoEmbedDTO = {
  type: VideoEmbedType,
  url: string,
};

export type VideoDTO = {
  name: string,
  video: File,
};

export type Image = {
  thumbUrl: string,
  fullSizeUrl: string,
  creation: Date,
};

export type Gallery = {
  name: string,
  images: Image[],
};

export type Video = {
  url: string,
  name: string,
  views: number,
};

export type Gazette = {
  title: string,
  url: string,
};

export type Media = {
  id: number,
  mediaType: string,
  media: Gallery | Video | Gazette,
  creation: Date,
};
