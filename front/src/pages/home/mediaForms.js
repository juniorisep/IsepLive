import React, {Component} from 'react';

import {Box, Flex} from 'grid-styled';

import {Title} from 'components/common';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

import styled from 'styled-components';

const AddButton = styled(Button)`
  margin-top: 10px;
`;

const FormWrapper = styled.div`
  width: 100%;
`;

const MediaCreatorWrap = styled.div`
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  margin-top: 10px;
  border-radius: 5px;
`;

export function MediaCreator(props) {
  if (props.show) {
    return (
      <MediaCreatorWrap>
        <Flex align="center">
          <Title invert fontSize={1.7}>{props.title}</Title>
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
        <AddButton color="accent" onClick={this.addAnswer}>Ajouter une réponse</AddButton>
      </FormWrapper>
    );
  };
};

const PreviewImage = styled.img`
  max-width: 100%;
`;

export class ImageForm extends Component {
  state = {
    imagePreview: null
  }

  handleImageSelect = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreview: reader.result
      });
    }

    this.props.update({ file });
    reader.readAsDataURL(file)
  }

  render() {
    return (
      <div>
        {this.state.imagePreview && <PreviewImage src={this.state.imagePreview} alt="" /> }
        <input
          accept="jpg,jpeg,JPG,JPEG"
          id="file"
          type="file"
          style={{ display: 'none' }}
          onChange={this.handleImageSelect}/>
        <label htmlFor="file">
          <AddButton component="span" color="accent" onClick={this.addAnswer}>Choisir une image</AddButton>
        </label>
      </div>
    );
  }
}
