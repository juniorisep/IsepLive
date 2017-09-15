// @flow

import React, {Component} from 'react';
import styled from 'styled-components';
import {Box, Flex} from 'grid-styled';
import {Link} from 'react-router-dom';
import {FluidContent, Image} from 'components/common';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';


const ClubTile = (props) => {
  const ClubStyle = styled.div`
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

    > img {
      width: 100%;
    }

    > p {
      padding: 10px;
      margin: 0;
      text-align: center;
      font-size: 1.2em;
      font-weight: bold;
      color: ${props => props.theme.main};
    }
  `;
  return (
    <ClubStyle>
      <Image src={props.url} mb="5px" />
      <p>{props.name}</p>
    </ClubStyle>
  );
};

export default class Club extends Component {
  state = {
    open: false,
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button fab color="primary" aria-label="add" style={{float: 'right'}} onClick={() => this.setState({ open: true })}>
          <AddIcon />
        </Button>
        <AddClubForm
          open={this.state.open}
          handleRequestClose={this.handleRequestClose}
          onChange={this.handleAddClubForm}
        />
        <FluidContent>
          <Flex wrap>
            {
              this.props.clubs.map(e => {
                return (
                  <Box key={e.id} w={[1, 1 / 3, 1 / 4]} p={2}>
                    <Link to={`/administration/associations/${e.id}`}>
                      <ClubTile url={e.logoUrl} name={e.name} />
                    </Link>
                  </Box>
                )
              })
            }
          </Flex>
        </FluidContent>
      </div>
    );
  };
};

function AddClubForm(props) {
  return (
    <Dialog open={props.open} transition={Slide} onRequestClose={props.handleRequestClose}>
      <DialogTitle>Ajouter une association</DialogTitle>
      <DialogContent>
        <TextField type="text" label="Nom" fullWidth />
        <TextField type="text" label="Date de création" fullWidth />
        <TextField type="text" label="Président" fullWidth />
        <TextField type="text" label="Description" fullWidth />
        <TextField type="text" label="Site Internet" fullWidth />
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
