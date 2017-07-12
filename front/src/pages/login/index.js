// @flow

import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';
import Lock from 'material-ui-icons/Lock';

const STYLE_BACKGROUND = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: 'url(img/background.jpg)',
  backgroundRepeat: 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}

const STYLE_H1 = {
  fontSize: '4em',
}

const STYLE_H2 = {
  color: 'blue',
}

const STYLE_IMG = {
  borderRadius: '8px',
  maxWidth: '50%',
	height: 'auto',
}

const STYLE_HR = {
  width : '1px',
  height : '250px',
}

const CUSTOM_STYLES = {
  underlineFocusStyle:{
    borderColor:"#77191c",
  }
}

export default class Login extends Component {
  state = {
    open: false,
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div style={STYLE_BACKGROUND}>
        <div className="container" style={{textAlign: 'center'}}>
          <div className="row" style={{display: 'flex'}}>
            <div className="col-md-5" style={{margin: 'auto'}}>
              <h1 style={STYLE_H1}>ISEPLive.fr</h1>
              <h2 style={STYLE_H2}>Espace étudiant de l'Isep</h2>
              <div className="row" style={{display: 'flex'}}>
                <div className="col-md-4" style={{margin: 'auto'}}>
                  <img style={STYLE_IMG} alt="Alten" src="img/alten.jpg" />
                </div>
                <div className="col-md-4" style={{margin: 'auto'}}>
                  <img style={STYLE_IMG} alt="BDE" src="img/cosmoz.jpg" />
                </div>
                <div className="col-md-4" style={{margin: 'auto'}}>
                  <img style={STYLE_IMG} alt="Isep" src="img/isep.png" />
                </div>
              </div>
            </div>
            <div className="col-md-1" style={{margin: 'auto'}}>
              <hr style={STYLE_HR} />
            </div>
            <div className="col-md-5" style={{margin: 'auto'}}>
              <div className="row">
                <div className="col-md-12">
                  <Button onClick={() => this.setState({ open: true })}>Se connecter</Button>
                  <Dialog open={this.state.open} transition={Slide} onRequestClose={this.handleRequestClose}>
                    <DialogTitle style={{textAlign: 'center'}}>
                      <img alt="Isep Live" src="img/iseplive.jpg" style={{height: '200px'}} />
                    </DialogTitle>
                    <DialogContent>
                      <TextField
                        type="text"
                        label="Nom d'utilisateur"
                        fullWidth
                        underlineFocusStyle={CUSTOM_STYLES.underlineFocusStyle}
                        />
                      <TextField
                        type="password"
                        label="Mot de passe"
                        fullWidth
                        underlineFocusStyle={CUSTOM_STYLES.underlineFocusStyle}
                        />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleRequestClose} color="primary">
                        Mot de passe oublié
                      </Button>
                      <Button onClick={this.handleRequestClose} color="primary" >
                        Connexion
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
                <div className="col-md-12">
                  <Button>Continuer en tant que visiteur</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
