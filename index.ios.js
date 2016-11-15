/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { AppRegistry } from 'react-native';

import Index from './src/scenes';

export default function reactNativeHeatmap () {
  return (
    <Index />
  );
}

AppRegistry.registerComponent('reactNativeHeatmap', () => reactNativeHeatmap);
