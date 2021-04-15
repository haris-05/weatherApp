import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import APP_ROUTES from './AppRoutes';
import {Home, Map} from '../Screens';
import {Colors} from '../GlobalAppStyles';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={APP_ROUTES.HOME_SCREEN}
      screenOptions={{
        headerTintColor: Colors.primary,
        headerShown: false,
      }}>
      <Stack.Screen name={APP_ROUTES.HOME_SCREEN} component={Home} />
      <Stack.Screen name={APP_ROUTES.MAP_SCREEN} component={Map} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
