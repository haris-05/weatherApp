import React, {Component} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Alert, Linking, Platform, StyleSheet, Text, View} from 'react-native';
import {Metrics} from '../GlobalAppStyles';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import {AppPrimaryButton} from '../Components';

MapboxGL.setAccessToken(
  'sk.eyJ1IjoiaGFyaXMwNSIsImEiOiJja25oZHdnZzcyeXloMnZ0YWRoeDQ3cTJtIn0.W3zhzLfYwTlBOKciXhR3_g',
);
export class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: [0, 0],
      showUserLocation: false,
      markerViewId: 0,
    };
  }

  componentDidMount() {
    this.setInitialRegion();
  }

  setInitialRegion = async () => {
    const {route} = this.props;
    const {latitude, longitude} = route.params;
    const copyRegion = [...this.state.region];
    copyRegion[0] = latitude;
    copyRegion[1] = longitude;
    this.setState({region: copyRegion});
  };

  locateCurrentPosition = () => {
    const {region} = this.state;
    Geolocation.getCurrentPosition(
      position => {
        const newRegion = [...this.state.region];
        newRegion[0] = position.coords.latitude;
        newRegion[1] = position.coords.longitude;
        this.setState({region: newRegion}, () => {
          this._camera.flyTo(region);
        });
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
    );
  };

  requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (response === 'granted') {
        this.setInitialRegion();
      } else {
        Linking.openURL('app-settings:');
      }
    } else {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
      if (response === 'granted') {
        this.setInitialRegion();
      } else {
        Alert.alert('Location permission denied');
      }
    }
  };

  onRegionChange = regionValue => {
    this.setState({region: regionValue});
  };

  getUserLocation = async () => {
    this.setState({showUserLocation: true});
  };

  render() {
    const {region, markerViewId} = this.state;
    return (
      <View style={styles.page}>
        <View style={styles.buttonPosition}>
          <AppPrimaryButton
            label={'Locate User'}
            onPress={() => this.getUserLocation()}
          />
        </View>
        <View style={styles.container}>
          <MapboxGL.MapView
            zoomLevel={16}
            logoEnabled={false}
            ref={c => (this._map = c)}
            style={styles.container}>
            <MapboxGL.Camera
              ref={c => (this._camera = c)}
              zoomLevel={16}
              animationMode={'flyTo'}
              animationDuration={2000}
              centerCoordinate={region}
              followUserLocation={this.state.showUserLocation ? true : false}
            />
            <MapboxGL.PointAnnotation
              id={markerViewId.toString()}
              title={'Current Location'}
              coordinate={region}
            />
            {this.state.showUserLocation && (
              <MapboxGL.UserLocation showsUserHeadingIndicator={true} />
            )}
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
  buttonPosition: {
    position: 'absolute',
    top: 20,
    right: 10,
  },
});
