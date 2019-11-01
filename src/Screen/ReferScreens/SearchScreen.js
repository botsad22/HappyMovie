import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  FlatList,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import colors from '../../config/colors';
import API from '../../config/api';
import StarIcon from 'react-native-vector-icons/Entypo';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import BackHeaderNoSearch from '../Headers/BackHeaderNoSearch';
import {Content, Container} from 'native-base';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const screenWidth = Math.round(Dimensions.get('window').width);

export default class SearchScreen extends Component {
  state = {
    search: '',
    empty: true,
    isLoading: false,
    movie_dataSource: [],
    show_dataSource: [],
  };

  fetchAPI = () => {
    const search = this.state.search;
    if (search < 1) {
      return;
    }
    this.setState({isLoading: true});
    return fetch(API.movie_search + this.state.search)
      .then(response => response.json())
      .then(responseJson => {
        const movie_dataSource = [];
        for (i = 0; i < 3; i++) {
          if (responseJson.items.collection.length > i)
            movie_dataSource.push(responseJson.items.collection[i]);
        }
        this.setState(
          {
            movie_dataSource: movie_dataSource,
            movie_total: responseJson.items.total,
          },
          function() {
            return fetch(API.show_search + this.state.search)
              .then(response => response.json())
              .then(responseJson => {
                const show_dataSource = [];
                for (i = 0; i < 3; i++) {
                  if (responseJson.items.collection.length > i)
                    show_dataSource.push(responseJson.items.collection[i]);
                }
                this.setState({
                  show_dataSource: show_dataSource,
                  show_total: responseJson.items.total,
                  empty: false,
                });
              })
              .catch(error => {
                console.error(error);
              });
          },
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  updateSearch = search => {
    console.log(search);
    this.setState({search}, () => {
      if (search.length > 1) this.fetchAPI();
    });
  };
  render() {
    const {search} = this.state;
    return (
      <ScrollView style={styles.container}>
        <BackHeaderNoSearch {...this.props} />
        <SearchBar
          containerStyle={{
            backgroundColor:
              Platform.OS === 'ios'
                ? colors.contentColor
                : colors.searchContainColor,
          }}
          platform={Platform.OS === 'ios' ? 'ios' : 'android'}
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />
        <Content>
          <TouchableOpacity
            onPress={() => {
              global.searchKey = this.state.search;
              global.navigation.navigate('MovieSearch');
            }}>
            {this.state.movie_total != '0' && (
              <Text style={styles.total}>
                MOVIES ( {this.state.movie_total} ) VIEW ALL
              </Text>
            )}
          </TouchableOpacity>
          <FlatList
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            numColumns={1}
            data={this.state.movie_dataSource}
            extraData={this.state.movie_dataSource}
            renderItem={({item}) => (
              <View style={styles.movieItem}>
                <TouchableOpacity
                  onPress={() => {
                    global.slug = item.slug;
                    global.navigation.navigate('PlayScreen');
                  }}>
                  <ImageBackground
                    style={styles.ImageBk}
                    resizeMode={'cover'}
                    source={{
                      uri: API.base_filter_img + item.poster,
                    }}></ImageBackground>
                </TouchableOpacity>
                <View style={styles.dsc}>
                  <Text style={styles.title}>
                    {item.title} ({item.year})
                  </Text>
                  <View style={styles.rating}>
                    <StarIcon name="star" color="#cccc00" size={12} />
                    <Text style={styles.ibmd_rating}>{item.imdb_rating}</Text>
                    <Text style={styles.flag_quality}>
                      /{item.flag_quality}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={item => {
              return item.id_show;
            }}
          />
          <TouchableOpacity
            onPress={() => {
              global.searchKey = this.state.search;
              global.navigation.navigate('ShowSearch');
            }}>
            {this.state.show_total != '0' && (
              <Text style={styles.total}>
                SHOWS ( {this.state.show_total} ) VIEW ALL
              </Text>
            )}
          </TouchableOpacity>
        </Content>
        <Content>
          <FlatList
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            numColumns={1}
            data={this.state.show_dataSource}
            extraData={this.state.show_dataSource}
            renderItem={({item}) => (
              <View style={styles.movieItem}>
                <TouchableOpacity
                  onPress={() => {
                    global.slug = item.slug;
                    global.navigation.navigate('TvShowScreen');
                  }}>
                  <ImageBackground
                    style={styles.ImageBk}
                    resizeMode={'cover'}
                    source={{
                      uri: API.base_filter_img + item.poster,
                    }}></ImageBackground>
                </TouchableOpacity>
                <View style={styles.dsc}>
                  <Text style={styles.title}>
                    {item.title} ({item.year})
                  </Text>
                  <View style={styles.rating}>
                    <StarIcon name="star" color="#cccc00" size={12} />
                    <Text style={styles.ibmd_rating}>{item.imdb_rating}</Text>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={item => {
              return item.id_show;
            }}
          />
        </Content>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.contentColor,
  },
  total: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    padding: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  ImageBk: {
    width: screenWidth / 4,
    height: ((screenWidth / 4 - 10) * 424) / 300,

    justifyContent: 'center',
    alignItems: 'center',
  },
  dsc: {
    width: (screenWidth * 3) / 4,
    padding: 16,
  },
  title: {
    color: '#4280bf',
    fontSize: 17,
  },
  movieItem: {
    flexDirection: 'row',
    width: screenWidth,
    height: ((screenWidth / 4 - 10) * 424) / 300,
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

    justifyContent: 'space-between',
  },
  rating: {
    marginTop: 5,
    flexDirection: 'row',
    width: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ibmd_rating: {
    color: '#ffffff',
    fontSize: 15,
  },
  flag_quality: {
    color: '#9f9f9f',
    fontSize: 12,
  },
});
