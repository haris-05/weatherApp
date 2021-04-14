import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import APP_ROUTES from './AppRoutes';
import {Home} from '../Screens';
import {Colors} from '../GlobalAppStyles';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={APP_ROUTES.HOME_SCREEN}
      screenOptions={{
        headerTintColor: Colors.primary,
      }}>
      <Stack.Screen name={APP_ROUTES.HOME_SCREEN} component={Home} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
