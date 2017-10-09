// @flow

import React from 'react';
import styled from 'styled-components';

const ImageList = styled.div`
  position: relative;
  display: block;
  overflow: hidden;
  height: ${props => props.h || '100%'};
  width: ${props => props.w || '100%'};
`;

const Image = styled.div`
  background: white;
  position: absolute;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-image: url(${props => props.img});
  background-repeat: no-repeat;
`;


export default class SlideShow extends React.Component {
  state = {
    // not 0 because first item is a double of
    // the last for transition that is used for looped transition
    pos: 1,
    animEnabled: true,
  }

  getDuration() {
    return (this.props.duration || 5) * 1000 + 500;
  }

  componentDidMount() {
    setInterval(() => {
      const { pos } = this.state;
      const DIR_FORWARD = 1;
      this.goTo(pos + 1, DIR_FORWARD);
    }, this.getDuration());
  }

  goTo(targetPos, direction) {
    const { pos } = this.state;
    const { items } = this.props;

    if (pos === 0 && direction < 0) {
      setTimeout(() => {
        this.setState({ animEnabled: false, pos: items.length + 1 });
      }, 800);
    }

    if (pos === items.length && direction > 0) {
      setTimeout(() => {
        this.setState({ animEnabled: false, pos: 1 });
      }, 800);
    }

    this.setState({ pos: targetPos, animEnabled: true });
  }

  // Build a list with last item on the first place and first
  // item on the last place for animation purposes
  getList() {
    const { items } = this.props;
    const first = items[0];
    const last = items[items.length - 1];
    return [last, ...items, first];
  }

  render() {
    const { pos, animEnabled } = this.state;
    return (
      <ImageList>
        {
          this.getList().map((url, i) => {
            const imStyle = {
              left: i * 100 +'%',
              transform: `translate3d(-${pos * 100}%, 0, 0)`,
              transition: animEnabled ? 'transform .5s ease' : 'none',
            };
            return <Image key={i} style={imStyle} img={url} ontransition />
          })
        }
      </ImageList>
    );
  }
}
