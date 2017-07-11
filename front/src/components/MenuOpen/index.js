// @flow

import React from 'react';

const STYLE_ACCOUNT = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  border: '2px solid white',
  background: '#eee',
  overflow: 'hidden',
};

const STYLE_IMG_ACCOUNT = {
  minWidth: '100%',
  width: '100%',
  minHeight: '100%',
};

export default class MenuOpen extends React.Component {
  render() {
    return (
      <div>
        <div style={STYLE_ACCOUNT}>
          <img style={STYLE_IMG_ACCOUNT} src="https://numeris-isep.fr/img/team//amalric.resized.jpg" alt="Logo" onTouchTap={this.handleTouchTap} />
        </div>
      </div>
    );
  }
}
