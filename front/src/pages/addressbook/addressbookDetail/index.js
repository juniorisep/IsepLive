// @flow

import React, {Component} from 'react';

import * as studentData from 'data/users/student';

import AdressbookDetailView from './view'

class AdressbookDetail extends Component {

  state = {
    studentId: this.props.match.params.id,
    photoUrl: '',
    firstname: '',
    lastname: '',
    phone: '',
    birthDate: '',
    promo: '',
    bio: '',
  };

  componentDidMount() {
    this.requestAdressbookDetail();
  };

  requestAdressbookDetail() {
    studentData.getStudent(this.state.id)
      .then(res => {
        const {photoUrl, firstname, lastname, phone, birthDate, promo, bio} = res.data;
        this.setState({photoUrl, firstname, lastname, phone, birthDate, promo, bio});
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
