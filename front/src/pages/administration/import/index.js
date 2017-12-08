// @flow

import React from "react";
import { Flex, Box } from "grid-styled";

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableFooter,
} from 'material-ui/Table';
import Button from 'material-ui/Button';
import { LinearProgress } from 'material-ui/Progress';
import FileUpload from 'material-ui-icons/FileUpload';
import Done from 'material-ui-icons/Done';

import { FluidContent, Title, Paper, Text, Filler } from "../../../components/common";
import { sendAlert } from '../../../components/Alert';
import * as studentData from '../../../data/users/student';

export default class ImportStudents extends React.Component {
  state = {
    csv: null,
    photos: [],
    progress: 0,
    uploading: false,
    students: [],
    photosData: {},
    uploadState: 'determinate',
    page: 0,
  }

  importStudents = () => {
    const { csv, photos } = this.state;
    this.setState({ uploading: true })

    studentData.importStudents(csv, photos, progress => {
      let percentCompleted = Math.floor((progress.loaded * 100) / progress.total);
      this.setState({
        progress: percentCompleted,
        uploadState: progress.loaded === progress.total ? 'indeterminate' : 'determinate',
      })
    }).then(r => {
      sendAlert("Users imported")
      this.setState({ uploading: false, progress: 0 })
    });
  };

  handle = name => e => {
    let file = (name === 'csv') ? e.target.files[0] : e.target.files;

    this.setState({ [name]: file })
  };

  addCsv = e => {
    let csv = e.target.files[0];

    let reader = new FileReader();
    reader.onload = (e) => {
      let text = e.target.result;
      let students = [];
      let csvParsed = text
        .split('\n')
        .filter(l => l != '')
        .map(l => l.split(','));
      csvParsed.map((l, i) => {
        if (i != 0) {
          students.push({
            firstname: l[0],
            lastname: l[1],
            studentid: l[2],
            promo: l[3],
          })
        }
      })
      this.setState({ students });
    }
    reader.readAsText(csv);

    this.setState({ csv });
  }

  importPhoto = (e) => {
    let photos = e.target.files;
    const readerPromise = (file) => new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = (e) => resolve({ url: e.target.result, file });
      reader.readAsDataURL(file);
    })

    const tmpUrls = [];
    for (let i = 0; i < photos.length; i++) {
      const photoUrl = readerPromise(photos[i])
      tmpUrls.push(photoUrl);
    }

    const photosData = {};
    Promise.all(tmpUrls).then(res => {
      res.forEach(d => {
        photosData[d.file.name.split('.')[0]] = d.url;
      });
    })

    this.setState({ photosData, photos });
  }

  handleChangePage = (e, page) => {
    this.setState({ page });
  }

  render() {
    const {
      uploading,
      progress,
      csv,
      photos,
      students,
      page,
      photosData,
      uploadState,
    } = this.state;
    return (
      <FluidContent>
        <Title invert>Import Eleves</Title>
        <Paper p="2em">

          <Flex>
            <Box mr={2} mb={2}>
              <input id="csvFile" type="file" accept=".csv" style={{ display: "none" }} onChange={this.addCsv} />
              <label htmlFor="csvFile">
                <Button component="span" raised color="primary"><FileUpload style={{ marginRight: 5 }} /> CSV Eleves</Button>
              </label>
            </Box>
            <Box>
              <input id="photos" type="file" multiple accept=".jpg,.jpeg" style={{ display: "none" }} onChange={this.importPhoto} />
              <label htmlFor="photos">
                <Button component="span" raised color="primary"><FileUpload style={{ marginRight: 5 }} /> Photos</Button>
              </label>

            </Box>
          </Flex>

          <Box mb={2}>
            {csv && <Text>CSV élèves: {csv.name}</Text>}
            {photos.length !== 0 && <Text>{photos.length} photo{photos.length !== 1 && 's'} sélectionnée{photos.length !== 1 && 's'}</Text>}
          </Box>

          {uploading && <LinearProgress mode={uploadState} value={progress} />}
          <Button disabled={uploading || !csv || photos.length === 0} raised color="accent" onClick={this.importStudents}><Done style={{ marginRight: 5 }} /> Importer</Button>

          {
            csv &&
            <Table>
              <TableHead>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[20]}
                    count={students.length}
                    rowsPerPage={20}
                    page={page}
                    onChangePage={this.handleChangePage}
                  />
                </TableRow>
                <TableRow>
                  <TableCell>Photo</TableCell>
                  <TableCell>Nom</TableCell>
                  <TableCell numeric>Promotion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  students.slice(page * 20, page * 20 + 20).map(s => {
                    return (
                      <TableRow key={s.id}>
                        <TableCell>
                          <img src={photosData[s.studentid]} style={{ width: "50px" }} />
                        </TableCell>
                        <TableCell>
                          {s.firstname} {s.lastname}
                        </TableCell>
                        <TableCell numeric>
                          {s.promo}
                        </TableCell>
                      </TableRow>
                    );
                  })
                }
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[20]}
                    count={students.length}
                    rowsPerPage={20}
                    page={page}
                    onChangePage={this.handleChangePage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          }


        </Paper>
        <Filler h={200} />
      </FluidContent>
    );
  };
};
