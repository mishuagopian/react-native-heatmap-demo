import React from 'react';
import { View } from 'react-native';

import Heatmap from './Heatmap/Heatmap';

export default function Index () {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center'
      }}
    >
      <Heatmap />
    </View>
  );
}
