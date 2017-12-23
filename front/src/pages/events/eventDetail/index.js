// @flow

import React, { Component } from 'react';

import {
  Filler,
  FluidContent,
  ScrollToTopOnMount,
  BgImage,
  Title,
  Subtitle,
  Text
} from 'components/common';
import Loader from 'components/Loader';
import Time from 'components/Time';
import Author from 'components/Author';

import { Flex, Box } from 'grid-styled';

import * as eventData from 'data/event';

class EventDetail extends Component {
  state = {
    event: null,
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    eventData.getEvent(this.props.match.params.id).then(res => {
      this.setState({ event: res.data, isLoading: false });
    });
  };

  render() {
    const { event } = this.state;
    return (
      <div>
        <ScrollToTopOnMount />
        <Loader loading={this.state.isLoading}>
          {
            event &&
            <div>
              <BgImage src={event.imageUrl} mh="200px" />
              <FluidContent>
                <Flex>
                  <Box mb={2}>
                    <Title invert>{event.title}</Title>
                    <Subtitle><i>{event.location}</i> - <Time date={event.date} format="DD/MM/YYYY HH:mm" /></Subtitle>
                  </Box>
                  <Box ml="auto">
                    <Author data={event.club} />
                  </Box>
                </Flex>
                <Text>
                  {event.description}
                </Text>
                <Filler h={300} />
              </FluidContent>
            </div>
          }
        </Loader>
      </div>
    );
  };
};

export default EventDetail;
