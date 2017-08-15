// @flow

import React, {Component} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: ${props => props.visible
  ? 'block'
  : 'none'};
  position: fixed;
  width: 100%;
  height: 100%;
  background: black;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Images = styled.div`
  position: relative;
  display: block;
  height: 100%;
`;

const Image = styled.div`
  left: ${props => props.index * 100}%;
  position: absolute;
  width: 100%;
  top: 50%;
  transition: transform .5s ease;
  transform: translateY(-50%) translateX(-${props => props.pos * 100}%);

  img {
    width: 100%;
  }
`;

class Gallery extends Component {

  state = {
    cIndex: 0,
    photos: [< img src="/img/background.jpg" alt="" />, < img src="/img/background.jpg" alt="" />,
      < img src="/img/background.jpg" alt="" />
    ]
  };

  componentDidMount() {
    document.addEventListener('keydown', this.keyHandler);
  };

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyHandler);
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.visible) {
      document.removeEventListener('keydown', this.keyHandler);
    };
  };

  keyHandler = ({key}) => {
    const {cIndex, photos} = this.state;
    console.log(key);
    if (key === 'ArrowRight') {
      if (cIndex !== photos.length - 1) {
        this.setState({
          cIndex: cIndex + 1
        });
      } else {
        this.setState({cIndex: 0});
      }
    };
    if (key === 'ArrowLeft') {
      if (cIndex !== 0) {
        this.setState({
          cIndex: cIndex - 1
        });
      };
    };
    if (key === 'Escape') {
      this.props.onEscKey();
    };
  };

  render() {
    return (
      <Wrapper visible={this.props.visible}>
        <Images>
          {this.state.photos.map((p, i) => {
            return
            <Image key={i} index={i} pos={this.state.cIndex}>
              {p}
            </Image>
          })
          }
        </Images>
      </Wrapper>
    );
  };
};

export default Gallery;
