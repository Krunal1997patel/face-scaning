import React, {Component} from 'react';
import './App.css';
import Navigation from './componentas/Navigation/Navigation';
import Logo from './componentas/Logo/Logo';
import ImageURL from './componentas/ImageURL/ImageURL';
import Rank from './componentas/Rank/Rank';
// import Navigation from './componentas/ImageWithFace/ImageWithFace';
import Particles from 'react-particles-js';
import 'tachyons';

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
  render() {
    return (
      <div className="App">
        <Particles className="backgroundMove"
          params={particlesOption}
        />
        <Navigation />
        <Logo />
        <Rank/>
        <ImageURL />
        {/* <ImageWithFace /> */}
      </div>
    );
  }
}

export default App;
