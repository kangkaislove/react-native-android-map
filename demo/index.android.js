/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MyMap from './app/MyMap';

class CustomMap extends Component {
    render() {
        return (
            <MyMap />
        );
    }
}

AppRegistry.registerComponent('CustomMap', () => CustomMap);
