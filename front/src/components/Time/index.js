// @flow

import React from 'react';

import moment from 'moment';

export default function Time(props: { date: number, format: string }) {
  moment.locale('fr');

  const formatDate = () => {
    const { date, format } = props;
    let datetime = moment(date);
    return datetime.format(format);
  }
  const datetime = formatDate();

  return <time dateTime={datetime}>{datetime}</time>
}
