// @flow

import React from 'react';

import styled from 'styled-components';

import { MAIN_COLOR, SECONDARY_COLOR } from '../../colors';

import { Separator } from '../../components/Layout/Common';

const Header = styled.header`
  background: url(${props => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  padding: 20px;
  text-align: center;
`;

const SearchBar = styled.input`
  width: 70%;
  margin-top: ${props => props.margin}px;
  border: 0;
  outline: none;
  font-size: 20px;
  border-radius: 20px;
  padding: 8px 25px;
  font-family: 'Roboto';
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const IconMenu = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 900px;
  margin: 50px auto;
  padding: 0 50px;
`;

const FakeIcon = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  margin-bottom: 10px;
`;

const Background = styled.div`
  background: url(img/background.jpg);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
`;

const Content = styled.div`
  width: 900px;
  margin: 0 auto;
  padding-top: 50px;
  min-height: 900px;
`;

const MessageBox = styled.div`
  background: ${MAIN_COLOR};
  margin-bottom: 20px;
  text-align: center;
  padding: 10px;
  height: 100px;
`;

const PostList = styled.ul`

`;

const About = styled.div`

`;

export default function Home(props) {
  return (
    <div>
      <Header url="img/background.jpg">
        <SearchBar placeholder="Rechercher" margin={200} />
      </Header>
      <IconMenu>
        <div>
          <FakeIcon />
          <span>Videos</span>
        </div>
        <div>
          <FakeIcon />
          <span>Photos</span>
        </div>
        <div>
          <FakeIcon />
          <span>Photos</span>
        </div>
        <div>
          <FakeIcon />
          <span>Photos</span>
        </div>
      </IconMenu>
      <Background>
        <Content>
          <MessageBox>
            <SearchBar placeholder="Tapez votre message" />
          </MessageBox>
          <Separator />
          <PostList>

          </PostList>
          <About>

          </About>

        </Content>
      </Background>
    </div>
  );
}
