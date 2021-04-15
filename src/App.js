/* eslint-disable react-native/no-inline-styles */
import React, {Fragment} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from './Navigation';
import NetInfo from '@react-native-community/netinfo';
import {NoInternet} from './Components';

const AppContainer = props => {
  const {isInternetConnected} = props;
  return (
    <Fragment>
      {isInternetConnected ? (
        <NavigationContainer>
          <SafeAreaView style={styles.safeArea}>
            <AppNavigator />
          </SafeAreaView>
        </NavigationContainer>
      ) : (
        <NoInternet isConnected={isInternetConnected} />
      )}
    </Fragment>
  );
};

const App = () => {
  const [isInternetConnected, toggleNetwork] = React.useState(false);

  const handleConnectivityChange = async () => {
    const checkConnectivity = await NetInfo.fetch();
    const {isConnected} = checkConnectivity; // get is connected state from net info using destructuring
    toggleNetwork(isConnected);
  };

  React.useEffect(() => {
    NetInfo.addEventListener(change => handleConnectivityChange());
  }, [isInternetConnected]);

  return <AppContainer isInternetConnected={isInternetConnected} />;
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
