/**
 * React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import {createSwitchNavigator} from 'react-navigation';
import LoadScreen from '../Screen/ReferScreens/Load';

const LoadNavigator = createSwitchNavigator(
  {
    Load: LoadScreen,
  },
  {
    initialRouteName: 'Load',
    headerMode: 'none',
  },
);

export default LoadNavigator;
