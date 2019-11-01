import React, {Component} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import colors from '../../config/colors';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import {Header} from 'react-native-elements';
import {Icon, Container} from 'native-base';

import LatestTab from '../TVSubScreens/LatestTab';
import TrendingTab from '../TVSubScreens/TrendingTab';
import CategoriesTab from '../TVSubScreens/CategoriesTab';
import FilterTab from '../TVSubScreens/FilterTab';

import MenuHeader from '../Headers/MenuHeader';

export default class TVScreen extends Component {
  render() {
    return (
      <Container>
        <MenuHeader {...this.props} />
        <ScrollableTabView
          tabBarBackgroundColor={colors.navigation}
          tabBarUnderlineStyle={{backgroundColor: colors.headerColor}}
          tabBarActiveTextColor={colors.headerColor}
          locked={true}
          scrollWithoutAnimation={false}
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar />}>
          <LatestTab
            tabLabel="LATEST"
            navigate={this.props.navigation.navigate}
          />
          <TrendingTab
            tabLabel="TRENDING"
            navigate={this.props.navigation.navigate}
          />
          <CategoriesTab
            tabLabel="GATEGORIES"
            navigate={this.props.navigation.navigate}
          />
          <FilterTab
            tabLabel="FILTER"
            navigate={this.props.navigation.navigate}
          />
        </ScrollableTabView>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
