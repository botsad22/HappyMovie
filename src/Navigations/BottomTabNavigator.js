import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import MovieScreen from '../Screen/BottomTapScreens/MovieScreen';
import TVScreen from '../Screen/BottomTapScreens/TVScreen';
import AccountScreen from '../Screen/BottomTapScreens/AccountScreen';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/Entypo';

const MovieTab = createStackNavigator(
  {
    Movie: MovieScreen,
  },
  {headerMode: 'none'},
);

const TVTab = createStackNavigator(
  {
    TV: TVScreen,
  },
  {headerMode: 'none'},
);

const AccountTab = createStackNavigator(
  {
    Account: AccountScreen,
  },
  {headerMode: 'none'},
);

const TabBarComponent = props => <BottomTabBar {...props} />;

const TabScreens = createBottomTabNavigator(
  {
    Movie: MovieTab,
    TV: TVTab,
    Account: AccountTab,
  },
  {
    tabBarComponent: props => <TabBarComponent {...props} />,
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({tintColor}) => {
        const {routeName} = navigation.state;
        let tabName;
        switch (routeName) {
          case 'Movie':
            tabName = 'video';
            break;
          case 'TV':
            tabName = 'tv';
            break;
          default:
            tabName = 'user';
        }

        return <Icon name={tabName} color={tintColor} size={20} />;
      },
      tabBarOptions: {
        activeTintColor: colors.activeTextColor01,
        inactiveTintColor: colors.textColor00,
        style: {
          backgroundColor: colors.tabColor,
        },
      },
    }),
  },
);

export default TabScreens;
