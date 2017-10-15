// @flow

import React from 'react';

import styled from 'styled-components';

import {Title} from 'components/common';

const Img = styled.img`
  width: 80px;
  height: 80px;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 400px;
`;

const Box = styled.div`
  background: white;
  border-radius: 80px;
  padding: 20px;
  margin-bottom: 20px;
`;

const Loader = (props) => {
  if (props.loading) {
    return (
      <Wrap>
        <Box>
          <Img src="/img/svg/loader/loader.svg" />
        </Box>
        <Title fontSize={1}>Chargement en cours...</Title>
      </Wrap>
    );
  }
  return props.children;
}

export default Loader;
