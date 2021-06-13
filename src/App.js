import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
import Particles from 'react-particles-js';

import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './components/Signin/Signin';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import axios from 'axios';

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 500,
      },
    },
  },
};

class App extends Component {
  state = {
    input: '',
    imgUrl: '',
    boxes: [],
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: '',
    },
  };

  initialState = {
    input: '',
    imgUrl: '',
    boxes: [],
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: '',
    },
  };

  componentDidMount() {
    axios.get(`https://face-recon-api.herokuapp.com/`).then((res) => {
      console.log(res.data);
    });
  }

  onLoadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  displayFaceBox = (boxes) => {
    this.setState({ boxes: boxes });
  };

  calculateFaceLocation = (data) => {
    const bounding_boxes = [];

    const image = document.getElementById('input-image');
    const width = Number(image.width);
    const height = Number(image.height);
    data.data.outputs[0].data.regions.map((region) => {
      return bounding_boxes.push({
        leftCol: region.region_info.bounding_box.left_col * width,
        topRow: region.region_info.bounding_box.top_row * height,
        rightCol: width - region.region_info.bounding_box.right_col * width,
        bottomRow: height - region.region_info.bounding_box.bottom_row * height,
      });
    });

    return bounding_boxes;
  };

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    if (route === 'signout') {
      this.setState(this.initialState);
    }
    this.setState({ route: route });
  };

  onButtonSubmit = () => {
    this.setState({ imgUrl: this.state.input });
    axios
      .post(`https://face-recon-api.herokuapp.com/imageUrl`, {
        input: this.state.input,
      })
      .then((response) => {
        axios
          .put(`https://face-recon-api.herokuapp.com/image`, {
            id: this.state.user.id,
          })
          .then((res) => {
            const updatedEntry = res.data;
            this.setState(
              Object.assign(this.state.user, { entries: updatedEntry })
            );
          })
          .catch((err) => console.log('error updating entries on backend'));
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log('error fetching image from back-end '));
  };

  render() {
    return (
      <div className='App'>
        <Particles className='particles' params={particlesOptions} />
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />

        {this.state.route === 'home' ? (
          <div>
            <Logo />

            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              boxes={this.state.boxes}
              imgUrl={this.state.imgUrl}
            />
          </div>
        ) : this.state.route === 'signin' ? (
          <Signin
            loadUser={this.onLoadUser}
            onRouteChange={this.onRouteChange}
          />
        ) : (
          <Register
            loadUser={this.onLoadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
