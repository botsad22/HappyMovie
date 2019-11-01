/**
 * React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import {createStackNavigator} from 'react-navigation-stack';
import AffiliateScreen from '../Screen/SlideMenuScreens/AffiliateScreen';

const AffiliateNavigator = createStackNavigator(
  {
    Affiliate: AffiliateScreen,
  },
  {
    initialRouteName: 'Affiliate',
    headerMode: 'none',
  },
);

export default AffiliateNavigator;
