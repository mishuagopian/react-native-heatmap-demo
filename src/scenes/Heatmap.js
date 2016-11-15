import React, { Component } from 'react';
import { Platform } from 'react-native';

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
          const processedPoints = HeatmapUtils.processPoints(this.props.firstPoint,
                                                             this.props.secondPoint,
                                                             this.props.thirdPoint,
                                                             this.props.points,
                                                             width, height, radius);
          this.setState({ processedPoints, radius });
        });
      }
    );
  }

  heatmapInputGenerator(points, radius, max) {
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
  }

  render() {
    const uri = Platform.OS === 'ios' ? 'heatmap.html' : 'file:///android_asset/heatmap.html';
    let script = null;

    if (this.state.processedPoints) {
      const maxValue = Math.max(...this.state.processedPoints.map((p) => p.value));
      script = heatmapInputGenerator(this.state.processedPoints, this.state.radius, maxValue);

      const webview = script ?
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
      >
        { webview }
      </View>
    );
  }
}
