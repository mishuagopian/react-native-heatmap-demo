import React, { Component } from 'react';
import { Platform, Text, TouchableOpacity, View, WebView } from 'react-native';

import HeatmapUtils from '../../utils/HeatmapUtils';
import styles from './Heatmap.styles';

export default class Heatmap extends Component {
  state = {}

  componentDidMount() {
    setTimeout(
      () => {
        // https://github.com/facebook/react-native/issues/953
        this.refs.heatmap.measure((ox, oy, width, height) => {
          const radius = Math.round(width * 0.05);
          this.handleSuffle(width, height, radius);
          this.setState({ width, height, radius });
        });
      }
    );
  }

  generatePoints(width, height) {
    const points = [];
    for (const i = 0; i < 25; i++) {
      points.push({ x: randomize(width), y: randomize(height) });
    }
    return points;
  }

  handleSuffle(width, height, radius) {
    setTimeout(() => {
      const points = this.generatePoints(width, height);
      const processedPoints = HeatmapUtils.processPoints({ x: 0, y: height },
                                                         { x: 0, y: 0 },
                                                         { x: width, y: 0 },
                                                         points,
                                                         width, height, radius);
      this.setState({ processedPoints });
    });

    // Forcing heatmap to empty
    this.setState({ processedPoints: null });
  }

  render() {
    let webview = null;

    if (this.state.processedPoints) {
      const uri = Platform.OS === 'ios' ? 'heatmap.html' : 'file:///android_asset/heatmap.html';
      const maxValue = Math.max(...this.state.processedPoints.map((p) => p.value));
      const script = heatmapInputGenerator(this.state.processedPoints, this.state.radius, maxValue);
      webview = <WebView
        source={{ uri: uri }}
        scrollEnabled={false}
        injectedJavaScript={script}
        javaScriptEnabled
      />;
    }

    return (
      <View style={styles.container} >
        <View
          style={styles.webview}
          ref='heatmap'
        >
          { webview }
        </View>
        <TouchableOpacity
          onPress={this.handleSuffle.bind(this, this.state.width, this.state.height, this.state.radius)}
          style={styles.button}
        >
          <Text style={styles.text}> SHUFFLE ! </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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

const randomize = (max) => parseInt(Math.random() * (max +1));
