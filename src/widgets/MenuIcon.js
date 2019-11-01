import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon} from 'native-base';

export default class MenuIcon extends Component {
  render() {
    return (
      <View>
        <Icon
          name="menu"
          style={styles.icon}
          onPress={() => this.props.navigation.openDrawer()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    color: '#fff',
  },
});
