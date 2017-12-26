// @flow

import React, { Component } from 'react';
import styled from 'styled-components';

import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';


import {
  BgImage,
} from '../common';

import { backUrl } from 'config';

import PeopleMatcher from './PeopleMatcher';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.95);
  top: 0;
  left: 0;
  z-index: 1100;
  overflow: auto;
`;

const ViewStyle = styled.div`
  position: relative;
  margin: 5vh;
`;


class View extends Component {

  state = {
    matcherOpen: false,
  }

  componentWillUnmount() {
    this.removeEscListener();
  };

  removeEscListener() {
    document.removeEventListener('keydown', this.keyHandler);
  }

  openMatcher = (open) => {
    this.setState({ matcherOpen: open })
  }

  componentWillReceiveProps(props) {
    if (!props.visible) {
      this.removeEscListener();
    } else {
      document.addEventListener('keydown', this.keyHandler);
    }

    document.body.style.overflow = props.visible ? 'hidden' : 'auto';

  }

  keyHandler = ({ key }) => {
    if (key === 'Escape' && !this.state.matcherOpen) {
      this.props.onEscKey();
    };
  };

  render() {
    const { visible, data, image, index, internalRefresh } = this.props;
    if (!visible) return null;
    return (
      <Wrapper visible={visible}>
        <IconButton
          style={{ float: 'right' }}
          color="contrast"
          onClick={() => this.props.onEscKey()}>
          <CloseIcon />
        </IconButton>
        <ViewStyle>
          <BgImage src={image} size="contain" mh="80vh" />
        </ViewStyle>
        {
          this.props.matcher &&
          <PeopleMatcher
            internalRefresh={internalRefresh}
            onOpenMatcher={this.openMatcher}
            image={this.props.data} />
        }
      </Wrapper>
    );
  };
};

export default View;
