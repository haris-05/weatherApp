import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts, Metrics} from '../GlobalAppStyles';
import {
  AppPrimaryButton,
  AppHeaderTitle,
  AppText,
  PickerComponent,
} from '../Components';

const Home = () => (
  <View style={styles.main}>
    <View style={styles.headerTitleContainer}>
      <AppText style={styles.headerTitle}>Islamabad</AppText>
    </View>
    <PickerComponent />
  </View>
);

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Metrics.doubleBaseMargin,
  },
  headerTitleContainer: {
    alignSelf: 'center',
    // borderWidth: 0.5,
    // borderColor: Colors.primary,
    padding: 10,
    borderRadius: 4,
    width: '100%',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: Fonts.size.h1,
    fontWeight: '700',
  },
});
