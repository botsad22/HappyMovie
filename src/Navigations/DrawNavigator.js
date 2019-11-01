/**
 * React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';
import {Icon} from 'native-base';
import Logo from '../widgets/Logo';

import colors from '../config/colors';
import BottomTabsNavigator from './BottomTabNavigator';
import AdvertiseNavigator from './AdvertiseNavigator';
import AffiliateNavigator from './AffiliateNavigator';
import ForumNaviagator from './ForumNavigator';

const {width} = Dimensions.get('window');

const CustomDrawerNavigation = props => {
  return (
    <SafeAreaView style={style.sidebarContainer}>
      <StatusBar
        backgroundColor={colors.headerColor}
        barStyle="light-content"
      />
      <View style={style.headerContainer}>
        <View style={style.headerImageContainer}>
          <Image
            source={require('../assets/menuTitle.png')}
            style={style.headerImage}
          />
        </View>
      </View>
      <ScrollView>
        <DrawerNavigatorItems {...props} />
      </ScrollView>
    </SafeAreaView>
  );
};

const Drawer = createDrawerNavigator(
  {
    Home: {
      screen: BottomTabsNavigator,
      navigationOptions: {
        title: <Logo />,
        drawerIcon: ({tintColor}) => (
          <Icon name="home" style={getColorSheet(tintColor).icon} />
        ),
      },
    },
    Forum: {
      screen: ForumNaviagator,
      navigationOptions: {
        title: 'Forum',
        drawerIcon: ({tintColor}) => (
          <Icon name="arrow-dropright" style={getColorSheet(tintColor).icon} />
        ),
      },
    },
    Affiliate: {
      screen: AffiliateNavigator,
      navigationOptions: {
        title: 'Affiliate',
        drawerIcon: ({tintColor}) => (
          <Icon name="arrow-dropright" style={getColorSheet(tintColor).icon} />
        ),
      },
    },
    Advertise: {
      screen: AdvertiseNavigator,
      navigationOptions: {
        title: 'Advertise',
        drawerIcon: ({tintColor}) => (
          <Icon name="arrow-dropright" style={getColorSheet(tintColor).icon} />
        ),
      },
    },
  },
  {
    initialRoutName: BottomTabsNavigator,
    navigationOptions: {
      gesturesEnabled: false,
    },
    drawerPosition: 'left',
    contentComponent: CustomDrawerNavigation,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerWidth: (width / 3) * 2,
  },
);

const getColorSheet = tintColor => {
  return StyleSheet.create({
    icon: {
      fontSize: 24,
      color: tintColor,
    },
  });
};

const style = StyleSheet.create({
  sidebarContainer: {
    flex: 1,
    backgroundColor: colors.navBarColor,
  },
  headerContainer: {
    height: 150,
    opacity: 0.9,
  },
  headerImageContainer: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    height: 150,
    width: (width / 3) * 2,
  },
  headerEmailContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    alignItems: 'center',
    bottom: 20,
  },
});

export default Drawer;
