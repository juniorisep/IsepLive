// @flow

import React from 'react';
import styled from 'styled-components';

import IconButton from 'material-ui/IconButton';

import ArrRight from 'material-ui-icons/ChevronRight';
import ArrLeft from 'material-ui-icons/ChevronLeft';

const Controls = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 2;
`;

const Control = styled.div`
  position: absolute;
  height: 100%;
  width: 40px;
  display: flex;
  align-items: center;
`;
const ImageList = styled.div`
  position: relative;
  display: block;
  overflow: hidden;
  height: ${props => props.h || '100%'};
  width: ${props => props.w || '100%'};
`;

const Image = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: ${props => props.coverMode};
  background-image: url(${props => props.img});
  background-repeat: no-repeat;
`;

const DIR_FORWARD = 1;
const DIR_BACKWARD = -1;

export default class SlideShow extends React.Component {
  state = {
    // not 0 because first item is a double of
    // the last (used for looped transition)
    pos: 1,
    animEnabled: true,
    direction: DIR_FORWARD,
  }

  getDuration() {
    return (this.props.duration || 5) * 1000 + 500;
  }

  componentDidMount() {
    if (this.props.auto) {
      this.autoSlide();
    }

    if (this.props.initPos) {
      this.setState({ pos: this.props.initPos + 1 })
    }

    document.addEventListener('keydown', this.handleKey);
  }

  componentWillUnmount() {
    if (this.task) {
      clearInterval(this.task);
    }
    document.removeEventListener('keydown', this.handleKey);
  }

  handleKey = ({ key }) => {
    if (this.props.handleKey) {
      const { pos } = this.state;
      switch (key) {
        case 'ArrowRight':
          this.goTo(pos + 1, DIR_FORWARD);
          break;
        case 'ArrowLeft':
          this.goTo(pos - 1, DIR_BACKWARD);
          break;
        default:
          break;
      }
    }
  }

  handleArrow = (direction) => e => {
    const { pos } = this.state;
    this.goTo(pos + direction, direction);
  }

  autoSlide() {
    this.task = setInterval(() => {
      const { pos } = this.state;
      this.goTo(pos + 1, DIR_FORWARD);
    }, this.getDuration());
  };

  goTo(targetPos: number, direction: number) {
    const { pos } = this.state;
    const { items } = this.props;


    if (pos >= items.length + 1 && direction > 0) {
      return;
    }
    if (pos <= 0 && direction < 0) {
      return;
    }

    if (this.props.onChange) {
      let changePos = targetPos - 1
      if (targetPos === 0) changePos = items.length - 1;
      if (targetPos === items.length + 1) changePos = 0;
      this.props.onChange(changePos);
    }

    this.setState({ pos: targetPos, animEnabled: true, direction });
  }

  transitionEnded = () => {
    const { pos, direction } = this.state;
    const { items } = this.props;

    if (pos === items.length + 1 && direction > 0) {
      this.setState({ animEnabled: false, pos: 1 });
    }

    if (pos === 0 && direction < 0) {
      this.setState({ animEnabled: false, pos: items.length });
    }
  }

  // Build a list with last item on the first place and first
  // item on the last place for animation purposes
  getList() {
    const { items } = this.props;
    const first = items[0];
    const last = items[items.length - 1];
    return [last, ...items, first];
  };

  render() {
    const { showControls } = this.props;
    const { pos, animEnabled } = this.state;
    return (
      <ImageList>
        {
          showControls &&
          <Controls>
            <Control>
              <IconButton color="contrast" onClick={this.handleArrow(DIR_BACKWARD)}>
                <ArrLeft />
              </IconButton>
            </Control>
            <Control style={{ right: 0 }} >
              <IconButton color="contrast" onClick={this.handleArrow(DIR_FORWARD)}>
                <ArrRight />
              </IconButton>
            </Control>
          </Controls>
        }
        {
          this.getList().map((url, i) => {
            return <Image
              key={i}
              coverMode={this.props.coverMode}
              onTransitionEnd={this.transitionEnded}
              style={{
                left: i * 101 + '%',
                transform: `translate(-${pos * 101}%, 0)`,
                transition: animEnabled ? 'transform .5s ease' : 'none',
              }}
              img={url}
              ontransition />
          })
        }
      </ImageList>
    );
  };
};
