/* eslint-disable react-native/no-inline-styles */
import React, {Fragment} from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from './Navigation';
import NetInfo from '@react-native-community/netinfo';

const AppContainer = props => {
  return (
    <Fragment>
      <NavigationContainer>
        <StatusBar barStyle={'default'} />
        <SafeAreaView style={{flex: 1}}>
          <AppNavigator />
        </SafeAreaView>
      </NavigationContainer>
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

  return <AppContainer />;
};

export default App;
