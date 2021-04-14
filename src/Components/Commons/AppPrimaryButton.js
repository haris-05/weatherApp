import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const AppPrimaryButton = ({label, onPress, containerStyle}) => {
  return (
    <TouchableOpacity
      style={[styles.mainButton, containerStyle]}
      onPress={onPress}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

export default AppPrimaryButton;

const styles = StyleSheet.create({
  mainButton: {},
});
