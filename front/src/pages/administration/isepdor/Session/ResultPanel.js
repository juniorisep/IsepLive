import React, { Component } from 'react';
import Dialog, { DialogTitle } from 'material-ui/Dialog';

import * as dorData from '../../../../data/dor';

import { type AnswerDorScore } from '../../../../data/dor/type';

type Props = {
  results: AnswerDorScore[],
};

class ResultPanel extends Component<Props, {}> {
  state = {};

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.handleClose}>
        <DialogTitle>{this.props.title}</DialogTitle>
        {this.props.results.map(r => {
          return (
            <div>
              {r.idAnswer} {r.score}
            </div>
          );
        })}
      </Dialog>
    );
  }
}

export default ResultPanel;
