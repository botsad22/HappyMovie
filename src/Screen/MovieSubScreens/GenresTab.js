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
import Swiper from 'react-native-swiper'


const instructions = Platform.select({
 ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
 android:
   'Double tap R on your keyboard to reload,\n' +
   'Shake or press menu button for dev menu',
});
const screenWidth = Math.round(Dimensions.get('window').width);

const genres = [
"adventure",
"animation",
"comedy",
"crime",
"drama",
"family",
"fantasy",
"horror:",
"romance"]

export default class GenresTab extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      isLoading: true,
      nextPage: "",
      genres: []
     }
  }

  async componentDidMount() {
      return fetch(API.adventure)
      .then((response) => response.json())
      .then((responseJson) => {
        //Alert.alert(responseJson.featured_items.collection[0].id_movie);
        var empty = true;
        if (responseJson.collection.length > 0){
          empty = false;
        }
        
        this.setState({adventure: responseJson.collection});
        const tmp_adventure = [];
        for (i = 0; i < responseJson.collection.length; i+=2){
          tmp_adventure.push(i);
        }
        this.setState({tmp_adventure: tmp_adventure});
        
        return fetch(API.animation)
        .then((response) => response.json())
        .then((responseJson) => {
          
          //Alert.alert(responseJson.featured_items.collection[0].id_movie);
          var empty = true;
          if (responseJson.collection.length > 0){
            empty = false;
          }
          this.setState({animation: responseJson.collection});
          const tmp_animation = []
          for (i = 0; i < responseJson.collection.length; i+=2){
            tmp_animation.push(i);
          }
          this.setState({tmp_animation: tmp_animation});
          
          return fetch(API.comedy)
          .then((response) => response.json())
          .then((responseJson) => {
            //Alert.alert(responseJson.featured_items.collection[0].id_movie);
            var empty = true;
            if (responseJson.collection.length > 0){
              empty = false;
            }
            this.setState({comedy: responseJson.collection});
            const tmp_comedy = []
            for (i = 0; i < responseJson.collection.length; i+=2){
              tmp_comedy.push(i);
            }
            this.setState({tmp_comedy: tmp_comedy});
            
            return fetch(API.crime)
            .then((response) => response.json())
            .then((responseJson) => {
              //Alert.alert(responseJson.featured_items.collection[0].id_movie);
              var empty = true;
              if (responseJson.collection.length > 0){
                empty = false;
              }
              this.setState({crime: responseJson.collection});
              const tmp_crime = [];
              for (i = 0; i < responseJson.collection.length; i+=2){
                tmp_crime.push(i);
              }
              this.setState({tmp_crime: tmp_crime});

              
              return fetch(API.drama)
              .then((response) => response.json())
              .then((responseJson) => {
                //Alert.alert(responseJson.featured_items.collection[0].id_movie);
                var empty = true;
                if (responseJson.collection.length > 0){
                  empty = false;
                }
                this.setState({drama: responseJson.collection});
                const tmp_drama = []
                for (i = 0; i < responseJson.collection.length; i+=2){
                  tmp_drama.push(i);
                }
                this.setState({tmp_drama: tmp_drama});
                
                return fetch(API.family)
                .then((response) => response.json())
                .then((responseJson) => {
                  //Alert.alert(responseJson.featured_items.collection[0].id_movie);
                  var empty = true;
                  if (responseJson.collection.length > 0){
                    empty = false;
                  }
                  this.setState({family: responseJson.collection});
                  const tmp_family = []
                  for (i = 0; i < responseJson.collection.length; i+=2){
                    tmp_family.push(i);
                  }
                  this.setState({tmp_family: tmp_family});
                  
                  return fetch(API.fantasy)
                  .then((response) => response.json())
                  .then((responseJson) => {
                    //Alert.alert(responseJson.featured_items.collection[0].id_movie);
                    var empty = true;
                    if (responseJson.collection.length > 0){
                      empty = false;
                    }
                    this.setState({fantasy: responseJson.collection});
                    const tmp_fantasy = []
                    for (i = 0; i < responseJson.collection.length; i+=2){
                      tmp_fantasy.push(i);
                    }
                    this.setState({tmp_fantasy: tmp_fantasy});

                    return fetch(API.horror)
                    .then((response) => response.json())
                    .then((responseJson) => {
                      //Alert.alert(responseJson.featured_items.collection[0].id_movie);
                      var empty = true;
                      if (responseJson.collection.length > 0){
                        empty = false;
                      }
                      this.setState({horror: responseJson.collection});
                      const tmp_horror = []
                      for (i = 0; i < responseJson.collection.length; i+=2){
                        tmp_horror.push(i);
                      }
                      this.setState({tmp_horror: tmp_horror});

                      
                      return fetch(API.romance)
                      .then((response) => response.json())
                      .then((responseJson) => {
                        //Alert.alert(responseJson.featured_items.collection[0].id_movie);
                        var empty = true;
                        if (responseJson.collection.length > 0){
                          empty = false;
                        }
                        const tmp_romance = [];
                        for (i = 0; i < responseJson.collection.length; i+=2){
                          tmp_romance.push(i);
                        }
                        this.setState({tmp_romance: tmp_romance});

                        this.setState({romance: responseJson.collection, isLoading: false});
                        
                      })
                      .catch((error) =>{
                        console.error(error);
                      });

                    })
                    .catch((error) =>{
                      console.error(error);
                    });

                  })
                  .catch((error) =>{
                    console.error(error);
                  });
                })
                .catch((error) =>{
                  console.error(error);
                });

              })
              .catch((error) =>{
                console.error(error);
              });

            })
            .catch((error) =>{
              console.error(error);
            });

          })
          .catch((error) =>{
            console.error(error);
          });
        })
        .catch((error) =>{
          console.error(error);
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }


  render() {
    if(this.state.isLoading)
      return <ProgressScreen/>
    // movie list screen
    return (
      <ScrollView style={{backgroundColor:colors.subScreen}}>
        {/* adventure */}
        <View style={styles.genresHeader}>
          <Text style={styles.genresTitle}>
           ADVENTURE
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>
              VIEW ALL
            </Text>
          </TouchableOpacity>          
        </View>
        <Swiper showsButtons={false} autoplay={true} dotColor={colors.navBarColor} activeDotColor={colors.textColor01} style={styles.swiper}>
          { 
            this.state.tmp_adventure.map(index  => {
              
              return (
                <View key={index} style={styles.genres}>
                  <View style={styles.MovieItem}>
                    <TouchableOpacity onPress={() => { global.slug = this.state.adventure[index].url; this.props.navigate('PlayScreen')}}>
                      <ImageBackground
                        style={styles.ImageBk}
                        resizeMode={'cover'}
                        source={{uri: API.base_filter_img_genres + this.state.adventure[index].cover}}>
                      <View style={styles.rating}>
                        <StarIcon name='star' color = '#cccc00' size = {15}/>
                        <Text style={styles.ibmd_rating}>{this.state.adventure[index].imdb_rating}</Text>
                        <Text style={styles.flag_quality}>/{this.state.adventure[index].flag_quality}</Text>
                      </View>
                      <View style={styles.year}>
                        <Text style={styles.year_dsc}>{this.state.adventure[index].year}</Text>
                      </View>         
                    </ImageBackground>
                    <Text style={styles.title} numberOfLines={1}>{this.state.adventure[index].title}</Text>
                  </TouchableOpacity> 
                </View>
                {
                  (index + 1 < this.state.adventure.length) &&
                  <View style={styles.MovieItem}>
                    <TouchableOpacity onPress={() => {global.slug = this.state.adventure[index + 1].url; this.props.navigate('PlayScreen')}}>
                      <ImageBackground
                        style={styles.ImageBk}
                        resizeMode={'cover'}
                        source={{uri: API.base_filter_img_genres + this.state.adventure[index + 1].cover}}>
                        <View style={styles.rating}>
                          <StarIcon name='star' color = '#cccc00' size = {12}/>
                          <Text style={styles.ibmd_rating}>{this.state.adventure[index + 1].imdb_rating}</Text>
                          <Text style={styles.flag_quality}>/{this.state.adventure[index + 1].flag_quality}</Text>
                        </View>
                        <View style={styles.year}>
                          <Text style={styles.year_dsc}>{this.state.adventure[index + 1].year}</Text>
                        </View>             
                      </ImageBackground>
                      <Text style={styles.title} numberOfLines={1}>{this.state.adventure[index + 1].title}</Text>
                    </TouchableOpacity> 
                  </View>
                }
              </View>
             );
           })}
         </Swiper>
         {/* animation */}
         <View style={styles.genresHeader}>
          <Text style={styles.genresTitle}>
           ANIMATION
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>
              VIEW ALL
            </Text>
          </TouchableOpacity>          
        </View>
          <Swiper showsButtons={false} autoplay={true} dotColor={colors.navBarColor} activeDotColor={colors.textColor01} style={styles.swiper}>
            { 
              this.state.tmp_animation.map(index => {                
                return (
                  <View key={index} style={styles.genres}>
                    <View style={styles.MovieItem}>
                      <TouchableOpacity onPress={() => {global.slug = this.state.animation[index].url; this.props.navigate('PlayScreen')}}>
                        <ImageBackground
                          style={styles.ImageBk}
                          resizeMode={'cover'}
                          source={{uri: API.base_filter_img_genres + this.state.animation[index].cover}}>
                        <View style={styles.rating}>
                        <StarIcon name='star' color = '#cccc00' size = {15}/>
                        <Text style={styles.ibmd_rating}>{this.state.animation[index].imdb_rating}</Text>
                        <Text style={styles.flag_quality}>/{this.state.animation[index].flag_quality}</Text>
                      </View>
                      <View style={styles.year}>
                        <Text style={styles.year_dsc}>{this.state.animation[index].year}</Text>
                      </View>         
                    </ImageBackground>
                    <Text style={styles.title} numberOfLines={1}>{this.state.animation[index].title}</Text>
                  </TouchableOpacity> 
                </View>
                {
                  (index + 1 < this.state.animation.length) &&
                  <View style={styles.MovieItem}>
                    <TouchableOpacity onPress={() => {global.slug = this.state.animation[index + 1].url; this.props.navigate('PlayScreen')}}>
                      <ImageBackground
                        style={styles.ImageBk}
                        resizeMode={'cover'}
                        source={{uri: API.base_filter_img_genres + this.state.animation[index + 1].cover}}>
                        <View style={styles.rating}>
                          <StarIcon name='star' color = '#cccc00' size = {12}/>
                          <Text style={styles.ibmd_rating}>{this.state.animation[index + 1].imdb_rating}</Text>
                          <Text style={styles.flag_quality}>/{this.state.animation[index + 1].flag_quality}</Text>
                        </View>
                        <View style={styles.year}>
                          <Text style={styles.year_dsc}>{this.state.animation[index + 1].year}</Text>
                        </View>             
                      </ImageBackground>
                      <Text style={styles.title} numberOfLines={1}>{this.state.animation[index + 1].title}</Text>
                    </TouchableOpacity> 
                  </View>
                }
              </View>
             );
           })}
         </Swiper>
         {/* comedy */}
         <View style={styles.genresHeader}>
          <Text style={styles.genresTitle}>
           COMEDY
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>
              VIEW ALL
            </Text>
          </TouchableOpacity>          
        </View>
          <Swiper showsButtons={false} autoplay={true} dotColor={colors.navBarColor} activeDotColor={colors.textColor01} style={styles.swiper}>
            { 
              this.state.tmp_comedy.map(index => {                
                return (
                  <View key={index} style={styles.genres}>
                    <View style={styles.MovieItem}>
                      <TouchableOpacity onPress={() => {global.slug = this.state.comedy[index].url; this.props.navigate('PlayScreen')}}>
                        <ImageBackground
                          style={styles.ImageBk}
                          resizeMode={'cover'}
                          source={{uri: API.base_filter_img_genres + this.state.comedy[index].cover}}>
                        <View style={styles.rating}>
                        <StarIcon name='star' color = '#cccc00' size = {15}/>
                        <Text style={styles.ibmd_rating}>{this.state.comedy[index].imdb_rating}</Text>
                        <Text style={styles.flag_quality}>/{this.state.comedy[index].flag_quality}</Text>
                      </View>
                      <View style={styles.year}>
                        <Text style={styles.year_dsc}>{this.state.comedy[index].year}</Text>
                      </View>         
                    </ImageBackground>
                    <Text style={styles.title} numberOfLines={1}>{this.state.comedy[index].title}</Text>
                  </TouchableOpacity> 
                </View>
                {
                  (index + 1 < this.state.comedy.length) &&
                  <View style={styles.MovieItem}>
                  <TouchableOpacity onPress={() => {global.slug = this.state.comedy[index + 1].url; this.props.navigate('PlayScreen')}}>
                    <ImageBackground
                      style={styles.ImageBk}
                      resizeMode={'cover'}
                      source={{uri: API.base_filter_img_genres + this.state.comedy[index + 1].cover}}>
                      <View style={styles.rating}>
                        <StarIcon name='star' color = '#cccc00' size = {12}/>
                        <Text style={styles.ibmd_rating}>{this.state.comedy[index + 1].imdb_rating}</Text>
                        <Text style={styles.flag_quality}>/{this.state.comedy[index + 1].flag_quality}</Text>
                      </View>
                      <View style={styles.year}>
                        <Text style={styles.year_dsc}>{this.state.comedy[index + 1].year}</Text>
                      </View>             
                    </ImageBackground>
                    <Text style={styles.title} numberOfLines={1}>{this.state.comedy[index + 1].title}</Text>
                  </TouchableOpacity> 
                </View>
                }                
              </View>
             );
           })}
         </Swiper>
         {/* crime */}
         <View style={styles.genresHeader}>
          <Text style={styles.genresTitle}>
           CRIME
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>
              VIEW ALL
            </Text>
          </TouchableOpacity>          
        </View>
          <Swiper showsButtons={false} autoplay={true} dotColor={colors.navBarColor} activeDotColor={colors.textColor01} style={styles.swiper}>
            { 
              this.state.tmp_crime.map(index => {                
                return (
                  <View key={index} style={styles.genres}>
                    <View style={styles.MovieItem}>
                      <TouchableOpacity onPress={() => {global.slug = this.state.crime[index].url; this.props.navigate('PlayScreen')}}>
                        <ImageBackground
                          style={styles.ImageBk}
                          resizeMode={'cover'}
                          source={{uri: API.base_filter_img_genres + this.state.crime[index].cover}}>
                        <View style={styles.rating}>
                        <StarIcon name='star' color = '#cccc00' size = {15}/>
                        <Text style={styles.ibmd_rating}>{this.state.crime[index].imdb_rating}</Text>
                        <Text style={styles.flag_quality}>/{this.state.crime[index].flag_quality}</Text>
                      </View>
                      <View style={styles.year}>
                        <Text style={styles.year_dsc}>{this.state.crime[index].year}</Text>
                      </View>         
                    </ImageBackground>
                    <Text style={styles.title} numberOfLines={1}>{this.state.crime[index].title}</Text>
                  </TouchableOpacity> 
                </View>
                {
                  (index + 1 < this.state.crime.length) &&
                  <View style={styles.MovieItem}>
                    <TouchableOpacity onPress={() => {global.slug = this.state.crime[index + 1].url; this.props.navigate('PlayScreen')}}>
                      <ImageBackground
                        style={styles.ImageBk}
                        resizeMode={'cover'}
                        source={{uri: API.base_filter_img_genres + this.state.crime[index + 1].cover}}>
                        <View style={styles.rating}>
                          <StarIcon name='star' color = '#cccc00' size = {12}/>
                          <Text style={styles.ibmd_rating}>{this.state.crime[index + 1].imdb_rating}</Text>
                          <Text style={styles.flag_quality}>/{this.state.crime[index + 1].flag_quality}</Text>
                        </View>
                        <View style={styles.year}>
                          <Text style={styles.year_dsc}>{this.state.crime[index + 1].year}</Text>
                        </View>             
                      </ImageBackground>
                      <Text style={styles.title} numberOfLines={1}>{this.state.crime[index + 1].title}</Text>
                    </TouchableOpacity> 
                  </View>
                }                
              </View>
             );
           })}
         </Swiper>
         {/* DRAMA */}
         <View style={styles.genresHeader}>
          <Text style={styles.genresTitle}>
           DRAMA
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>
              VIEW ALL
            </Text>
          </TouchableOpacity>          
        </View>
          <Swiper showsButtons={false} autoplay={true} dotColor={colors.navBarColor} activeDotColor={colors.textColor01} style={styles.swiper}>
            { 
              this.state.tmp_drama.map(index => {                
                return (
                  <View key={index} style={styles.genres}>
                    <View style={styles.MovieItem}>
                      <TouchableOpacity onPress={() => {global.slug = this.state.drama[index].url; this.props.navigate('PlayScreen')}}>
                        <ImageBackground
                          style={styles.ImageBk}
                          resizeMode={'cover'}
                          source={{uri: API.base_filter_img_genres + this.state.drama[index].cover}}>
                        <View style={styles.rating}>
                        <StarIcon name='star' color = '#cccc00' size = {15}/>
                        <Text style={styles.ibmd_rating}>{this.state.drama[index].imdb_rating}</Text>
                        <Text style={styles.flag_quality}>/{this.state.drama[index].flag_quality}</Text>
                      </View>
                      <View style={styles.year}>
                        <Text style={styles.year_dsc}>{this.state.drama[index].year}</Text>
                      </View>         
                    </ImageBackground>
                    <Text style={styles.title} numberOfLines={1}>{this.state.drama[index].title}</Text>
                  </TouchableOpacity> 
                </View>
                {
                  (index + 1 < this.state.drama.length) &&
                  <View style={styles.MovieItem}>
                    <TouchableOpacity onPress={() => {global.slug = this.state.drama[index + 1].url; this.props.navigate('PlayScreen')}}>
                      <ImageBackground
                        style={styles.ImageBk}
                        resizeMode={'cover'}
                        source={{uri: API.base_filter_img_genres + this.state.drama[index + 1].cover}}>
                        <View style={styles.rating}>
                          <StarIcon name='star' color = '#cccc00' size = {12}/>
                          <Text style={styles.ibmd_rating}>{this.state.drama[index + 1].imdb_rating}</Text>
                          <Text style={styles.flag_quality}>/{this.state.drama[index + 1].flag_quality}</Text>
                        </View>
                        <View style={styles.year}>
                          <Text style={styles.year_dsc}>{this.state.drama[index + 1].year}</Text>
                        </View>             
                      </ImageBackground>
                      <Text style={styles.title} numberOfLines={1}>{this.state.drama[index + 1].title}</Text>
                    </TouchableOpacity> 
                  </View>
                }
              </View>
             );
           })}
         </Swiper>
         {/* family */}
         <View style={styles.genresHeader}>
          <Text style={styles.genresTitle}>
           FAMILY
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>
              VIEW ALL
            </Text>
          </TouchableOpacity>          
        </View>
          <Swiper showsButtons={false} autoplay={true} dotColor={colors.navBarColor} activeDotColor={colors.textColor01} style={styles.swiper}>
            { 
              this.state.tmp_family.map(index => {                
                return (
                  <View key={index} style={styles.genres}>
                    <View style={styles.MovieItem}>
                      <TouchableOpacity onPress={() => {global.slug = this.state.family[index].url; this.props.navigate('PlayScreen')}}>
                        <ImageBackground
                          style={styles.ImageBk}
                          resizeMode={'cover'}
                          source={{uri: API.base_filter_img_genres + this.state.family[index].cover}}>
                        <View style={styles.rating}>
                        <StarIcon name='star' color = '#cccc00' size = {15}/>
                        <Text style={styles.ibmd_rating}>{this.state.family[index].imdb_rating}</Text>
                        <Text style={styles.flag_quality}>/{this.state.family[index].flag_quality}</Text>
                      </View>
                      <View style={styles.year}>
                        <Text style={styles.year_dsc}>{this.state.family[index].year}</Text>
                      </View>         
                    </ImageBackground>
                    <Text style={styles.title} numberOfLines={1}>{this.state.family[index].title}</Text>
                  </TouchableOpacity> 
                </View>
                {
                  (index + 1 < this.state.family.length) &&
                  <View style={styles.MovieItem}>
                    <TouchableOpacity onPress={() => {global.slug = this.state.family[index + 1].url; this.props.navigate('PlayScreen')}}>
                      <ImageBackground
                        style={styles.ImageBk}
                        resizeMode={'cover'}
                        source={{uri: API.base_filter_img_genres + this.state.family[index + 1].cover}}>
                        <View style={styles.rating}>
                          <StarIcon name='star' color = '#cccc00' size = {12}/>
                          <Text style={styles.ibmd_rating}>{this.state.family[index + 1].imdb_rating}</Text>
                          <Text style={styles.flag_quality}>/{this.state.family[index + 1].flag_quality}</Text>
                        </View>
                        <View style={styles.year}>
                          <Text style={styles.year_dsc}>{this.state.family[index + 1].year}</Text>
                        </View>             
                      </ImageBackground>
                      <Text style={styles.title} numberOfLines={1}>{this.state.family[index + 1].title}</Text>
                    </TouchableOpacity> 
                  </View>
                }                
              </View>
             );
           })}
         </Swiper>
         {/* fantasy */}
         <View style={styles.genresHeader}>
          <Text style={styles.genresTitle}>
           FANTASY
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>
              VIEW ALL
            </Text>
          </TouchableOpacity>          
        </View>
          <Swiper showsButtons={false} autoplay={true} dotColor={colors.navBarColor} activeDotColor={colors.textColor01} style={styles.swiper}>
            { 
              this.state.tmp_fantasy.map(index => {                
                return (
                  <View key={index} style={styles.genres}>
                    <View style={styles.MovieItem}>
                      <TouchableOpacity onPress={() => {global.slug = this.state.fantasy[index].url; this.props.navigate('PlayScreen')}}>
                        <ImageBackground
                          style={styles.ImageBk}
                          resizeMode={'cover'}
                          source={{uri: API.base_filter_img_genres + this.state.fantasy[index].cover}}>
                        <View style={styles.rating}>
                        <StarIcon name='star' color = '#cccc00' size = {15}/>
                        <Text style={styles.ibmd_rating}>{this.state.fantasy[index].imdb_rating}</Text>
                        <Text style={styles.flag_quality}>/{this.state.fantasy[index].flag_quality}</Text>
                      </View>
                      <View style={styles.year}>
                        <Text style={styles.year_dsc}>{this.state.fantasy[index].year}</Text>
                      </View>         
                    </ImageBackground>
                    <Text style={styles.title} numberOfLines={1}>{this.state.fantasy[index].title}</Text>
                  </TouchableOpacity> 
                </View>
                {
                  (index + 1 < this.state.fantasy.length) &&
                  <View style={styles.MovieItem}>
                    <TouchableOpacity onPress={() => {global.slug = this.state.fantasy[index + 1].url; this.props.navigate('PlayScreen')}}>
                      <ImageBackground
                        style={styles.ImageBk}
                        resizeMode={'cover'}
                        source={{uri: API.base_filter_img_genres + this.state.fantasy[index + 1].cover}}>
                        <View style={styles.rating}>
                          <StarIcon name='star' color = '#cccc00' size = {12}/>
                          <Text style={styles.ibmd_rating}>{this.state.fantasy[index + 1].imdb_rating}</Text>
                          <Text style={styles.flag_quality}>/{this.state.fantasy[index + 1].flag_quality}</Text>
                        </View>
                        <View style={styles.year}>
                          <Text style={styles.year_dsc}>{this.state.fantasy[index + 1].year}</Text>
                        </View>             
                      </ImageBackground>
                      <Text style={styles.title} numberOfLines={1}>{this.state.fantasy[index + 1].title}</Text>
                    </TouchableOpacity> 
                  </View>
                }                
              </View>
             );
           })}
         </Swiper>
        {/* horror */}
        <View style={styles.genresHeader}>
          <Text style={styles.genresTitle}>
           HORROR
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>
              VIEW ALL
            </Text>
          </TouchableOpacity>          
        </View>
          <Swiper showsButtons={false} autoplay={true} dotColor={colors.navBarColor} activeDotColor={colors.textColor01} style={styles.swiper}>
            { 
              this.state.tmp_horror.map(index => {
                
                return (
                  <View key={index} style={styles.genres}>
                    <View style={styles.MovieItem}>
                      <TouchableOpacity onPress={() => {global.slug = this.state.horror[index].url; this.props.navigate('PlayScreen')}}>
                        <ImageBackground
                          style={styles.ImageBk}
                          resizeMode={'cover'}
                          source={{uri: API.base_filter_img_genres + this.state.horror[index].cover}}>
                        <View style={styles.rating}>
                        <StarIcon name='star' color = '#cccc00' size = {15}/>
                        <Text style={styles.ibmd_rating}>{this.state.horror[index].imdb_rating}</Text>
                        <Text style={styles.flag_quality}>/{this.state.horror[index].flag_quality}</Text>
                      </View>
                      <View style={styles.year}>
                        <Text style={styles.year_dsc}>{this.state.horror[index].year}</Text>
                      </View>         
                    </ImageBackground>
                    <Text style={styles.title} numberOfLines={1}>{this.state.horror[index].title}</Text>
                  </TouchableOpacity> 
                </View>
                {
                  (index + 1 < this.state.horror.length) &&
                  <View style={styles.MovieItem}>
                    <TouchableOpacity onPress={() => {global.slug = this.state.adventure[index + 1].url; this.props.navigate('PlayScreen')}}>
                      <ImageBackground
                        style={styles.ImageBk}
                        resizeMode={'cover'}
                        source={{uri: API.base_filter_img_genres + this.state.horror[index + 1].cover}}>
                        <View style={styles.rating}>
                          <StarIcon name='star' color = '#cccc00' size = {12}/>
                          <Text style={styles.ibmd_rating}>{this.state.horror[index + 1].imdb_rating}</Text>
                          <Text style={styles.flag_quality}>/{this.state.horror[index + 1].flag_quality}</Text>
                        </View>
                        <View style={styles.year}>
                          <Text style={styles.year_dsc}>{this.state.horror[index + 1].year}</Text>
                        </View>             
                      </ImageBackground>
                      <Text style={styles.title} numberOfLines={1}>{this.state.horror[index + 1].title}</Text>
                    </TouchableOpacity> 
                  </View>
                }                
              </View>
             );
           })}
         </Swiper>
         {/* romance */}
         <View style={styles.genresHeader}>
          <Text style={styles.genresTitle}>
           ROMANCE
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>
              VIEW ALL
            </Text>
          </TouchableOpacity>          
        </View>
          <Swiper showsButtons={false} autoplay={true} dotColor={colors.navBarColor} activeDotColor={colors.textColor01} style={styles.swiper}>
            { 
              this.state.tmp_romance.map(index  => {                
                return (
                  <View key={index} style={styles.genres}>
                    <View style={styles.MovieItem}>
                      <TouchableOpacity onPress={() => {global.slug = this.state.romance[index].url; this.props.navigate('PlayScreen')}}>
                        <ImageBackground
                          style={styles.ImageBk}
                          resizeMode={'cover'}
                          source={{uri: API.base_filter_img_genres + this.state.romance[index].cover}}>
                        <View style={styles.rating}>
                        <StarIcon name='star' color = '#cccc00' size = {15}/>
                        <Text style={styles.ibmd_rating}>{this.state.romance[index].imdb_rating}</Text>
                        <Text style={styles.flag_quality}>/{this.state.romance[index].flag_quality}</Text>
                      </View>
                      <View style={styles.year}>
                        <Text style={styles.year_dsc}>{this.state.romance[index].year}</Text>
                      </View>         
                    </ImageBackground>
                    <Text style={styles.title} numberOfLines={1}>{this.state.romance[index].title}</Text>
                  </TouchableOpacity> 
                </View>
                {
                  (index + 1 < this.state.romance.length) &&
                  <View style={styles.MovieItem}>
                  <TouchableOpacity onPress={() => {global.slug = this.state.romance[index + 1].url; this.props.navigate('PlayScreen')}}>
                    <ImageBackground
                      style={styles.ImageBk}
                      resizeMode={'cover'}
                      source={{uri: API.base_filter_img_genres + this.state.romance[index + 1].cover}}>
                      <View style={styles.rating}>
                        <StarIcon name='star' color = '#cccc00' size = {12}/>
                        <Text style={styles.ibmd_rating}>{this.state.romance[index + 1].imdb_rating}</Text>
                        <Text style={styles.flag_quality}>/{this.state.romance[index + 1].flag_quality}</Text>
                      </View>
                      <View style={styles.year}>
                        <Text style={styles.year_dsc}>{this.state.romance[index + 1].year}</Text>
                      </View>             
                    </ImageBackground>
                    <Text style={styles.title} numberOfLines={1}>{this.state.romance[index + 1].title}</Text>
                  </TouchableOpacity> 
                </View>
                }                
              </View>
             );
           })}
         </Swiper>   
      </ScrollView> 
    );
   }
  }

  const styles = StyleSheet.create({
    ImageBk: {
      width: screenWidth/2 - 10,
      height: (screenWidth/2-10)*424/300,
      
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      padding: 10,
      color: '#9f9f9f',
      fontSize: 13
    },
    movieItem: {
      flexDirection: 'row',
      width: screenWidth/2 - 10,
      height : (screenWidth/2-10)*424/300,
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
      alignItems: 'center'
    },
    picker :{
      margin: 5
    },
    genres:{
      flexDirection: 'row', 
      alignItems:'center', 
      justifyContent:'space-between',
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
    swiper: {
      height: (screenWidth/2)*424/300 + 100
    },
    ibmd_rating: {
      color: '#ffffff',
      fontSize: 15
    },
    flag_quality: {
      color: '#9f9f9f',
      fontSize: 12
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
      fontSize: 15
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
      height: 100
    },
    MovieItem: {
      flex: 1,
      backgroundColor: colors.movieItem,
      marginBottom: 20,
      shadowColor: '#717a83',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1
    },
    genresHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    genresTitle: {
      paddingBottom: 20,
      paddingTop: 20,
      paddingRight: 10,
      paddingLeft: 15,
      color: '#f9f9f9',
      fontSize: 20
    },
    viewAll:{
      paddingBottom: 20,
      paddingTop: 20,
      paddingRight: 10,
      paddingLeft: 10,
      color: '#9e9e9e',
      fontSize: 12
    }
  });