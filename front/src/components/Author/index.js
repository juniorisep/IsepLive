// @flow

import React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

import { Link } from 'react-router-dom';

import { Image, ProfileImage } from '../common';

const Sub = styled.div`
  font-size: 15px;
  color: ${props => props.theme.main};
  text-align: right;
  margin-top: 10px;
`;


export default function Author(props) {
  const a = props.data;
  switch (a.authorType) {
    case 'club':
      return (
        <Link to={`/associations/${a.id}`}>
          <Flex direction="column">
            <Image src={a.logoUrl} alt="logo-club" w="60px" h="60px" ml="auto" />
            <Sub>{a.name}</Sub>
          </Flex>
        </Link>
      );
    case 'student':
      return (
        <Flex direction="column">
          <ProfileImage src={a.photoUrlThumb} sz="40px" ml="auto" />
          <Sub>{a.firstname}<br />{a.lastname}</Sub>
        </Flex>
      );
    default:
      break;
  }
  return null;
}
