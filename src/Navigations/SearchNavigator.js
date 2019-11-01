/**
 * React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import {createSwitchNavigator} from 'react-navigation';
import SearchScreen from '../Screen/ReferScreens/SearchScreen';

const SearchNavigator = createSwitchNavigator(
  {
    Search: SearchScreen,
  },
  {
    initialRouteName: 'Search',
    headerMode: 'none',
  },
);

export default SearchNavigator;
