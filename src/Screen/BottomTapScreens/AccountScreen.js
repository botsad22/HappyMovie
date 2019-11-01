import React, {Component} from 'react';
import {StyleSheet, View, Button, Dimensions} from 'react-native';
import {Container, Item, Icon, Input, Content} from 'native-base';

import colors from '../../config/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

import MenuHeader from '../Headers/MenuHeader';

const screenWidth = Math.round(Dimensions.get('window').width);

export default class AccountScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      passowrd: null,
    };
  }

  render() {
    return (
      <Container>
        <MenuHeader {...this.props} />
        <Content style={styles.container}>
          <Item>
            <Icon
              type="FontAwesome"
              name="envelope"
              style={{fontSize: 20, color: 'white'}}
            />
            <Input
              placeholder="Email"
              keyboardType="email-address"
              value={this.state.email}
              onChangeText={email => this.setState({email})}
            />
          </Item>
          <Item style={styles.field}>
            <Icon
              type="FontAwesome"
              name="key"
              style={{fontSize: 20, color: 'white'}}
            />
            <Input
              placeholder="Password"
              secureTextEntry={true}
              keyboardType="default"
              onChangeText={passowrd => this.setState({passowrd})}
            />
          </Item>
        </Content>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={this.fetchAPI}
            style={{width: screenWidth}}>
            <Button
              title="LOGIN"
              color={colors.orange}
              accessibilityLabel="Filter movies"
            />
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: colors.subScreen,
  },
  content: {
    // not cool but good enough to make all inputs visible when keyboard is active
    paddingBottom: 300,
  },
  card1: {
    paddingVertical: 16,
  },
  card2: {
    padding: 16,
  },
  input: {
    marginTop: 4,
  },
  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  buttons: {
    flexDirection: 'row',
    flex: 1,
    position: 'absolute',
    bottom: 0,
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  email: {
    marginTop: 20,
  },
});
