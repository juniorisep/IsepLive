// @flow

import React from 'react';

import { Box, Flex } from 'grid-styled';


import { Title, Text, Paper } from 'components/common';

import List, {
  ListItem,
  ListItemText,
  ListItemIcon
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

import Delete from 'material-ui-icons/Delete';
import Done from 'material-ui-icons/Done';
import VerifiedUser from 'material-ui-icons/VerifiedUser';
import Checkbox from 'material-ui/Checkbox';

import {
  FormControlLabel,
} from 'material-ui/Form';

import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

import Autocomplete from '../../../components/Autocomplete';
import Popup from 'components/Popup';

import * as clubData from '../../../data/club';
import * as authData from '../../../data/auth';
import * as userData from '../../../data/users/student';
import { backUrl } from '../../../config';
import { ADMIN, CLUB_MANAGER } from '../../../constants';

function RightsPanel(props) {
  const {
    selection,
    handleSelectRole,
    isMemberAdmin,
    setAdmin,
    userid,
    getRole,
    deleteMember,
  } = props;
  return (
    <div>
      <Title invert>Droits</Title>
      {!selection && <Text>Sélectionnez un membre</Text>}
      {
        selection &&
        <div>
          <Text>{selection.member.firstname} {selection.member.lastname}</Text>

          <Box mt={3}>
            <FormControl style={{ width: '100%' }}>
              <InputLabel htmlFor="role">Role</InputLabel>
              <Select
                fullWidth
                value={getRole(selection)}
                onChange={handleSelectRole}
                input={<Input fullWidth id="role" />}
              >
                <MenuItem value={1}>Président</MenuItem>
                <MenuItem value={2}>Membre</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <FormControlLabel
            control={
              <Checkbox
                disabled={
                  selection.member.id === userid &&
                  !authData.hasRole([ADMIN, CLUB_MANAGER])
                }
                checked={isMemberAdmin(selection.member.id)}
                onChange={setAdmin} />
            }
            label="Admin"
          />

          <div>
            <IconButton onClick={deleteMember}>
              <Delete />
            </IconButton>
          </div>
        </div>
      }
    </div>
  )
}

class AddUserPanel extends React.Component {
  state = {
    selectedUser: 0,
  }

  selectUser = (user) => {
    this.setState({ selectedUser: user.id });
  }

  searchUser = (search) => {
    return userData.searchStudents(search, [], 'a', 0).then(res => {
      return res.data.content
        .filter(user => this.props.members
          .filter(m => m.member.id === user.id).length === 0)
    });
  }

  render() {
    return (
      <div>
        <Title invert>Ajouter membre</Title>
        <Autocomplete
          label="Etudiant"
          onSelect={this.selectUser}
          search={this.searchUser}
          renderSuggestion={(e) => `${e.firstname} ${e.lastname}`} />
        <Box mt={1}>
          <Button color="accent" onClick={this.props.addMember(this.state)}>
            Ajouter
          </Button>
        </Box>
      </div>
    )
  }
}

export default class MembersTab extends React.Component {
  state = {
    members: [],
    admins: [],
    selection: null,
    addUser: false,
    openDeletePopup: false,
  }

  componentDidMount() {
    this.userid = authData.getUser().id;
    this.loadMembers()
  }

  loadMembers() {
    clubData.getMembers(this.props.clubid).then(res => {
      this.setState({ members: res.data })
    })
    clubData.getAdmins(this.props.clubid).then(res => {
      this.setState({ admins: res.data })
    })
  }

  selectMember = member => e => {
    this.setState({ selection: member, addUser: false });
  }

  isMemberAdmin = (memberid: number) => {
    return this.state.admins
      .filter(m => m.id === memberid).length > 0
  }

  getRole = (selection) => {
    const member = this.state.members.filter(m => m.id === selection.id);
    if (member.length === 1) {
      return member[0].role.id;
    }
    return null;
  }

  handleSelectRole = event => {
    clubData.updateMemberRole(this.state.selection.id, event.target.value).then(res => {
      this.loadMembers();
    })
  }

  setAdmin = () => {
    const { selection } = this.state;
    if (selection) {
      if (this.isMemberAdmin(selection.member.id)) {
        clubData.removeAdmin(this.props.clubid, selection.member.id).then(res => {
          this.loadMembers();
        })
      } else {
        clubData.addAdmin(this.props.clubid, selection.member.id).then(res => {
          this.loadMembers();
        })
      }
    }
  }

  addMember = (data) => e => {
    clubData.addMember(this.props.clubid, data.selectedUser).then(res => {
      this.loadMembers();
      this.setState({ addUser: false });
    })
  }

  deleteMember = () => {
    this.setState({ openDeletePopup: true });
  }

  deleteAccepted = (ok) => {
    if (ok) {
      clubData.deleteMember(this.state.selection.id).then(res => {
        this.loadMembers();
        this.setState({ selection: null });
      })
    }
    this.setState({ openDeletePopup: false });
  }

  render() {
    const {
      members,
      selection,
      addUser,
      openDeletePopup,
    } = this.state;
    return (
      <div>
        <Button color="accent" onClick={() => this.setState({ addUser: true })}>
          Ajouter un membre
        </Button>
        <Flex wrap>
          <Box w={[1, 1 / 3]} p={2}>
            <Paper p="2em">
              {
                !addUser &&
                <RightsPanel
                  selection={selection}
                  isMemberAdmin={this.isMemberAdmin}
                  setAdmin={this.setAdmin}
                  handleSelectRole={this.handleSelectRole}
                  userid={this.userid}
                  getRole={this.getRole}
                  deleteMember={this.deleteMember} />
              }
              {
                addUser &&
                <AddUserPanel
                  members={members}
                  addMember={this.addMember} />
              }
            </Paper>
          </Box>
          <Box w={[1, 2 / 3]} p={2}>
            <Paper p="1em">
              <List>
                {
                  members.map(user => (
                    <ListItem key={user.id} dense button onClick={this.selectMember(user)}>
                      <Avatar alt="photo" src={user.member.photoUrlThumb ? backUrl + user.member.photoUrlThumb : '/img/svg/user.svg'} />
                      <ListItemText primary={`${user.member.firstname} ${user.member.lastname}`} />
                      {this.isMemberAdmin(user.member.id) && <VerifiedUser style={{ color: '#999', marginRight: 10 }} />}
                      {
                        selection && selection.id === user.id &&
                        <ListItemIcon>
                          <Done style={{ display: 'inline' }} />
                        </ListItemIcon>
                      }
                    </ListItem>
                  ))
                }
              </List>
            </Paper>

          </Box>
        </Flex>
        <Popup
          title="Suppression"
          description="Voulez vous supprimer ce Membre ?"
          open={openDeletePopup}
          onRespond={this.deleteAccepted}
        />
      </div>
    );
  }
};
