// @flow

import React, { Component } from 'react';

import styled from 'styled-components';
import { ProfileImage } from '../common';

import * as userData from 'data/users/student';

import { makeCancelable } from '../../data/util';

const Profile = styled.div`
  display: flex;
  padding: 5px;
  border-radius: 5px;
  margin: 5px 0;
  margin-left: 5px;
  max-width: 150px;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }

  > .infos {
    margin-left: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  > .infos > span {
    display: block;
    font-weight: 500;
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
    lastname: '',
  };

  componentDidMount() {
    this.getLoggedUserReq = makeCancelable(userData.getLoggedUser());
    this.getLoggedUserReq.promise.then(res => {
      const { photoUrl, firstname, lastname } = res.data;
      this.setState({ photoUrl, firstname, lastname });
    }).catch(err => { });
  };

  componentWillUnmount() {
    this.getLoggedUserReq.cancel();
  }

  render() {
    const { photoUrl, firstname, lastname } = this.state;
    return (
      <Profile onClick={this.props.onClick}>
        <ProfileImage src={photoUrl} sz="40px" />
        <div className="infos">
          <span>{firstname}</span>
          <span>{lastname}</span>
        </div>
      </Profile>
    );
  };
};

export default ProfileMenu;
