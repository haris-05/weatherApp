import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

// Used via Metrics.baseMargin
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  marginTop: 10,
  marginBottom: 10,
  paddingVertical: 10,
  paddingHorizontal: 10,
  paddingRight: 10,
  paddingLeft: 10,
  paddingTop: 10,
  padding: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  smallPadding: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  screenWidth: width,
  screenHeight: height,
  buttonRadius: 4,
  elevation: 4,
  roundBorderRadius: 16,
  borderWidth: 1,
  icons: {
    extraSmall: 12,
    tiny: 18,
    small: 20,
    regular: 25,
    medium: 30,
    semiLarge: 35,
    large: 45,
    xl: 50,
    xxl: 60,
  },
  images: {
    small: 20,
    regular: 25,
    medium: 40,
    large: 60,
    logo: 200,
  },
};

export default metrics;
