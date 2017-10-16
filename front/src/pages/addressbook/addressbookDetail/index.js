// @flow

import React, {Component} from 'react';

import * as studentData from 'data/users/student';

import AdressbookDetailView from './view'

class AdressbookDetail extends Component {

  state = {
    id: this.props.match.params.id,
    photoUrl: '',
    firstname: '',
    lastname: '',
    phone: '',
    birthDate: '',
    promo: '',
    bio: '',
    address: '',
    mail: '',
    mailISEP: '',
  };

  componentDidMount() {
    this.requestAdressbookDetail();
  };

  requestAdressbookDetail() {
    studentData.getStudent(this.state.id)
      .then(res => {
        const {photoUrl, firstname, lastname, phone, birthDate, promo, bio, address, mail, mailISEP} = res.data;
        this.setState({photoUrl, firstname, lastname, phone, birthDate, promo, bio, address, mail, mailISEP});
      });
  };

  render() {
    return (
      <AdressbookDetailView
        {...this.state}
      />
    );
  };
};

export default AdressbookDetail;
