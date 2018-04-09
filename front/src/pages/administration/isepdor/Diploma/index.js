// @flow
import React from 'react';

import { Stage, Layer, Rect, Image, Text } from 'react-konva';
import { Flex, Box } from 'grid-styled';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import * as cm from '../../../../components/common';
import InfoIcon from 'material-ui-icons/Info';

import * as dorData from '../../../../data/dor';
import { backUrl } from '../../../../config';
import { sendAlert } from '../../../../components/Alert';

type Attr = {
  x: number,
  y: number,
  fontSize?: number,
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
  diplomaImg: ?window.File,
  fontFile: ?window.File,
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
    diplomaImg: null,
    fontFile: null,
  };

  componentDidMount() {
    this.loadImage();
    this.loadConfig();
  }

  async loadConfig() {
    const res = await dorData.getConfig();
    const conf = res.data;
    const toScale = (pos: Attr) => {
      pos.x = pos.x * 0.7;
      pos.y = pos.y * 0.7;
      return pos;
    };
    this.setState({
      attrTitre: toScale(conf.titre),
      attrName: toScale(conf.name),
      attrBirth: toScale(conf.birthdate),
      fontSize: conf.name.fontSize * 0.7,
    });
  }

  loadImage() {
    const image = new window.Image();
    image.src =
      backUrl + '/storage/dor/config/diploma.png?t=' + new Date().getTime();
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState({
        image: image,
      });
    };
  }

  updateConfig = async () => {
    const { attrTitre, attrName, attrBirth, fontSize } = this.state;
    const toScale = (pos: Attr) => {
      pos.x = pos.x / 0.7;
      pos.y = pos.y / 0.7;
      return pos;
    };
    try {
      await dorData.updateConfig({
        titre: {
          ...toScale(attrTitre),
          fontSize: fontSize / 0.7,
        },
        name: {
          ...toScale(attrName),
          fontSize: fontSize / 0.7,
        },
        birthdate: {
          ...toScale(attrBirth),
          fontSize: fontSize / 0.7,
        },
      });

      if (this.state.diplomaImg) {
        await dorData.updateDiploma(this.state.diplomaImg);
      }
      if (this.state.fontFile) {
        await dorData.updateDiplomaFont(this.state.fontFile);
      }
      sendAlert('Config mise à jour');
      this.loadImage();
    } catch (err) {
      sendAlert('Erreur de mise à jour', 'error');
    }
  };

  dragEnd = (e: any) => {
    const { x, y, name } = e.target.attrs;
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

  onSelectFile = (name: string) => (files: File[]) => {
    this.setState({
      [name]: files[0],
    });
  };

  render() {
    if (!this.state.image) return null;
    const stageStyle = {
      overflow: 'hidden',
      height: 600,
    };
    const { attrTitre, attrName, attrBirth, fontFile, diplomaImg } = this.state;
    console.log(attrTitre);
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
          <Flex mb="20px">
            <Box mr="10px">
              <div>
                <Box>
                  <cm.FileUpload
                    onFile={this.onSelectFile('diplomaImg')}
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
                  <cm.Text fs="14px">{diplomaImg && diplomaImg.name}</cm.Text>
                </Box>
              </div>
            </Box>
            <Box>
              <div>
                <Box mb={2}>
                  <cm.FileUpload
                    onFile={this.onSelectFile('fontFile')}
                    accept={['ttf']}
                    btnProps={{
                      size: 'small',
                      color: 'primary',
                      variant: 'raised',
                    }}
                  >
                    Changer Police
                  </cm.FileUpload>
                </Box>
                <Box>
                  <cm.Text fs="14px">{fontFile && fontFile.name}</cm.Text>
                </Box>
              </div>
            </Box>
          </Flex>
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
              </Layer>
            </Stage>
          </cm.Paper>
        </Box>
      </Flex>
    );
  }
}
