// @flow

import React, { Component } from 'react';

import { hasRole, isLoggedIn } from 'data/auth';

class Auth extends Component {
  render() {
    const { children, roles, not, logged } = this.props;

    if (isLoggedIn() && logged) {
      return children;
    }

    if (not && !isLoggedIn()) {
      return children;
    }

    if (!roles && !not && isLoggedIn()) return children;

    if (roles && isLoggedIn() && hasRole(roles)) {
      return children;
    }

    return null;
  }
}

export default Auth;
