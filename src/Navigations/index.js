/**
 * React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoadNavigator from './LoadNavigator';
import DrawNavigator from './DrawNavigator';
import SearchNavigator from './SearchNavigator';

const MainNavigator = createStackNavigator(
  {
    Draw: DrawNavigator,
    Search: SearchNavigator,
  },
  {
    initialRouteName: 'Draw',
    headerMode: 'none',
  },
);

const AppNavigator = createSwitchNavigator(
  {
    Load: LoadNavigator,
    Main: MainNavigator,
  },
  {
    initialRouteName: 'Load',
  },
);

export default AppNavigator;
