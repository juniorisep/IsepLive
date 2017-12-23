// @flow

import React from 'react';

import styled from 'styled-components';


const Img = styled.img`
  width: 40px;
  height: 40px;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: ${props => props.mh};
`;

const Box = styled.div`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: white;
  border-radius: 80px;
  padding: 20px;
  margin-bottom: 20px;
`;

const Loader = (props) => {
  if (props.loading) {
    return (
      <Wrap mh={props.mh || '400px'}>
        <Box>
          <Img src="/img/svg/loader/tail-spin.svg" />
        </Box>
      </Wrap>
    );
  };
  return props.children;
};

export default Loader;
