import React, {Component} from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './componentas/Navigation/Navigation';
import Logo from './componentas/Logo/Logo';
import ImageURL from './componentas/ImageURL/ImageURL';
import Rank from './componentas/Rank/Rank';
import ImageWithFace from './componentas/ImageWithFace/ImageWithFace';
import Particles from 'react-particles-js';
import 'tachyons';

const app = new Clarifai.App({
  apiKey: '17469b807a7c413fab46cfa7c759b586'
 });

const particlesOption = {
  particles: {
    number:{
      value: 80,
      density:{
        enable: true,
        value_area: 800
      }
    },
    move:{
      speed: 13.4
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      ImageWithFace: '',
      box: {},
    }
  }

  oninputChange = (event) => {
    this.setState({input: event.target.value});
  } 

  faceLocation = (data) => {
     const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
     const image = document.getElementById('inputImage');
     const width = Number(image.width);
     const height = Number(image.height);

     return{
       leftCol: clarifaiFace.left_col * width,
       topRow: clarifaiFace.top_row * height,
       rightCol: width - (clarifaiFace.right_col * width),
       bottomRow: height - (clarifaiFace.bottom_row * height),
     }
  }

  displayFaceBox = (box) =>{
    console.log(box);
    this.setState({box: box});
  }

  onSubmit = () =>{
    this.setState({ImageWithFace: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(response => this.displayFaceBox(this.faceLocation(response)))
      .catch(err => console.log(err))

  }

  render() {
    return (
      <div className="App">
        <Particles className="backgroundMove"
          params={particlesOption}
        />
        <Navigation />
        <Logo />
        <Rank/>
        <ImageURL oninputChange={this.oninputChange} onSubmit={this.onSubmit} />
        <ImageWithFace box={this.state.box} ImageWithFace={this.state.ImageWithFace}/>
      </div>
    );
  }
}

export default App;
