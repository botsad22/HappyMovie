import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {connect} from 'react-redux';

import API from '../../config/api';
import colors from '../../config/colors';

import {get_treding} from '../../redux/actions/CallApiAction';

const load_step = 0.2;

class Load extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      indeterminate: false,
    };
  }

  componentDidMount() {
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    let progress = this.state.progress;
    const dispatch = this.props.dispatch;
    await dispatch(get_treding(API.trending));
    this.setState({progress: progress + load_step});
    this.setState({progressrr: 1}, () => {
      this.props.navigation.navigate('Draw');
    });
  };

  render() {
    const {progress, indeterminate} = this.state;
    return (
      <View style={styles.container}>
        <Progress.Bar
          style={styles.progress}
          progress={progress}
          indeterminate={indeterminate}
        />
      </View>
    );
  }
}

Load.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.subScreen,
  },
  progress: {
    color: colors.progress,
  },
});

export default connect()(Load);
