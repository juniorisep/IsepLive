// @flow

import React from 'react';
import styled from 'styled-components';

import IconButton from 'material-ui/IconButton';

import ArrRight from 'material-ui-icons/ChevronRight';
import ArrLeft from 'material-ui-icons/ChevronLeft';

import Transition from 'react-transition-group/Transition';

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
  transition: filter 1s ease;
  filter: blur(${props => props.blur ? '50px' : '0'});
  background-position: center;
  background-size: ${props => props.coverMode};
  background-image: url(${props => props.img});
  background-repeat: no-repeat;
  overflow: hidden;
`;

class ImageLoader extends React.Component {
  state = {
    url: '/img/background.jpg',
    loadImage: null,
    loaded: false,
  }

  componentDidMount() {
    if (this.props.load) {
      console.log('image loading')
      this.setState({ loadImage: this.props.img });
    }
  }

  componentWillReceiveProps(props) {
    if (props.load) {
      this.setState({ loadImage: this.props.img });
    }
  }

  handleImageLoaded = () => {
    this.setState({ url: this.props.img, loaded: true });
  }

  handleImageErrored = () => {

  }

  render() {
    return (
      <span>
        <img
          src={this.state.loadImage}
          alt="loading"
          style={{ display: 'none' }}
          onLoad={this.handleImageLoaded}
          onError={this.handleImageErrored} />
        <Image
          {...this.props}
          blur={!this.state.loaded}
          img={this.state.url} />
      </span>
    )
  }
}

const DIR_FORWARD = 1;
const DIR_BACKWARD = -1;

const duration = 300;

const defaultStyle = props => ({
  transition: `opacity ${props.duration}ms ease-in-out`,
  opacity: 0,
});

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
};

const ImageTransition = (props) => (
  <Transition in={props.in} timeout={props.duration}>
    {(state) => (
      <Image
        coverMode={props.coverMode}
        style={{
          ...defaultStyle(props.duration),
          ...transitionStyles[state],
        }}
        img={props.image} />
    )}
  </Transition>
)

export default class SlideShow extends React.Component {
  state = {
    // not 0 because first item is a double of
    // the last (used for looped transition)
    pos: 1,
    animEnabled: true,
    direction: DIR_FORWARD,
    currentImage: null,
    newImage: null,
    currentStyle: {
      opacity: 1,
    },
    newStyle: {
      opacity: 0,
    },
  }

  task: number;

  getDuration() {
    return (this.props.duration || 5) * 1000 + 500;
  }

  componentDidMount() {
    if (this.props.auto) {
      this.autoSlide();
    }

    if (this.props.initPos) {
      this.setState({ pos: this.props.initPos })
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
  }

  goTo(targetPos: number, direction: number) {
    const { pos } = this.state;
    const { items } = this.props;
    console.log(targetPos)
    if (targetPos > items.length - 1) {
      this.setState({ pos: 0 });
      this.switchImage(items[0]);
      return;
    }

    if (targetPos < 0) {
      this.setState({ pos: items.length - 1 });
      this.switchImage(items[items.length - 1]);
      return;
    }

    this.setState({ pos: targetPos });
    this.switchImage(items[targetPos]);
    return;

    if (pos > items.length - 1 && direction > 0) {
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

    this.setState({
      pos: targetPos,
      animEnabled: true,
      direction,
    });
  }

  switchImage = (newImage) => {
    this.setState((state) => ({
      currentImage: state.newImage,
      newImage,
      currentStyle: {
        opacity: 0,
      },
      newStyle: {
        opacity: 1,
      }
    }));
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
    const { showControls, items } = this.props;
    const {
      pos,
      animEnabled,
      currentImage,
      newImage,
      currentStyle,
      newStyle,
     } = this.state;
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
        <ImageTransition
          in={true}
          coverMode={this.props.coverMode}
          duration={300}
          image={currentImage} />
        {/* <div
          onTransitionEnd={this.transitionEnded}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            transform: `translate3d(-${pos * 101}%, 0, 0)`,
            transition: animEnabled ? 'transform .5s ease' : 'none',
          }}>
          {
            this.getList().map((url, i) => {
              // return <Image
              //   key={i}
              //   coverMode={this.props.coverMode}
              //   style={{
              //     left: i * 101 + '%',
              //   }}
              //   img={url} />
              return <ImageLoader
                key={i}
                load={pos <= i + 2 && pos >= i - 2}
                coverMode={this.props.coverMode}
                style={{
                  left: i * 101 + '%',
                }}
                img={url} />
            })
          }
        </div> */}
      </ImageList>
    );
  };
};
