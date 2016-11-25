import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Text,
  StatusBar,
  Linking,
  TouchableNativeFeedback,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { AdMobBanner } from 'react-native-admob';
import Orientation from 'react-native-orientation';
import codePush from 'react-native-code-push';
import getStartups from './utils/getStartups';
import requireLogo from './images/requireLogo';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startUps: [],
      bounceValue: new Animated.Value(0),
      fadeAnim: new Animated.Value(0),
    };
  }

  componentWillMount() {
    this.setState({ startUps: getStartups() });
  }

  componentDidMount() {
    Orientation.lockToPortrait();
  }

  componentWillUpdate() {
    this.state.bounceValue.setValue(1.5);
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: 1,
        friction: 8,
      }
    ).start();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.state.startUps[1].color,
        }}
      >
        <View
          style={{
            paddingTop: StatusBar.currentHeight,
            marginBottom: 50,
            flex: 1,
            backgroundColor: this.state.startUps[0].color,
          }}
        >
          <StatusBar translucent backgroundColor="transparent" />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              backgroundColor: this.state.startUps[0].color,
            }}
          >
            <Animated.Image                         // Base: Image, Text, View
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
            <TouchableNativeFeedback
              onPress={ () => Linking.openURL(this.state.startUps[0].url) }
              style={{
              }}
              background={ TouchableNativeFeedback.SelectableBackground() }
            >
              <View
                style={{
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  backgroundColor: 'rgba(0, 0, 0, 0.25)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 50,
                  width: Dimensions.get('window').width,
                }}
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
              </View>
            </TouchableNativeFeedback>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              backgroundColor: this.state.startUps[1].color,
            }}
          >
            <TouchableNativeFeedback
              onPress={ () => Linking.openURL(this.state.startUps[1].url) }
              style={{
              }}
              background={ TouchableNativeFeedback.SelectableBackground() }
            >
              <View
                style={{
                  top: 0,
                  right: 0,
                  position: 'absolute',
                  backgroundColor: 'rgba(0, 0, 0, 0.25)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 50,
                  width: Dimensions.get('window').width,
                }}
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
              </View>
            </TouchableNativeFeedback>
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
        <AdMobBanner
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}
          bannerSize="smartBanner"
          adUnitID="ca-app-pub-8865769945040882/4706663054"
          testDeviceID="EMULATOR"
          didFailToReceiveAdWithError={ (e) => console.log(e) }
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

export default codePush(App);
