// @flow
import React from 'react';

import { Stage, Layer, Rect, Image, Transformer, Text } from 'react-konva';
import { Flex, Box } from 'grid-styled';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import * as cm from '../../../../components/common';
import InfoIcon from 'material-ui-icons/Info';

import * as dorData from '../../../../data/dor';

// class Surface extends React.Component {
//   state = {
//     x: 0,
//     y: 0,
//   };
//   render() {
//     return (
//       <React.Fragment>
//         <Rect
//           name={this.props.name}
//           x={this.state.x}
//           y={this.state.y}
//           width={this.props.width}
//           height={this.props.height}
//           draggable="true"
//           fill={this.props.color}
//           onDragEnd={e => {
//             this.setState({
//               x: e.target.attrs.x,
//               y: e.target.attrs.y,
//             });
//           }}
//           onClick={() => {
//             this.setState({
//               showTransform: !this.state.showTransform,
//             });
//           }}
//         />
//         {this.state.showTransform && <Handler link={this.props.name} />}
//       </React.Fragment>
//     );
//   }
// }

// class Handler extends React.Component {
//   componentDidMount() {
//     // not really "react-way". But it works.
//     const stage = this.transformer.getStage();
//     const rectangle = stage.findOne('.' + this.props.link);
//     this.transformer.attachTo(rectangle);
//     this.transformer.getLayer().batchDraw();
//   }
//   render() {
//     return (
//       <Transformer
//         ref={node => {
//           this.transformer = node;
//         }}
//       />
//     );
//   }
// }

type Attr = {
  x: number,
  y: number,
};

type State = {
  image: any,
  titre: string,
  name: string,
  birth: string,
  font: string,
  fontSize: number,
  attrTitre: Attr,
  attrName: Attr,
  attrBirth: Attr,
  file: ?window.File,
};

export default class Diploma extends React.Component<{}, State> {
  state = {
    image: null,
    titre: 'Question',
    name: 'Jean Dupont',
    birth: '10/02/2030',
    attrTitre: { x: 130, y: 292 },
    attrName: { x: 207, y: 316 },
    attrBirth: { x: 172, y: 351 },
    font: 'Arial',
    fontSize: 15,
    file: null,
  };

  componentDidMount() {
    this.loadImage('/img/diplomeIsepDOr9652.png');
  }

  loadImage(url: string) {
    const image = new window.Image();
    image.src = url;
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState({
        image: image,
      });
    };
  }

  updateConfig = () => {
    const { attrTitre, attrName, attrBirth, fontSize } = this.state;
    dorData
      .updateConfig({
        titre: {
          ...attrTitre,
          fontSize,
        },
        name: {
          ...attrName,
          fontSize,
        },
        birthdate: {
          ...attrBirth,
          fontSize,
        },
      })
      .then(res => {
        console.log('updated');
      });
  };

  dragEnd = (e: any) => {
    const { x, y, name } = e.target.attrs;
    console.log(name, x, y);
    if (name === 'titre') {
      this.updatePos('attrTitre', { x, y });
    }
    if (name === 'name') {
      this.updatePos('attrName', { x, y });
    }
    if (name === 'birth') {
      this.updatePos('attrBirth', { x, y });
    }
  };

  updatePos(targetName: string, value: Attr) {
    this.setState({
      [targetName]: value,
    });
  }

  onSelectFile = (files: File[]) => {
    this.setState({
      file: files[0],
    });
  };

  render() {
    if (!this.state.image) return null;
    const stageStyle = {
      overflow: 'hidden',
      height: 600,
    };
    const { attrTitre, attrName, attrBirth, file } = this.state;
    return (
      <Flex>
        <Box w={[1, 1 / 4]} p={3}>
          <Box mt="10px">
            <cm.Text fs="12px">
              3 zones de texte sont déplaçable à droite
            </cm.Text>
          </Box>
          <TextField
            label="Titre"
            margin="normal"
            fullWidth
            value={this.state.titre}
            onChange={e => this.setState({ titre: e.target.value })}
          />
          <TextField
            label="Nom"
            margin="normal"
            fullWidth
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <TextField
            label="Date de naissance"
            margin="normal"
            fullWidth
            value={this.state.birth}
            onChange={e => this.setState({ birth: e.target.value })}
          />
          <Box mb="10px">
            <cm.Text fs="12px">
              Les données précédentes sont factices et ne seront pas
              enregistrées, elles servent uniquement à aider au positionnement
              des zones de texte.
            </cm.Text>
          </Box>
          <TextField
            label="Nom police"
            margin="normal"
            fullWidth
            value={this.state.font}
            onChange={e => this.setState({ font: e.target.value })}
          />
          <TextField
            type="number"
            label="Taille de police"
            margin="normal"
            fullWidth
            value={this.state.fontSize}
            onChange={e =>
              this.setState({ fontSize: parseInt(e.target.value) })
            }
          />
          <Box mb="20px">
            <Flex alignItems="center">
              <Box mr={2}>
                <cm.FileUpload
                  onFile={this.onSelectFile}
                  accept={['png']}
                  btnProps={{
                    size: 'small',
                    color: 'primary',
                    variant: 'raised',
                  }}
                >
                  Changer photo
                </cm.FileUpload>
              </Box>
              <Box>
                <cm.Text fs="12px">{file && file.name}</cm.Text>
              </Box>
            </Flex>
          </Box>
          <Button
            onClick={this.updateConfig}
            color="secondary"
            variant="raised"
          >
            Sauvegarder
          </Button>
        </Box>
        <Box w={[1, 3 / 4]} p={3}>
          <cm.Paper>
            <Stage style={stageStyle} width={window.innerWidth} height={900}>
              <Layer draggable="true">
                <Image
                  width={0.7 * this.state.image.naturalWidth}
                  height={0.7 * this.state.image.naturalHeight}
                  image={this.state.image}
                />
                <Text
                  x={attrTitre.x}
                  y={attrTitre.y}
                  name="titre"
                  text={this.state.titre}
                  draggable="true"
                  onDragEnd={this.dragEnd}
                  fontFamily={this.state.font}
                  fontSize={this.state.fontSize}
                />
                <Text
                  x={attrName.x}
                  y={attrName.y}
                  name="name"
                  text={this.state.name}
                  draggable="true"
                  onDragEnd={this.dragEnd}
                  fontFamily={this.state.font}
                  fontSize={this.state.fontSize}
                />
                <Text
                  x={attrBirth.x}
                  y={attrBirth.y}
                  name="birth"
                  text={this.state.birth}
                  draggable="true"
                  onDragEnd={this.dragEnd}
                  fontFamily={this.state.font}
                  fontSize={this.state.fontSize}
                />
                {/* <Surface name="test" color="red" width={300} height={40} />
            <Surface name="test1" color="blue" width={300} height={40} /> */}
              </Layer>
            </Stage>
          </cm.Paper>
        </Box>
      </Flex>
    );
  }
}
