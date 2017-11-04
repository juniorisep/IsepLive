// @flow

import React from "react";

import { Title } from "../../../components/common";
import Button from 'material-ui/Button';
import { LinearProgress } from 'material-ui/Progress';
import { sendAlert } from '../../../components/Alert';
import * as studentData from '../../../data/users/student';

export default class ImportStudents extends React.Component {
  state = {
    csv: null,
    photos: [],
    progress: 0,
    uploading: false,
  }

  importStudents = () => {
    const { csv, photos } = this.state;
    this.setState({ uploading: true })
    studentData.importStudents(csv, photos, progress => {
      let percentCompleted = Math.floor((progress.loaded * 100) / progress.total);
      this.setState({ progress: percentCompleted })
    }).then(r => {
      sendAlert("Users imported")
      this.setState({ uploading: false, progress: 0 })
    });
  };

  handle = name => e => {
    let file = (name === 'csv') ? e.target.files[0] : e.target.files;
    this.setState({ [name]: file })
  };

  render() {
    const { uploading, progress, csv, photos } = this.state;
    return (
      <div>
        <Title invert>Import Eleves</Title>
        <div>

          <input id="csvFile" type="file" accept=".csv" style={{ display: "none" }} onChange={this.handle('csv')} />
          <label htmlFor="csvFile">
            <Button component="span" raised color="primary">Liste Eleves (CSV)</Button>
          </label>
          {csv && <span>Fichier sélectionné: {csv.name}</span>}
          <br />
          <input id="photos" type="file" multiple accept=".jpg,.jpeg" style={{ display: "none" }} onChange={this.handle('photos')} />
          <label htmlFor="photos">
            <Button component="span" raised color="primary">Photos</Button>
          </label>
          {photos.length !== 0 && <span>{photos.length} photo{photos.length !== 1 && 's'} sélectionnée{photos.length !== 1 && 's'}</span>}
        </div>
        <br />
        {uploading && <LinearProgress mode="determinate" value={progress} />}
        <Button disabled={uploading || !csv || photos.length === 0} raised color="accent" onClick={this.importStudents}>Importer</Button>
      </div>
    );
  };
};
