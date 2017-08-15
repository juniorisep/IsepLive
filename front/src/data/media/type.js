// @flow

export type PollDTO = {
  title: string,
  answers: Array<string>
};

type VideoEmbedType = "YOUTUBE" | "FACEBOOK";

export type VideoEmbedDTO = {
  type: VideoEmbedType,
  url: string
}
