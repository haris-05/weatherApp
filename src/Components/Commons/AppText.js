import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';

const AppText = props => {
  return (
    <Text {...props} maxFontSizeMultiplier={1.1} style={[props.style]}>
      {props.children}
    </Text>
  );
};

export default AppText;

AppText.propTypes = {
  children: PropTypes.string.isRequired,
};
