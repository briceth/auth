
import React, { Component } from 'react';
import {  AppRegistry,  Text,  View } from 'react-native';
import App from './src/app';

export default class auth extends Component {
  render() {
    return (
      <View>
          <App />
      </View>
    );
  }
}

AppRegistry.registerComponent('auth', () => auth);
