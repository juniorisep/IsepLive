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
}
