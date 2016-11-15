import React, { Component } from 'react';
import { Platform, View, WebView } from 'react-native';

import HeatmapUtils from '../../utils/HeatmapUtils';
import styles from './Heatmap.styles';

const heatmapInputGenerator = (points, radius, max) => {
  return `
    var heatmapInstance = h337.create({
      container: document.querySelector('.heatmap'),
      radius: ${radius}
    });
    heatmapInstance.setData({
      max: ${max},
      data: ${JSON.stringify(points)}
    });
  `;
};

export default class Heatmap extends Component {
  state = {}

  componentDidMount() {
    setTimeout(
      () => {
        // https://github.com/facebook/react-native/issues/953
        this.refs.heatmap.measure((ox, oy, width, height) => {
          const radius = Math.round(width * 0.05);
          const processedPoints = HeatmapUtils.processPoints({ x: 1, y: 1 },
                                                             { x: 0, y: 0 },
                                                             { x: 2, y: 0 },
                                                             [ { x: 1, y: 0.5 } ],
                                                             width, height, radius);
          this.setState({ processedPoints, radius });
        });
      }
    );
  }

  render() {
    const uri = Platform.OS === 'ios' ? 'heatmap.html' : 'file:///android_asset/heatmap.html';
    let script = null;
    let webview = null;

    if (this.state.processedPoints) {
      const maxValue = Math.max(...this.state.processedPoints.map((p) => p.value));
      script = heatmapInputGenerator(this.state.processedPoints, this.state.radius, maxValue);
      webview = script ?
        <WebView
          source={{ uri: uri }}
          scrollEnabled={false}
          style={styles.webview}
          injectedJavaScript={script}
          javaScriptEnabled
        />
      : null;
    }

    return (
      <View
        style={styles.webviewBackground}
        ref='heatmap'
      >
        { webview }
      </View>
    );
  }
}
