// @flow

import React, {Component} from 'react';

import styled from 'styled-components';
import {ProfileImage,} from '../common';

import * as userData from 'data/users/student';


const Profile = styled.div`
  display: flex;
  padding: 5px;
  border-radius: 5px;
  margin: 5px 0;
  margin-left: 5px;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }

  > img {
    height: 40px;
    margin-right: 5px;
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  > div > span {
    display: block;
    font-weight: bold;
    padding: 2px;
  }

  @media (max-width: 40em) {
    margin-left: auto;
  }
`;

class ProfileMenu extends Component {

  state = {
    photoUrl: '',
    firstname: '',
    lastname: ''
  };

  componentDidMount() {
    userData.getLoggedUser().then(res => {
      const {photoUrl, firstname, lastname} = res.data;
      this.setState({photoUrl, firstname, lastname});
    });
  };

  render() {
    const {photoUrl, firstname, lastname} = this.state;
    return (
      <Profile onClick={this.props.onClick}>
        <ProfileImage src={photoUrl} w="40px" />
        <div>
          <span>{firstname}</span>
          <span>{lastname}</span>
        </div>
      </Profile>
    );
  };
};

export default ProfileMenu;
