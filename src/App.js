import React, {Component} from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './componentas/Navigation/Navigation';
import Logo from './componentas/Logo/Logo';
import ImageURL from './componentas/ImageURL/ImageURL';
import Rank from './componentas/Rank/Rank';
import ImageWithFace from './componentas/ImageWithFace/ImageWithFace';
import Register from './componentas/Register/Register';
import SignIn from './componentas/SignIn/SignIn';
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

const initialState = {
  input: '',
  ImageWithFace: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    imageInput: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        imageInput: data.imageInput,
        joined: data.joined,
      }
    })
  }

  componentDidMount() {
    fetch('http://localhost:3001')
      .then(response => response.json())
      //.then(console.log);
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
    this.setState({box: box});
  }

  onSubmit = () =>{
    this.setState({ImageWithFace: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(response => {
        if(response){
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {imageInput: count}))
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.faceLocation(response))
      })
      .catch(err => console.log(err))

  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState);
    }else{
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles className="backgroundMove"
          params={particlesOption}
        />
        <Navigation isSignedIn={this.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home'
          ? <div>
            <Logo />
            <Rank name={this.state.user.name} imageInput={this.state.user.imageInput}/>
            <ImageURL oninputChange={this.oninputChange} onSubmit={this.onSubmit} />
            <ImageWithFace box={this.state.box} ImageWithFace={this.state.ImageWithFace}/>
          </div>
          :(
            this.state.route === 'signin'
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
