// @flow

import React, {Component} from 'react';
import styled from 'styled-components';
import {Box, Flex} from 'grid-styled';
import {Banner, Filler, FluidContent, Header, SearchBar} from 'components/common';
import Button from 'material-ui/Button';

import {Link} from 'react-router-dom';

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

    .image {
      width: 100%;
      height: 100%;
      background: url(${props.coverUrl});
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
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

  return (
    <EventStyle coverUrl={props.coverUrl}>
      <Flex wrap>
        <Box w={[
          1, 1 / 2
        ]}>
          <div className="image"></div>
        </Box>
        <Box w={[
          1, 1 / 2
        ]} p="20px">
          <Flex>
            <Box>
              <h2>Nom de l'event</h2>
              <h3 className="lieu">Lieu de l'event</h3>
              <h3>Date de l'event</h3>
            </Box>
            <Box ml="auto">
              <img src="/img/iseplive.jpg" alt="" width="40px" />
            </Box>
          </Flex>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
        </Box>
      </Flex>
    </EventStyle>
  );
};

class Events extends Component {
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
          <Flex>
            <Box mr="10px">
              <Button color="primary">Evenements à venir</Button>
            </Box>
            <Box>
              <Button color="accent">Evenements passés</Button>
            </Box>
          </Flex>
          <EventsList>
            {
              this.props.events.map(e => {
                return (
                  <div key={e.id}>
                    <Link to={`/evenements/${e.id}`}>
                      <Event coverUrl={e.thumbUrl} />
                    </Link>
                  </div>
                )
              })
            }
          </EventsList>
        </FluidContent>
      </div>
    );
  };
};

export default Events;
