import React, {Component} from 'react';

import {Box, Flex} from 'grid-styled';

import {Title} from 'components/common';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

import styled from 'styled-components';

const FormWrapper = styled.div`
  width: 100%;
`;

const MediaCreatorWrap = styled.div`
  background: white;
  padding: 20px;
  margin-bottom: 20px;
`;

export const MediaDialog = (props) => (
  <Dialog
    open={props.open}
    transition={Slide}
    onRequestClose={props.handleRequestClose}
  >
    <DialogTitle>{props.title}</DialogTitle>
    <DialogContent>
      {props.children}
    </DialogContent>
    <DialogActions>
      <Button onClick={props.handleRequestClose} color="primary">
        Annuler
      </Button>
      <Button onClick={props.onCreate} color="accent">
        Créer
      </Button>
    </DialogActions>
  </Dialog>
);

export function MediaCreator(props) {
  if (props.show) {
    return (
      <MediaCreatorWrap>
        <Flex align="center">
          <Box>
            <Title invert fontSize={1.5}>{props.title}</Title>
          </Box>
          <Box ml="auto">
            <IconButton onClick={props.onDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Flex>
        {props.children}
      </MediaCreatorWrap>
    );
  };
  return null;
};

export class PollForm extends Component {
  state = {
    title: '',
    answers: [],
  };

  addAnswer = () => {
    const {answers} = this.state;
    this.setState({answers: [...answers, '']});
  };

  deleteAnswer = (index) => {
    const {answers} = this.state;
    answers.splice(index, 1);
    this.setState({answers});
    this.props.update(this.state);
  };

  changeAnswer = (event, index) => {
    const {answers} = this.state;
    answers[index] = event.target.value;
    this.setState({answers});
    this.props.update(this.state);
  };

  changeQues = (event) => {
    this.setState({title: event.target.value});
    this.props.update(this.state);
  };

  render() {
    const {answers} = this.state;
    return (
      <FormWrapper>
        <TextField fullWidth label="Question" onChange={this.changeQues} />
        {
          answers.map((a, index) => {
            return <Flex align="center" key={index} mt={2}>
              <Box flex="1 1 auto">
                <TextField
                  fullWidth
                  label={`Réponse ${index + 1}`}
                  onChange={(e) => this.changeAnswer(e, index)}
                />
              </Box>
              <Box mb="-15px">
                <IconButton onClick={() => this.deleteAnswer(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Flex>
          })
        }
        <Button color="accent" onClick={this.addAnswer}>Ajouter une réponse</Button>
      </FormWrapper>
    );
  };
};
