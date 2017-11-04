// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import { Box, Flex } from 'grid-styled';

import { Banner, Filler, FluidContent, Header, SearchBar, BgImage, Text } from 'components/common';

import Time from 'components/Time';
import Author from 'components/Author';

import Button from 'material-ui/Button';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';

import { Link, NavLink } from 'react-router-dom';

import Loader from 'components/Loader';

const EventsList = styled.ul`
  padding: 0;
  margin: 20px 0;
`;

const Event = (props) => {
  const EventStyle = styled.li`
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;

    > ${Flex} > ${Box} {
      min-height: 250px;
    }

    h2,
    h3 {
      margin: 0;
      margin-bottom: 10px;
      font-weight: normal;
    }

    p,
    h3 { color: #7a7a7a; }
    h3.lieu { color: ${props => props.theme.main}; }
  `;
  const { event } = props;
  return (
    <EventStyle>
      <Flex wrap>
        <Box w={[1, 1 / 2]}>
          <BgImage src={event.imageUrl} />
        </Box>
        <Box w={[1, 1 / 2]} p="20px">
          <Flex>
            <Box>
              <Link to={`/evenements/${event.id}`}>
                <h2>{event.title}</h2>
                <h3 className="lieu">{event.location}</h3>
                <h3>Le <Time date={event.date} format="DD/MM/YYYY [à] HH[h]mm" /></h3>
              </Link>
            </Box>
            <Box ml="auto">
              <Author data={event.club} />
            </Box>
          </Flex>
          <p>{event.description}</p>
        </Box>
      </Flex>
    </EventStyle>
  );
};

export default class Events extends Component {
  render() {
    return (
      <div>
        <Header url="/img/background.jpg">
          <Filler h={50} />
          <Banner>
            <h1>Evenements</h1>
            <p>Il faut parfois prendre une pause dans ses études...</p>
          </Banner>
          <FluidContent p="0">
            <SearchBar placeholder="Rechercher des évenements" />
          </FluidContent>
        </Header>
        <FluidContent>
          <Flex align="center">
            <Box flex="0 0 auto" ml="auto">
              <FormControl>
                <InputLabel htmlFor="alpha-simple">Evenements</InputLabel>
                <Select
                  value={this.props.eventsFilter}
                  onChange={(e) => this.props.onModifyFilter(e.target.value)}
                  input={<Input id="alpha-simple" />}
                >
                  <MenuItem value='next'>à venir</MenuItem>
                  <MenuItem value='past'>passés</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box flex="0 0 auto" ml="10px">
              <Button color="primary" component={NavLink} to="/evenements/calendrier">Calendrier</Button>
            </Box>
          </Flex>
          <EventsList>
            <Loader loading={this.props.isLoading}>
              {this.props.events.length === 0 && <Text>Aucun évenement</Text>}
              {
                this.props.events.map(e => {
                  return (
                    <div key={e.id}>
                      <Event event={e} />
                    </div>
                  )
                })
              }
            </Loader>
          </EventsList>
        </FluidContent>
      </div>
    );
  };
};
