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
import { SECONDARY_COLOR } from '../../../colors';
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

  /**
   * Parse the text to find items like links
   * and transform them into components
   */
  parseText(text: string) {
    const words = text.split(' ');
    const linkStyle = {
      color: SECONDARY_COLOR,
      textDecoration: 'underline',
    }
    return words.map((word, i) => {
      const sep = i < words.length - 1 ? ' ' : '';
      if (word.match(/^https?\:\//)) {
        return <a key={i} href={word} target="_blank" style={linkStyle}>{word}{sep}</a>;
      } else {
        return word + sep;
      }
    })
  }

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
                    <div>
                      <Title fontSize={1}>Le <Time date={event.date} format="DD/MM/YYYY [à] HH[h]mm" /></Title>
                      <Text fs="1.1em" mb={.5}>{event.location}</Text>
                    </div>
                  </Box>
                  <Box ml="auto">
                    <Author data={event.club} />
                  </Box>
                </Flex>
                <Box mt="10px">
                  {
                    event.description
                      .split('\n')
                      .map((par, i) => <Text 
                          key={i} 
                          color="#555" 
                          mb={1}>{this.parseText(par)}</Text>)
                  }
                </Box>
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
