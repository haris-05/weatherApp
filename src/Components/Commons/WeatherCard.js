import React from 'react';
import {StyleSheet, Text, View, Image, Platform} from 'react-native';
import {Images, Metrics, Colors, Fonts} from '../../GlobalAppStyles';
import PropTypes from 'prop-types';
import AppText from './AppText';
import helper from '../../helper';
import moment from 'moment';

const WeatherCard = ({weatherItem}) => {
  return (
    <View style={styles.itemViewStyle}>
      <Image source={Images.weatherPlaceholder} style={styles.imageStyle} />
      <AppText style={styles.text}>{`Temp: ${
        weatherItem.main.temp ? weatherItem.main.temp : '-'
      }°C`}</AppText>
      <AppText style={styles.text}>{`Feels Like: ${
        weatherItem.main.feels_like ? weatherItem.main.feels_like : '-'
      } °C`}</AppText>
      <AppText style={styles.text}>{`Desc: ${
        weatherItem.weather[0]
          ? helper.capitalize(weatherItem.weather[0].description)
          : '-'
      }`}</AppText>
      <AppText>{`Date: ${
        weatherItem.dt_txt
          ? moment(weatherItem.dt_txt).format('YYYY-MM-DD hh:mm a')
          : '-'
      }`}</AppText>
    </View>
  );
};

WeatherCard.propTypes = {
  weatherItem: PropTypes.object.isRequired,
};

export default WeatherCard;

const styles = StyleSheet.create({
  itemViewStyle: {
    width: Metrics.screenWidth / 2,
    marginVertical: Metrics.baseMargin - 5,
    marginHorizontal: Metrics.baseMargin - 5,
    paddingTop: Metrics.padding * 1.5,
    paddingBottom: Metrics.padding - 3,
    paddingHorizontal: Metrics.padding,
    borderColor: Colors.secondaryText,
    borderRadius: Metrics.buttonRadius,
    borderWidth: Metrics.borderWidth,
    elevation: Metrics.elevation,
    shadowColor: Colors.secondaryText, // IOS
    shadowOffset: {width: 1, height: 1}, // IOS
    shadowOpacity: 0.5, // IOS}}
  },
  imageStyle: {
    height: Platform.OS === 'ios' ? 100 : 80,
    width: '100%',
    marginBottom: Metrics.marginBottom,
  },
  text: {
    fontSize: Fonts.size.small,
  },
});
