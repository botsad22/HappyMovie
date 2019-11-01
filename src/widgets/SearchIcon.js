import React, {Component} from 'react';
import {withNavigation} from 'react-navigation';
import {View, StyleSheet} from 'react-native';
import {Icon} from 'native-base';

class SearchIcon extends Component {
  state = {
    dialogVisible: false,
  };

  showDialog = () => {
    this.setState({dialogVisible: true});
  };

  handleCancel = () => {
    this.setState({dialogVisible: false});
  };

  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({dialogVisible: false});
  };

  render() {
    return (
      <View>
        <Icon
          name="search"
          style={styles.icon}
          onPress={() => this.props.navigation.navigate('Search')}
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

export default withNavigation(SearchIcon);
