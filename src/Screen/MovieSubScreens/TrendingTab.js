import React, {Component, PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PlayIcon from 'react-native-vector-icons/Feather';
import StarIcon from 'react-native-vector-icons/Entypo';

import ProgressScreen from '../ReferScreens/ProgressScreen';
import API from '../../config/api';
import colors from '../../config/colors';

import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {get_next_treding} from '../../redux/actions/CallApiAction';

const screenWidth = Math.round(Dimensions.get('window').width);

class RenderItem extends PureComponent {
  render() {
    const {item} = this.props.item_data;
    return (
      <TouchableOpacity
        style={styles.movieItem}
        onPress={() => {
          global.slug = item.slug;
          this.props.navigate('PlayScreen');
        }}>
        <ImageBackground
          style={styles.ImageBk}
          resizeMode={'cover'}
          source={{uri: API.base_filter_img + item.poster}}>
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
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  }
}

class TrendingTab extends Component {
  constructor(props) {
    super(props);

    const treding_data = this.props.treding_data;

    this.state = {
      isLoading: false,
      isFetch: false,
      isEmpty: false,
      isTopRefresh: false,
      dataSliderSource: treding_data.featured_items.collection,
      dataSource: treding_data.items.collection,
      prevPage: treding_data.pagination.prev_page,
      nextPage: treding_data.pagination.next_page,
      start: true,
      end: false,
    };
  }

  back = () => {
    this.setState({isLoading: true, isFetch: false});
    return new Promise(resolve =>
      setTimeout(() => {
        this.setState({isLoading: false});
      }, 2000),
    );
  };

  fetchNextPage = async () => {
    const dispatch = this.props.dispatch;
    await dispatch(get_next_treding());
    this.setState({isDownRefresh: false, isTopRefresh: false});
  };

  handleDownRefresh = () => {
    this.setState({isDownRefresh: true}, () => {
      this.fetchNextPage();
    });
  };

  handleTopRefresh = () => {
    this.setState({isTopRefresh: true}, () => {
      this.fetchNextPage();
    });
  };

  renderHeader = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    return (
      <View style={{width: screenWidth, height: 450}}>
        <Swiper
          showsButtons={false}
          autoplay={true}
          dotColor={colors.navBarColor}
          activeDotColor={colors.textColor01}>
          {this.state.dataSliderSource.map((mv, index) => {
            return (
              <View key={index} style={styles.MovieItem}>
                <Text style={styles.header}>{mv.title}</Text>
                <ImageBackground
                  style={styles.ImageBk_Header}
                  resizeMode={'cover'}
                  source={{uri: API.base_home_img + mv.backdrop}}>
                  <TouchableOpacity
                    onPress={() => {
                      global.slug = mv.slug;
                      this.props.navigate('PlayScreen');
                    }}>
                    <PlayIcon
                      name="play-circle"
                      color="rgba(255,255,255,0.8)"
                      size={60}
                    />
                  </TouchableOpacity>
                  <View style={styles.rating_h}>
                    <StarIcon name="star" color="#cccc00" size={14} />
                    <Text style={styles.ibmd_rating_h}>{mv.imdb_rating}</Text>
                    <Text style={styles.flag_quality_h}>
                      /{mv.flag_quality}
                    </Text>
                  </View>
                  <View style={styles.year_h}>
                    <Text style={styles.year_dsc_h}>{mv.year}</Text>
                  </View>
                  <View style={styles.genres_h}>
                    <Text style={styles.year_dsc_h}>{mv.genres}</Text>
                  </View>
                </ImageBackground>
                <Text style={styles.description} numberOfLines={2}>
                  {mv.description}
                </Text>
                <TouchableOpacity style={styles.watchMovie}>
                  <Text style={styles.watchMovieItem}>Watch now</Text>
                  <Icon
                    name="chevron-right"
                    size={50}
                    style={styles.watchMovieItem}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </Swiper>
      </View>
    );
  };

  renderFooter = () => {
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
    //process screen
    if (this.state.isLoading) return <ProgressScreen />;
    // movie list screen
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          numColumns={3}
          data={this.state.dataSource}
          extraData={this.state.dataSource}
          renderItem={(item, index) => (
            <RenderItem key={index} item_data={item} />
          )}
          keyExtractor={(item, index) => {
            return index;
          }}
          refreshing={this.state.isTopRefresh}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader.bind(this)}
          ListFooterComponent={this.renderFooter.bind(this)}
          onEndReachedThreshold={0.5}
          onEndReached={this.handleDownRefresh.bind(this)}
          onRefresh={this.handleTopRefresh.bind(this)}
          ref={ref => {
            this.flatListRef = ref;
          }}
        />
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
    width: screenWidth / 3 - 10,
    height: ((screenWidth / 3 - 10) * 424) / 300,

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
    width: screenWidth / 3 - 10,
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
  },
  rating_h: {
    flexDirection: 'row',
    flex: 1,
    position: 'absolute',
    padding: 2,
    left: 0,
    top: 0,
    backgroundColor: 'rgba(16, 33, 51, 0.9)',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ibmd_rating_h: {
    color: '#ffffff',
    fontSize: 20,
  },
  flag_quality_h: {
    color: '#9f9f9f',
    fontSize: 18,
  },
  year_h: {
    flexDirection: 'row',
    flex: 1,
    position: 'absolute',
    padding: 2,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(16, 33, 51, 0.9)',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  genres_h: {
    flexDirection: 'row',
    flex: 1,
    position: 'absolute',
    padding: 2,
    right: 0,
    top: 0,
    backgroundColor: 'rgba(16, 33, 51, 0.9)',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  year_dsc: {
    color: '#9f9f9f',
    fontSize: 10,
  },
  year_dsc_h: {
    color: '#9f9f9f',
    fontSize: 15,
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
  wrapper: {
    height: 50,
    backgroundColor: 'white',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  MovieItem: {
    flex: 1,
    backgroundColor: colors.movieItem,
    marginBottom: 20,
    shadowColor: '#717a83',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  ImageBk_Header: {
    width: screenWidth,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 10,
    color: '#4280bf',
    fontSize: 20,
  },
  description: {
    padding: 10,
    color: '#9e9e9e',
    fontSize: 16,
  },
  watchMovie: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#616161',
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  watchMovieItem: {
    paddingBottom: 18,
    paddingTop: 18,
    paddingRight: 10,
    paddingLeft: 10,
    color: 'rgba(231,76,60,0.8)',
    fontSize: 13,
  },
});

const mapStatetoProps = ({movie: {treding_data}}) => ({
  treding_data,
});

export default connect(mapStatetoProps)(TrendingTab);
