import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import App from './src';

export default class Startr extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('Startr', () => Startr);
