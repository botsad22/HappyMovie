import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, ImageBackground, Dimensions, Button, Alert, ActivityIndicator} from 'react-native';
import ProgressScreen from '../ReferScreens/ProgressScreen'
import API from '../../config/api';
import colors from '../../config/colors';
import PlayIcon from 'react-native-vector-icons/Feather';
import StarIcon from 'react-native-vector-icons/Entypo';
import { TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native-gesture-handler';
import ActionButton from 'react-native-action-button';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Toast, {DURATION} from 'react-native-easy-toast'

const instructions = Platform.select({
 ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
 android:
   'Double tap R on your keyboard to reload,\n' +
   'Shake or press menu button for dev menu',
});

const screenWidth = Math.round(Dimensions.get('window').width);

const months = {"01":"January", "02":"February", "03":"March", "04":"April", "05":"May", "06":"June", 
"07":"July", "08":"August", "09":"September", "10":"October", "11":"November", "12":"December"}

let numberOfRefresh = 0;

export default class LatestTab extends Component {

  constructor(props) {
    super(props);
    
    this.state = { 
      isLoading: true,
      nextPage: "",
      start: true,
      end: false
     }
  }

  async componentDidMount() {
    return fetch(API.tv_latest)
      .then((response) => response.json())
      .then((responseJson) => {
        var empty = true;
        if (responseJson.items.collection.length > 0){
          empty = false;
        }
        this.setState({
          isLoading: false,
          isDownRefresh: false,
          isTopRefresh: false,
          dataSource: responseJson.items.collection,
          prevPage: responseJson.pagination.prev_page,
          nextPage: responseJson.pagination.next_page
        }, function(){
          
        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  fetchNextPage = () => {
    return fetch(this.state.nextPage + "&pp=15")
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.pagination.current_page >= responseJson.pagination.total_pages){
        this.setState({
          end: true
        })   
      }
      if (responseJson.pagination.current_page > 2){
        this.setState({
          start: false
        })   
      } else{
        this.setState({
          start: true
        })
      }
      var dataSource = [];
      var prevPage = this.state.prevPage;
      if (this.state.dataSource.length >= 45){
        dataSource = responseJson.items.collection;
        prevPage = responseJson.pagination.prev_page;
        this.refs.toast.show('Refreshed with a new page...', 3500);
        new Promise((resolve) => 
          setTimeout(
            () => {
              this.flatListRef.scrollToIndex({animated: true, index: 0, viewOffset: 0, viewPosition: 0})
            },
            1000
          )
        );
      } else {
        dataSource = this.state.dataSource.concat(responseJson.items.collection)
      }
      this.setState({
        isLoading: false,
        isDownRefresh: false,
        isTopRefresh: false,
        dataSource: dataSource,
        prevPage: prevPage,
        nextPage: responseJson.pagination.next_page
      });

    })
    .catch((error) =>{
      console.error(error);
    });
  }

  fetchPrevPage = () => {
    if (this.state.start){
      this.setState({isTopRefresh: false});
      return;
    }
    return fetch(this.state.prevPage + "&pp=15")
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.pagination.current_page < responseJson.pagination.total_pages){
        this.setState({
          end: false
        })   
      }else{
        this.setState({
          end: true
        })  
      }
      if (responseJson.pagination.current_page > 2){
        this.setState({
          start: false
        })   
      } else{
        this.setState({
          start: true
        })
      }
      this.refs.toast.show('Refreshed with a previous page...', 3500);
      this.setState({
        isLoading: false,
        isFetch: false,
        isTopRefresh: false,
        dataSource: responseJson.items.collection,
        prevPage: responseJson.pagination.prev_page,
        nextPage: responseJson.pagination.next_page
      });
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  handleDownRefresh =() => {
    this.setState({
      isDownRefresh: true
    }, () => {
      if (++numberOfRefresh > 1){
        this.fetchNextPage();
        numberOfRefresh = 0
      }
    })   
  }

  handleTopRefresh =() => {
    this.setState({
      isTopRefresh: true
    }, () => {
      this.fetchPrevPage();
    })    
  }

  renderFooter = () => {
    if (!this.state.isDownRefresh) return null;
     return (
       <ActivityIndicator
          size="large"
         style={{ color: '#ffffff'}}
       />
     );
   };

   renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#CED0CE'
        }}
      />
    );
  };

  render() {
    if(this.state.isLoading)
      return <ProgressScreen/>
    // movie list screen
    return (
      <View style={styles.container}>
        <Toast 
          ref="toast"
          style={{backgroundColor:'#fff'}}
          position='top'
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{color:'black', fontSize: 20}}
        />
        <FlatList
          contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
          numColumns={1}
          data={this.state.dataSource}
          extraData={this.state.dataSource}
          renderItem={({item}) => 
          <View style={styles.movieItem}>
            <TouchableOpacity onPress={() => {global.slug = item.slug; this.props.navigate('TvShowScreen')}}>
              <ImageBackground
                style={styles.ImageBk}
                resizeMode={'cover'}
                source={{uri: API.base_filter_img_genres + item.poster}}>
                {/* <PlayIcon name = 'play-circle' 
                  color = 'rgba(255,255,255,0.7)'
                  size = {35} />
                  <View style={styles.rating}>
                    <StarIcon name='star' color = '#cccc00' size = {12}/>
                    <Text style={styles.ibmd_rating}>{item.imdb_rating}</Text>
                    <Text style={styles.flag_quality}>/{item.flag_quality}</Text>
                  </View>
                  <View style={styles.year}>
                    <Text style={styles.year_dsc}>{item.year}</Text>
                  </View> */}
              </ImageBackground>
            </TouchableOpacity>
            <View style={styles.dsc}>
              <Text style={styles.title}>{item.show_title}</Text>
              <Text style={styles.season}>
                Season {item.season}, Episode {item.episode}
              </Text>
              <Text style={styles.s_dsc} numberOfLines={4}>
                {item.show_description}
              </Text>
              <View style={styles.date}>
                <Text style={styles.air_month}>{months[item.air_date.substring(5,7)]}</Text>
                <Text style={styles.air_date}>{item.air_date.substring(8,10)}</Text>
                <Text style={styles.air_year}>{item.air_date.substring(0,4)}</Text>
              </View>
            </View>
            
          </View>        
          }
          keyExtractor={
            (item) => { return item.id_episode}
          }
          refreshing={this.state.isTopRefresh}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter.bind(this)}
          onEndReachedThreshold={0.4}
          onEndReached={this.handleDownRefresh.bind(this)}
          onRefresh={this.handleTopRefresh.bind(this)}
          ref={(ref) => { this.flatListRef = ref; }}
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
      backgroundColor: colors.subScreen
    },
    ImageBk: {
      width: screenWidth/3,
      height: (screenWidth/3-10)*424/300,
      
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      color: '#4280bf',
      fontSize: 17
    },
    movieItem: {
      flexDirection: 'row',
      width: screenWidth,
      height: (screenWidth/3-10)*424/300,
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
      
      justifyContent: 'space-between'
    },
    picker :{
      margin: 5
    },
    rating: {
      flexDirection: 'row',
      flex: 1, 
      position: "absolute", 
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
      fontSize: 13
    },
    flag_quality: {
      color: '#9f9f9f',
      fontSize: 10
    },
    year: {
      flexDirection: 'row',
      flex: 1, 
      position: "absolute", 
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
      fontSize: 10
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
    dsc: {
      width:screenWidth*2/3,
      padding: 16,
    },
    season: {
      marginTop: 20,
      color: '#9f9f9f',
      fontSize: 15 
    },
    s_dsc: {
      marginTop: 5,
      color: '#8f8f8f',
      fontSize: 12
    },
    air_year: {
      fontSize: 10,
      textAlign: 'center',
      backgroundColor:'#32485e',
      width: 30,
      color:'#ffff'
    },
    air_month: {
      fontSize: 10,
      textAlign: 'center',
      backgroundColor:'#32485e',
      width: 30,
      color:'#ffff'
    },
    air_date: {
      fontSize: 10,
      textAlign: 'center',
      backgroundColor:'#9f9f9f',
      width: 30,
      color:'#000000'
    },
    date: {
      position: 'absolute',
      top:0,
      right:0,
      width: 30,
      alignItems:'center'
    }
  });