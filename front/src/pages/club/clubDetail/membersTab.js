// @flow

import React from 'react';

import styled from 'styled-components';
import {Box, Flex} from 'grid-styled';

import {ProfileImage, Text,} from '../../../components/common';

const Member = (props) => {
  const MemberStyle = styled.div`
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    > div {
      padding: 10px;
      color: ${props => props.theme.main};
    }
    > div p {
      margin: 0;
    }
    > div p.name {
      font-weight: bold;
      margin-bottom: 5px;
    }

    .role {
      margin-top: 5px;
      font-weight: bold;
      color: ${props => props.theme.accent}
    }
  `;
  return (
    <MemberStyle>
      <ProfileImage src={props.url} w="100%" />
      <div>
        <p className="name">{props.name}</p>
        <p>Promo {props.promotion}</p>
        <p className="role">{props.role}</p>
      </div>
    </MemberStyle>
  );
};

export default function MembersTab(props) {
  return (
    <div>
      <Flex wrap>
        {props.members.length === 0 && <Text>Aucun membres</Text>}
        {
          props.members.map(m => {
            return (
              <Box key={m.id} w={[1, 1 / 3, 1 / 5]} p={2}>
                <Member
                  url={m.member.photoUrl}
                  name={m.member.firstname + ' ' + m.member.lastname}
                  role={m.role.name}
                  promotion={m.member.promo}
                />
              </Box>
            )
          })
        }
      </Flex>
    </div>
  );
};
