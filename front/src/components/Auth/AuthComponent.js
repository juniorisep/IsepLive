import React, { Component } from 'react';

import { hasRole } from "../../data/users/services";


class Auth extends Component {
  render() {
    const { children, roles } = this.props;
    if (hasRole(roles)) {
      return <span>{children}</span>;
    }
    return null;
  }
}

export default Auth;
