// @flow

import React from 'react';


import { Box, Flex } from 'grid-styled';
import { Link } from 'react-router-dom';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import MoreIcon from 'material-ui-icons/MoreHoriz';

import Time from 'components/Time';
import Author from 'components/Author';
import {
  BgImage,
  Text,
  Title,
  Paper,
} from '../../components/common';

import Auth from '../../components/Auth/AuthComponent';
import { ADMIN, EVENT_MANAGER } from '../../constants';


export default class Event extends React.Component {

  state = {
    anchorEl: null,
    openMenu: false,
  }

  editEvent = () => {
    this.props.onEdit(this.props.event);
    this.setState({ openMenu: false, anchorEl: null });
  }

  deleteEvent = () => {
    this.props.onDelete(this.props.event);
    this.setState({ openMenu: false, anchorEl: null });
  }

  closeMenu = () => {
    this.setState({ openMenu: false, anchorEl: null });
  }

  handleMenu = (e) => {
    this.setState({ openMenu: true, anchorEl: e.currentTarget });
  }

  render() {
    const { event } = this.props;
    return (
      <Paper style={{ marginBottom: 30 }}>
        <Flex wrap>
          <Box w={[1, 1 / 2]}>
            <BgImage src={event.imageUrl} mh="250px" />
          </Box>
          <Box w={[1, 1 / 2]} p="20px">
            <Flex>
              <Link to={`/evenements/${event.id}`}>
                <Box mb={2}>
                  <Title invert fontSize={2} mb="5px">{event.title}</Title>
                  <Text fs="1.1em" mb={.5}>{event.location}</Text>
                  <Title fontSize={1}>Le <Time date={event.date} format="DD/MM/YYYY [à] HH[h]mm" /></Title>
                </Box>
              </Link>
              <Box ml="auto">
                <Author data={event.club} />
              </Box>
            </Flex>
            <Text>{event.description}</Text>
            <Auth roles={[ADMIN, EVENT_MANAGER]}>
              <IconButton color="accent" onClick={this.handleMenu}>
                <MoreIcon />
              </IconButton>
            </Auth>
            <Menu
              anchorEl={this.state.anchorEl}
              open={this.state.openMenu}
              onRequestClose={this.closeMenu}>
              <MenuItem onClick={this.editEvent}>Modifier</MenuItem>
              <MenuItem onClick={this.deleteEvent}>Supprimer</MenuItem>
            </Menu>
          </Box>
        </Flex>
      </Paper>
    );
  }
};