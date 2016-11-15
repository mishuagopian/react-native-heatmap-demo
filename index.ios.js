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

import Heatmap from './src/scenes/Heatmap';

export default function reactNativeHeatmap () {
  return (
    <Heatmap />
  );
}

AppRegistry.registerComponent('reactNativeHeatmap', () => reactNativeHeatmap);
