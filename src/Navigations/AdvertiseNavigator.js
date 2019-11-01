/**
 * React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import {createStackNavigator} from 'react-navigation-stack';
import AdvertiseScreen from '../Screen/SlideMenuScreens/AdvertiseScreen';

const AdvertiseNavigator = createStackNavigator(
  {
    Advertise: AdvertiseScreen,
  },
  {
    initialRouteName: 'Advertise',
    headerMode: 'none',
  },
);

export default AdvertiseNavigator;
