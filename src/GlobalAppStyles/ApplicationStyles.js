import Colors from './Colors';
import Metrics from './Metrics';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  mainContainer: {
    flex: 1,
    paddingLeft: Metrics.doubleBaseMargin - 5,
    paddingRight: Metrics.doubleBaseMargin - 5,
  },
  shadowContainer: {
    shadowColor: Colors.lightGrey, // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 0.75, // IOS
    shadowRadius: 1, //IOS
    //backgroundColor: Colors.white,
    elevation: 2, // Android
  },
};

export default ApplicationStyles;