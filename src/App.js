/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {YellowBox} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {connect} from 'react-redux';

import AppNavigator from './Navigations/index';
import {Root} from 'native-base';

YellowBox.ignoreWarnings(['RCTRootView cancelTouches']);

const AppContainer = createAppContainer(AppNavigator);

class App extends Component {
  render() {
    return (
      <Root>
        <AppContainer />
      </Root>
    );
  }
}

export default connect()(App);
