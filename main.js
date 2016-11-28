import React, { Component } from 'react';
import Exponent from 'exponent';
import App from './src';
import Logos from './src/images/Logos';

export default class Startr extends Component {
  state = {
    isReady: false,
  }

  async componentWillMount() {
    await Exponent.Font.loadAsync({
      'gotham_light': require('./assets/fonts/gotham_light.ttf'),
    });

    let fetchLogos = Object.values(Logos).map(logo => {
      return Exponent.Asset.fromModule(logo).downloadAsync();
    });

    await Promise.all(fetchLogos);

    this.setState({isReady: true});
  }

  render() {
    if (!this.state.isReady) {
      return <Exponent.Components.AppLoading />;
    }

    return (
      <App />
    );
  }
}

Exponent.registerRootComponent(Startr);
