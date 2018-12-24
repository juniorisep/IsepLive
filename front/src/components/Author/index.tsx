import { Flex } from '@rebass/grid';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Image, ProfileImage } from '../common';
import { Author } from '../../data/users/type';

const Sub = styled.div`
  font-size: 15px;
  color: ${props => props.theme.main};
  text-align: right;
  margin-top: 10px;
`;

interface AuthorProps {
  data: Author;
}

const Author: React.SFC<AuthorProps> = props => {
  const user = props.data;
  switch (user.authorType) {
    case 'club':
      return (
        <Link to={`/associations/${user.id}`}>
          <Flex flexDirection="column">
            <Image src={user.logoUrl} alt="Club logo" w={60} h={60} ml="auto" />
            <Sub>{user.name}</Sub>
          </Flex>
        </Link>
      );
    case 'student':
      return (
        <Flex flexDirection="column">
          <ProfileImage
            src={user.photoUrlThumb}
            alt="Student profile image"
            w="40px"
            ml="auto"
          />
          <Sub>
            {user.firstname}
            <br />
            {user.lastname}
          </Sub>
        </Flex>
      );
    default:
      break;
  }
  return null;
};

export default Author;
