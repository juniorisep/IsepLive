import React, { Component } from 'react';
import {Flex, Box} from 'grid-styled';
import {
  Post,
  PostTextView,
} from 'components/PostList';

import {
  Text,
  Image,
} from 'components/common';

class GalleryPost extends Component {
  render() {
    const props = this.props;
    const size = props.preview ? [1] : [1, 1/2];
    return (
      <Post invert={props.invert}>
        <Box w={size}>
          <Text>Nom gallerie: {props.post.media.name}</Text>
          <Text>Nb photos: {props.post.media.images.length}</Text>
          {
            props.post.media.images.map(img => {
              return <Image src={img.thumbUrl} w="80px" />;
            })
          }
        </Box>
        <PostTextView
          refresh={props.refresh}
          post={props.post}
          w={size}
          preview={props.preview}/>
      </Post>
    );
  }
}

export default GalleryPost;
