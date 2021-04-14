import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {StyleSheet, Text, View} from 'react-native';
import {Metrics} from '../GlobalAppStyles';

MapboxGL.setAccessToken(
  'sk.eyJ1IjoiaGFyaXMwNSIsImEiOiJja25oZHdnZzcyeXloMnZ0YWRoeDQ3cTJtIn0.W3zhzLfYwTlBOKciXhR3_g',
);

const Map = () => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map} />
      </View>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: Metrics.screenHeight,
    width: Metrics.screenWidth,
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});
