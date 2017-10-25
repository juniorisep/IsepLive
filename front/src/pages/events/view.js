// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import { Box, Flex } from 'grid-styled';

import { Banner, Filler, FluidContent, Header, SearchBar, BgImage } from 'components/common';
import Time from 'components/Time';
import Author from 'components/Author';

import Button from 'material-ui/Button';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import AddIcon from 'material-ui-icons/Add';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';

import { Link, NavLink } from 'react-router-dom';

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
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
        </Box>
      </Flex>
    </EventStyle>
  );
};

export default class Events extends Component {
  state = {
    alpha: 'futur',
    open: false,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleRequestClose = () => {
    this.setState({ open: false });
  };
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
          <Button fab color="primary" aria-label="add" style={{ float: 'right', zIndex: 2 }} onClick={() => this.setState({ open: true })}>
            <AddIcon />
          </Button>
          <AddEventForm
            open={this.state.open}
            handleRequestClose={this.handleRequestClose}
            onChange={this.handleAddEventForm}
          />
          <Flex align="center">
            <Box flex="0 0 auto" ml="auto">
              <FormControl>
                <InputLabel htmlFor="alpha-simple">Nom</InputLabel>
                <Select
                  value={this.state.alpha}
                  onChange={this.handleChange('alpha')}
                  input={<Input id="alpha-simple" />}
                >
                  <MenuItem value='futur'>Evenements à venir</MenuItem>
                  <MenuItem value='past'>Evenements passés</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Button color="primary" component={NavLink} to="/evenements/calendrier">Calendrier</Button>
            </Box>
          </Flex>
          <EventsList>
            {
              this.props.events.map(e => {
                return (
                  <div key={e.id}>
                    <Event event={e} />
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

function AddEventForm(props) {
  return (
    <Dialog open={props.open} transition={Slide} onRequestClose={props.handleRequestClose}>
      <DialogTitle>Ajouter un évènement</DialogTitle>
      <DialogContent>
        <TextField type="text" label="Nom" fullWidth />
        <TextField type="text" label="Date de l'évènement" fullWidth />
        <TextField type="text" label="Lieu de l'évènement" fullWidth />
        <TextField type="text" label="Description" fullWidth />
        <input accept="jpg,jpeg,JPG,JPEG" id="file" multiple type="file" style={{ display: 'none' }} />
        <label htmlFor="file">
          <Button raised component="span">
            Ajouter l'affiche
          </Button>
        </label>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleRequestClose} color="primary">
          Annuler
        </Button>
        <Button color="accent">
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
};
