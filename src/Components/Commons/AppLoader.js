import React from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import PropTypes from 'prop-types';
import {Colors} from '../../GlobalAppStyles';

const AppLoader = ({loading, loaderColor}) => {
  const color = loaderColor ? loaderColor : Colors.primary;
  return (
    <View style={styles.container}>
      {loading === true ? (
        <ActivityIndicator size="large" color={color} />
      ) : null}
    </View>
  );
};

AppLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
  loaderColor: PropTypes.string,
};

export default AppLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
