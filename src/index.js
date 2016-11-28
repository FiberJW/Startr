import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Text,
  StatusBar,
  Linking,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import TouchableNativeFeedback from '@exponent/react-native-touchable-native-feedback-safe';
import Icon from 'react-native-vector-icons/Ionicons';
import getStartups from './utils/getStartups';
import requireLogo from './images/requireLogo';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startUps: [],
      bounceValue: new Animated.Value(1),
    };
  }

  componentWillMount() {
    this.setState({ startUps: getStartups() });
  }

  componentWillUpdate() {
    this.state.bounceValue.setValue(1.5);
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: 1,
        friction: 5,
      }
    ).start();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: StatusBar.currentHeight,
          backgroundColor: this.state.startUps[0].color,
        }}
      >
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: this.state.startUps[0].color,
          }}
        >
          <Animated.Image
            source={ requireLogo(this.state.startUps[0].logo) }
            resizeMode="contain"
            style={{
              height: 100,
              marginBottom: 60,
              transform: [                        // `transform` is an ordered array
              { scale: this.state.bounceValue },  // Map `bounceValue` to `scale`
              ],
            }}
          />
          <View
            style={{
              bottom: 0,
              left: 0,
              right: 0,
              position: 'absolute',
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              width: Dimensions.get('window').width,
            }}
          >
            <TouchableNativeFeedback
              onPress={ () => Linking.openURL(this.state.startUps[0].url) }
              background={ TouchableNativeFeedback.SelectableBackground() }
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 24,
                  textAlign: 'center',
                  fontFamily: 'gotham_light',
                }}
              >
                {this.state.startUps[0].name}
              </Text>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: this.state.startUps[1].color,
          }}
        >
          <View
            style={{
              top: 0,
              left: 0,
              right: 0,
              position: 'absolute',
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              width: Dimensions.get('window').width,
            }}
          >
            <TouchableNativeFeedback
              onPress={ () => Linking.openURL(this.state.startUps[1].url) }
              style={{
              }}
              background={ TouchableNativeFeedback.SelectableBackground() }
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 24,
                  textAlign: 'center',
                  fontFamily: 'gotham_light',
                }}
              >
                {this.state.startUps[1].name}
              </Text>
            </TouchableNativeFeedback>
          </View>
          <Animated.Image                         // Base: Image, Text, View
            source={ requireLogo(this.state.startUps[0].logo) }
            source={ requireLogo(this.state.startUps[1].logo) }
            resizeMode="contain"
            style={{
              height: 100,
              marginTop: 60,
              transform: [                        // `transform` is an ordered array
              { scale: this.state.bounceValue },  // Map `bounceValue` to `scale`
              ],
            }}
          />
        </View>
        <ActionButton
          ref={ c => { this.actionButton = c; } }
          icon={ <Icon name="md-refresh" style={ styles.actionButtonIcon } /> }
          buttonColor="#424242"
          offsetX={ 16 }
          degrees={ 360 }
          offsetY={ -8 }
          onPress={ () => {
            this.setState({ startUps: getStartups() });
            this.actionButton.animateButton();
            setTimeout(() => this.actionButton.reset(), 350);
          } }
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 24,
    height: 26,
    color: 'white',
  },
});

export default App;
