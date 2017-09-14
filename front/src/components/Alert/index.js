import React, { Component } from 'react';

import Snackbar from 'material-ui/Snackbar';
import { withStyles } from 'material-ui/styles';
import { MAIN_COLOR } from '../../colors';

export default class AlertCenter extends Component {
  state = {
    open: false,
    message: '',
  }

  componentDidMount() {
    document.addEventListener('notification', this.onReceiveNotification.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('notification', this.onReceiveNotification.bind(this));
  }

  onReceiveNotification(e) {
    this.setState({ message: e.detail.message, open: true });
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.setState({ open: false });
    }, 3000);
  }

  render() {
    const { open, message } = this.state;
    const SNACKBAR_STYLE = {
      fontSize: 18,
      background: 'white',
      color: MAIN_COLOR,
    };

    return (
      <Snackbar
        SnackbarContentProps={{
          style: SNACKBAR_STYLE
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        message={message}
      />
    )
  }
}


export function sendAlert(message) {
  const event = new CustomEvent('notification', { detail: { message } });
  document.dispatchEvent(event);
}
