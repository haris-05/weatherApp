import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../../GlobalAppStyles';
import PropTypes from 'prop-types';

const AppPrimaryButton = ({label, onPress, containerStyle}) => {
  return (
    <TouchableOpacity
      style={[styles.mainButton, containerStyle]}
      onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

export default AppPrimaryButton;

AppPrimaryButton.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
};

const styles = StyleSheet.create({
  mainButton: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 40,
    borderRadius: 4,
    backgroundColor: '#0f73ee',
    padding: 10,
  },
  text: {
    fontSize: 12,
    color: Colors.white,
  },
});
