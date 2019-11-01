/**
 * React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import {createStackNavigator} from 'react-navigation-stack';
import ForumScreen from '../Screen/SlideMenuScreens/ForumScreen';

const ForumNavigator = createStackNavigator(
  {
    Forum: ForumScreen,
  },
  {
    initialRouteName: 'Forum',
    headerMode: 'none',
  },
);

export default ForumNavigator;
