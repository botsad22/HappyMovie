import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  Dimensions,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import ProgressScreen from '../ReferScreens/ProgressScreen';
import API from '../../config/api';
import colors from '../../config/colors';
import PlayIcon from 'react-native-vector-icons/Feather';
import StarIcon from 'react-native-vector-icons/Entypo';
import {
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from 'react-native-gesture-handler';
import ActionButton from 'react-native-action-button';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Toast, {DURATION} from 'react-native-easy-toast';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const screenWidth = Math.round(Dimensions.get('window').width);

let numberOfRefresh = 0;

export default class LatestTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      nextPage: '',
      start: true,
      end: false,
    };
  }

  async componentDidMount() {
    return fetch(API.latest)
      .then(response => response.json())
      .then(responseJson => {
        var empty = true;
        if (responseJson.items.collection.length > 0) {
          empty = false;
        }
        this.setState(
          {
            isLoading: false,
            isDownRefresh: false,
            isTopRefresh: false,
            dataSource: responseJson.items.collection,
            prevPage: responseJson.pagination.prev_page,
            nextPage: responseJson.pagination.next_page,
          },
          function() {},
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  fetchNextPage = () => {
    return fetch(this.state.nextPage + '&pp=15')
      .then(response => response.json())
      .then(responseJson => {
        if (
          responseJson.pagination.current_page >=
          responseJson.pagination.total_pages
        ) {
          this.setState({
            end: true,
          });
        }
        if (responseJson.pagination.current_page > 12) {
          this.setState({
            start: false,
          });
        } else {
          this.setState({
            start: true,
          });
        }
        var dataSource = [];
        var prevPage = this.state.prevPage;
        if (this.state.dataSource.length >= 36) {
          dataSource = responseJson.items.collection;
          prevPage = responseJson.pagination.prev_page;
          this.refs.toast.show('Refreshed with a new page...', 3500);
          new Promise(resolve =>
            setTimeout(() => {
              this.flatListRef.scrollToIndex({
                animated: true,
                index: 0,
                viewOffset: 0,
                viewPosition: 0,
              });
            }, 1000),
          );
        } else {
          dataSource = this.state.dataSource.concat(
            responseJson.items.collection,
          );
        }
        this.setState({
          isLoading: false,
          isDownRefresh: false,
          isTopRefresh: false,
          dataSource: dataSource,
          prevPage: prevPage,
          nextPage: responseJson.pagination.next_page,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  fetchPrevPage = () => {
    if (this.state.start) {
      this.setState({isTopRefresh: false});
      return;
    }
    return fetch(this.state.prevPage + '&pp=12')
      .then(response => response.json())
      .then(responseJson => {
        if (
          responseJson.pagination.current_page <
          responseJson.pagination.total_pages
        ) {
          this.setState({
            end: false,
          });
        } else {
          this.setState({
            end: true,
          });
        }
        if (responseJson.pagination.current_page > 2) {
          this.setState({
            start: false,
          });
        } else {
          this.setState({
            start: true,
          });
        }
        this.refs.toast.show('Refreshed with a previous page...', 3500);
        this.setState({
          isLoading: false,
          isFetch: false,
          isTopRefresh: false,
          dataSource: responseJson.items.collection,
          prevPage: responseJson.pagination.prev_page,
          nextPage: responseJson.pagination.next_page,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleDownRefresh = () => {
    this.setState(
      {
        isDownRefresh: true,
      },
      () => {
        if (++numberOfRefresh > 1) {
          this.fetchNextPage();
          numberOfRefresh = 0;
        }
      },
    );
  };

  handleTopRefresh = () => {
    this.setState(
      {
        isTopRefresh: true,
      },
      () => {
        this.fetchPrevPage();
      },
    );
  };

  renderFooter = () => {
    if (!this.state.isDownRefresh) return null;
    return <ActivityIndicator size="large" style={{color: '#ffffff'}} />;
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  render() {
    if (this.state.isLoading) return <ProgressScreen />;
    // movie list screen
    return (
      <View style={styles.container}>
        <Toast
          ref="toast"
          style={{backgroundColor: '#fff'}}
          position="top"
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{color: 'black', fontSize: 20}}
        />
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          numColumns={2}
          data={this.state.dataSource}
          extraData={this.state.dataSource}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.movieItem}
              onPress={() => {
                global.slug = item.slug;
                this.props.navigate('PlayScreen');
              }}>
              <ImageBackground
                style={styles.ImageBk}
                resizeMode={'cover'}
                source={{uri: API.base_filter_img_latest + item.poster}}>
                <PlayIcon
                  name="play-circle"
                  color="rgba(255,255,255,0.7)"
                  size={35}
                />
                <View style={styles.rating}>
                  <StarIcon name="star" color="#cccc00" size={12} />
                  <Text style={styles.ibmd_rating}>{item.imdb_rating}</Text>
                  <Text style={styles.flag_quality}>/{item.flag_quality}</Text>
                </View>
                <View style={styles.year}>
                  <Text style={styles.year_dsc}>{item.year}</Text>
                </View>
              </ImageBackground>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => {
            return item.id_movie;
          }}
          refreshing={this.state.isTopRefresh}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter.bind(this)}
          onEndReachedThreshold={0.4}
          onEndReached={this.handleDownRefresh.bind(this)}
          onRefresh={this.handleTopRefresh.bind(this)}
          ref={ref => {
            this.flatListRef = ref;
          }}
        />
        {/* <ActionButton 
            buttonColor="rgba(231,76,60,0.8)"
            shadowStyle={{
              shadowColor:'717a83', 
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.8,
              shadowRadius: 2}}
             onPress={() => this.setState({isFetch: true})}/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.subScreen,
  },
  ImageBk: {
    width: screenWidth / 2 - 10,
    height: ((screenWidth / 2 - 10) * 424) / 300,

    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    padding: 10,
    color: '#9f9f9f',
    fontSize: 10,
  },
  movieItem: {
    flex: 1,
    width: screenWidth / 2 - 10,
    backgroundColor: colors.movieItem,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 3,
    marginRight: 3,
    shadowColor: '#717a83',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    justifyContent: 'space-around',
  },
  picker: {
    margin: 5,
  },
  rating: {
    flexDirection: 'row',
    flex: 1,
    position: 'absolute',
    padding: 2,
    left: 1,
    top: 1,
    backgroundColor: 'rgba(16, 33, 51, 0.9)',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 3,
  },
  ibmd_rating: {
    color: '#ffffff',
    fontSize: 13,
  },
  flag_quality: {
    color: '#9f9f9f',
    fontSize: 10,
  },
  year: {
    flexDirection: 'row',
    flex: 1,
    position: 'absolute',
    padding: 2,
    right: 1,
    bottom: 1,
    backgroundColor: 'rgba(16, 33, 51, 0.9)',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 3,
  },
  year_dsc: {
    color: '#9f9f9f',
    fontSize: 10,
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
});
