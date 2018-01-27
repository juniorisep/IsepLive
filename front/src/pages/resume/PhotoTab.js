// @flow

import React from 'react';

import { Box, Flex } from 'grid-styled';

import { Link } from 'react-router-dom';

import {
  Text,
  Title,
  Image,
} from 'components/common';

import { MAIN_COLOR } from '../../colors';

import * as userData from '../../data/users/student';
import * as authData from '../../data/auth';

export default class PhotoTab extends React.Component {

  state = {
    matched: [],
    page: 0,
  }

  componentDidMount() {
    userData.getTaggedPhotos(this.props.userId, this.state.page).then(res => {
      this.setState({
        matched: res.data.content,
        page: this.state.page + 1,
      })
    })
  }

  render() {
    const { matched } = this.state;
    return (
      <Box p={2} w={1}>
        {
          matched.length === 0 &&
          <div style={{ textAlign: 'center', minHeight: 200, marginTop: 100 }}>
            <Text fs="2em">Aucune photo</Text>
          </div>
        }
        {
          matched.length !== 0 &&
          <Flex wrap style={{ marginTop: 30, minHeight: 300 }}>
            {
              matched.map((match, index) => {
                return (
                  <Box key={match.id} w={[1 / 2, 1 / 4, 1 / 5]} p={1} mb={2}>
                    <Flex align="center" style={{ height: '100%' }}>
                      <Link to={{
                        pathname: '/gallery/' + match.galleryId,
                        state: { imageId: match.image.id }
                      }} style={{ width: '100%' }}>
                        <Image w="100%" src={match.image.thumbUrl} />
                      </Link>
                    </Flex>
                    <Text>
                      Ajoutée par <span style={{ color: MAIN_COLOR }} >
                        <Link to={`/annuaire/${match.owner.id}`}>
                          {
                            this.props.userId === match.owner.id ?
                              'Moi' : `${match.owner.firstname} ${match.owner.lastname}`
                          }
                        </Link>
                      </span>
                    </Text>
                  </Box>
                );
              })
            }
          </Flex>
        }
      </Box>
    );
  }
}