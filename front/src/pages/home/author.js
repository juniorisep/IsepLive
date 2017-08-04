import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';

import {
  Image,
} from '../../components/common';

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
        <Flex direction="column">
          <Image src={a.logoUrl} alt="logo-club" w="40px" ml="auto" />
          <Sub>{a.name}</Sub>
        </Flex>
      )
    case 'student':
      return (
        <Flex direction="column">
          <Image src={a.photoUrl} alt="logo-profile" w="40px" ml="auto" />
          <Sub>{a.firstname}<br />{a.lastname}</Sub>
        </Flex>
      )
  }
}
