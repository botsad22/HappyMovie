import React, {Component} from 'react';

import {View, Image} from 'react-native';

export default class Logo extends Component {
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <Image
          source={require('../assets/logo.png')}
          style={{
            marginTop: 10,
            alignSelf: 'center',
            height: 40,
            flex: 1,
          }}
        />
      </View>
    );
  }
}
