import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
  Platform,
} from 'react-native';
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../config/colors';

export default class YoutubePlayScreen extends React.Component {
  state = {
    isReady: false,
    status: null,
    quality: null,
    error: null,
    isPlaying: true,
    isLooping: true,
    duration: 0,
    currentTime: 0,
    fullscreen: false,
    containerMounted: false,
    containerWidth: null,
  };

  render() {
    return (
      <View
        style={styles.container}
        onLayout={({ nativeEvent: { layout: { width } } }) => {
          if (!this.state.containerMounted) this.setState({ containerMounted: true });
          if (this.state.containerWidth !== width) this.setState({ containerWidth: width });
        }}
      >
        {this.state.containerMounted && (
          <YouTube
            ref={component => {
              this._youTubeRef = component;
            }}
            apiKey="AIzaSyCaYPGxQfJf-KRJ-PzsgXNCejIm0W2qNgc"
            videoId={global.youtubeId}
            play={this.state.isPlaying}
            loop={this.state.isLooping}
            fullscreen={this.state.fullscreen}
            controls={1}
            style={[
              { height: PixelRatio.roundToNearestPixel(this.state.containerWidth / (16 / 9)) },
              styles.player,
            ]}
            onError={e => this.setState({ error: e.error })}
            onReady={e => this.setState({ isReady: true })}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeQuality={e => this.setState({ quality: e.quality })}
            onChangeFullscreen={e => this.setState({ fullscreen: e.isFullscreen })}
            onProgress={e => this.setState({ duration: e.duration, currentTime: e.currentTime })}
          />
        )}

        {/* Playing / Looping */}
        <View style={styles.buttonGroup}>
            <TouchableOpacity
                style={[styles.button, {marginRight: 30}]}
                onPress={() => this.setState(s => ({ isPlaying: !s.isPlaying }))}
            >
                <Icon name= {this.state.status == 'playing' ? 'pause' : 'play'} size={40} style={styles.buttonText}/>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, {marginRight: 10}]}
                onPress={() => this.setState(s => ({ isLooping: !s.isLooping }))}
            >
                <Icon name= {this.state.isLooping ? 'loop' : 'arrow-collapse-right'} size={20} style={styles.buttonText}/>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button}
            onPress={() => this._youTubeRef && this._youTubeRef.previousVideo()}
            >
                <Icon name= 'skip-previous' size={25} style={styles.buttonText}/>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => this._youTubeRef && this._youTubeRef.nextVideo()}
            >
                <Icon name= 'skip-next' size={25} style={styles.buttonText}/>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, {marginLeft: 30}]}
                onPress={() => this.setState({ fullscreen: true })}
                >
              <Icon name= 'fullscreen' size={20} style={styles.buttonText}/>
            </TouchableOpacity>
        </View>

        {/* Go To Specific time in played video with seekTo() */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this._youTubeRef && this._youTubeRef.seekTo(15)}
          >
            <Text style={styles.buttonText}>15 Seconds</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this._youTubeRef && this._youTubeRef.seekTo(2 * 60)}
          >
            <Text style={styles.buttonText}>2 Minutes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this._youTubeRef && this._youTubeRef.seekTo(15 * 60)}
          >
            <Text style={styles.buttonText}>15 Minutes</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.dsc}>
            <Text style={styles.title}>{global.youtubeTitle}</Text>
            <ScrollView>
                <Text style={styles.item_description}>{global.youtubeDesc}</Text>
            </ScrollView>                        
        </ScrollView> 

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.subScreen,
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#ffff',
  },
  buttonTextSmall: {
    fontSize: 15,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },

  dsc: {
    marginTop: 20,
    padding: 16,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0
  },
  title: {
    color: 'rgba(255, 8, 120, 0.6)',
    fontSize: 20,
    marginBottom: 15
  },
  item_description: {
    color: '#7f7f7f',
    fontSize: 15
  },
});