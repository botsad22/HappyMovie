import React from 'react';
import { ImageBackground, Image, StatusBar} from 'react-native';
import colors from '../../config/colors'

export default class SplashScreen extends React.Component {
  render() {
    return (
      <ImageBackground 
        source={require('../../../resources/img/splash.png')}
        style={styles.viewStyles}>
        <StatusBar
                barStyle='light-content'
                backgroundColor={colors.headerColor}
            />
        <Image 
          style={styles.textStyles}
          source={require('../../../resources/img/logo.png')}
          />
      </ImageBackground>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ImageStyles: {
    height: 65
  }
}