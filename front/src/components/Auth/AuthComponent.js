import React, {Component} from 'react';

import { isLoggedIn, hasRole} from "../../data/auth";

class Auth extends Component {
  render() {
    const {children, roles, not} = this.props;
    if (not && !isLoggedIn()) {
      return <span>{children}</span>;
    }
    if (!roles && !not) return <span>{children}</span>;
    if (roles && isLoggedIn() && hasRole(roles)) {
      return <span>{children}</span>;
    }
    return null;
  }
};

export default Auth;
