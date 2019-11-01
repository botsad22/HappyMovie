import React, {Component} from 'react';
import {Header} from 'react-native-elements';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Icon} from 'native-base';
import colors from '../../config/colors';

export default class AdvertiseScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={colors.headerColor}
          containerStyle={styles.header_container}
          centerComponent={{text: 'Home', style: {color: '#fff'}}}
          leftComponent={
            <View style={styles.icon_container}>
              <Icon
                name="menu"
                style={styles.icon}
                onPress={() => this.props.navigation.openDrawer()}
              />
            </View>
          }
        />
        <Text style={styles.title}>Advertise Screen</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.subScreen,
  },
  header_container: {
    marginTop: Platform.OS === 'ios' ? 0 : -24,
  },
  icon_container: {
    width: 50,
  },
  icon: {
    color: '#fff',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
