import React from 'react';
import { View } from 'react-native';

import Heatmap from './Heatmap/Heatmap';

export default function Index () {
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1
      }}
    >
      <Heatmap />
    </View>
  );
}
