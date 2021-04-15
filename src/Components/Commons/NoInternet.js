import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  Alert,
  StyleSheet,
} from 'react-native';
import {Images, Colors} from '../../GlobalAppStyles';
import PropTypes from 'prop-types';

const NoInternet = props => {
  return (
    <View style={styles.container}>
      <Image source={Images.noInternet} />
      <Text style={styles.mainTextStyle}>No Internet Connection</Text>
      <Text style={styles.subTextStyle}>
        {' '}
        You are not connected to internet. {'\n'} Make sure Wi-fi is on,
        Airplane mode is off and try again.
      </Text>
      <TouchableWithoutFeedback
        onPress={() =>
          props.isConnected === false
            ? Alert.alert(
                'Reload Failed',
                'Please check your internet connection and try again.',
              )
            : null
        }>
        <View style={styles.buttonMainStyle}>
          <Text style={styles.buttonTextStyle}>Reload</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

NoInternet.propTypes = {
  isConnected: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTextStyle: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 30,
    marginTop: 25,
  },
  subTextStyle: {
    color: '#999',
    fontSize: 22,
    marginTop: 10,
    padding: 10,
    textAlign: 'center',
  },
  buttonMainStyle: {
    backgroundColor: Colors.primaryColor,
    width: '80%',
    padding: 15,
    marginTop: 25,
    borderRadius: 5,
  },
  buttonTextStyle: {
    color: 'white',
    textAlign: 'center',
  },
});

export default NoInternet;
