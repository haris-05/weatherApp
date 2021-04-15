import React, {Component, useEffect, useRef, useState} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Alert, Linking, Platform, StyleSheet, Text, View} from 'react-native';
import {Metrics} from '../GlobalAppStyles';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

MapboxGL.setAccessToken(
  'sk.eyJ1IjoiaGFyaXMwNSIsImEiOiJja25oZHdnZzcyeXloMnZ0YWRoeDQ3cTJtIn0.W3zhzLfYwTlBOKciXhR3_g',
);
export class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
      },
    };
  }

  componentDidMount() {
    //this.requestLocationPermission();
    this.setInitialRegion();
  }

  setInitialRegion = () => {
    const {route} = this.props;
    const {latitude, longitude} = route.params;
    const copyRegion = {...this.state.region};
    copyRegion.latitude = latitude;
    copyRegion.longitude = longitude;
    this.setState({region: copyRegion});
  };

  locateCurrentPosition = () => {
    const {region} = this.state;
    Geolocation.getCurrentPosition(
      position => {
        const newRegion = {...region};
        newRegion.latitude = position.coords.latitude;
        newRegion.longitude = position.coords.longitude;
        this.setState({region: newRegion});
        // console.log('region=>', region);
        // console.log(this._map);
        //   [position.coords.latitude, position.coords.longitude],
        //   200,
        // );
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
    );
  };

  requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (response === 'granted') {
        this.locateCurrentPosition();
        //setShowUserLocation(true);
      } else {
        Linking.openURL('app-settings:');
      }
    } else {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (response === 'granted') {
        this.locateCurrentPosition();
        //setShowUserLocation(true);
      } else {
        console.log('Location android permission denied');
      }
    }
  };

  onRegionChange = regionValue => {
    this.setState({region: regionValue});
  };

  render() {
    const {region} = this.state;
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView
            centerCoordinate={[region.latitude, region.longitude]}
            ref={c => (this._map = c)}
            style={styles.map}>
            <MapboxGL.Camera
              ref={c => (this._camera = c)}
              zoomLevel={16}
              animationMode={'flyTo'}
              animationDuration={0}
              centerCoordinate={[region.latitude, region.longitude]}
            />
            <MapboxGL.UserLocation />
          </MapboxGL.MapView>
        </View>
      </View>
    );
  }
}

export default Map;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: Metrics.screenHeight / 1.5,
    width: Metrics.screenWidth,
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});
