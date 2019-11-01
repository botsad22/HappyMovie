import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon} from 'native-base';

export default class BackIcon extends Component {
  render() {
    return (
      <View>
        <Icon
          name="arrow-back"
          style={styles.icon}
          onPress={() => this.props.navigation.pop()}
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
