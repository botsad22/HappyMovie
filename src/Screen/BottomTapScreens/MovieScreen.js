import React, {Component} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import colors from '../../config/colors';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import {Header} from 'react-native-elements';
import {Icon, Container} from 'native-base';

import FilterTab from '../MovieSubScreens/FilterTab';
import CategoriesTab from '../MovieSubScreens/CategoriesTab';
import GenresTab from '../MovieSubScreens/GenresTab';
import LatestTab from '../MovieSubScreens/LatestTab';
import TrendingTab from '../MovieSubScreens/TrendingTab';
import MenuHeader from '../Headers/MenuHeader';

export default class MovieScreen extends Component {
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
          <TrendingTab
            tabLabel="TRENDING"
            navigate={this.props.navigation.navigate}
          />
          <LatestTab
            tabLabel="LATEST"
            navigate={this.props.navigation.navigate}
          />
          <CategoriesTab
            tabLabel="CATEGORIES"
            navigate={this.props.navigation.navigate}
          />
          <GenresTab
            tabLabel="GENRES"
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
    backgroundColor: 'green',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
