import React, {Component} from 'react';
import {Platform, BackHandler, StyleSheet, Text, View, FlatList, Image, ImageBackground, Dimensions, Alert, ActivityIndicator, Picker} from 'react-native';
import ProgressScreen from '../ReferScreens/ProgressScreen'
import API from '../../config/api';
import colors from '../../config/colors';
import PlayIcon from 'react-native-vector-icons/Feather';
import StarIcon from 'react-native-vector-icons/Entypo';
import { TouchableOpacity, TouchableHighlight, ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ActionButton from 'react-native-action-button';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import VIdeoControls from 'react-native-video-controls'
import { TextTrackType } from 'react-native-video';
import Orientation from 'react-native-orientation'
import { objectExpression, jsxOpeningElement } from '@babel/types';
import Button from 'apsl-react-native-button';
import { StatusBar } from 'react-native';
import ISO6391 from 'iso-639-1'

const instructions = Platform.select({
 ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
 android:
   'Double tap R on your keyboard to reload,\n' +
   'Shake or press menu button for dev menu',
});
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

var itemsShow = [];

export default class TvShowScreen extends Component {

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

        this.state = {
            isLoading: true,
            screenWidth: Dimensions.get('window').width,
            heightScaled: null,
            opacityTopControls: false,
            selectedSubtitle: '',
            SelectedQuality: '',
            videoWidth: screenWidth,
            videoHeight: 250,
            currentPlayUri: '',
            director: '',
            currentTime: 0,
            init: true,
            selectedItems: []
        }
    }

    async componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    async componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick() {
        global.navigation.pop();
        Orientation.lockToPortrait();

        return true;
    }

    async componentDidMount(){
        return fetch(API.tvShow + global.slug)
        .then((response) => response.json())
        .then((responseJson) => {
            var selected = ""
            if(!responseJson.success)
                return;
            else{
                itemsShow = [];
                for(var i in responseJson.seasons){
                    var episodes = [];
                    for(var j in responseJson.seasons[i].episodes){
                        if(selected == ""){
                            selected = responseJson.seasons[i].episodes[j].id_episode;
                        }
                        episodes.push({
                            id: responseJson.seasons[i].episodes[j].id_episode,
                            name: 'SEASON ' + i + ' - ' + 'EPISODE ' + j
                        })
                    }
                    itemsShow.push({
                        name: 'SEASON' + i,
                        id: i,
                        children: episodes
                    })
                }
                this.setState({
                    meta: responseJson.meta,
                    cast: JSON.parse(responseJson.meta.cast),
                    seasons: responseJson.seasons,
                    selectedItems: [selected]
                    // subtitles: subtitles
                }, function(){
                    return fetch(API.tv_tokenExpires + this.state.meta.id_show)
                    .then((response) => response.json()
                    .then((responseJson) => {
                        if(!responseJson.success)
                            return;
                        else{
                            this.setState({
                                expires: responseJson.data.expires,
                                accessToken: responseJson.data.accessToken,
                                currentPlayUri: API.show_stream + this.state.accessToken + "/" + this.state.expires + "/" + this.state.selectedItems[0] + "/master.m3u8",
                            }, () => {
                                return fetch(API.show_subtitle + this.state.selectedItems[0])
                                .then((response) => response.json()
                                .then((responseJson) => {
                                    const textTracks = [];
                                    for(i = 0; i < responseJson.length; i++){
                                        const code = ISO6391.getCode(responseJson[i].language);
                                        if (code == "")
                                            continue;                                    
                                        textTracks.push({
                                            title: responseJson[i].language,
                                            language: code,
                                            type: TextTrackType.VTT,
                                            uri: responseJson[i].url
                                        })
                                    }
                                    this.setState({
                                        textTracks: textTracks,
                                        isLoading: false
                                    });
                                }))
                            });
                        }
                    }))
                });
            }
        })
        .catch((error) =>{
          console.error(error);
        });
    }

    fetchSubtitles = () => {
        return fetch(API.show_subtitle + this.state.selectedItems[0])
        .then((response) => response.json()
        .then((responseJson) => {
            const textTracks = [];
            for(i = 0; i < responseJson.length; i++){
                const code = ISO6391.getCode(responseJson[i].language);
                if (code == "")
                    continue;                                    
                textTracks.push({
                    title: responseJson[i].language,
                    language: code,
                    type: TextTrackType.VTT,
                    uri: responseJson[i].url
                })
            }
            this.setState({
                textTracks: textTracks
            });
        }))
    }
    
    playerControlClickFullScreen = () =>{
        this.setState({
            fullScreenFlag: !this.state.fullScreenFlag
        }, () => {
            this.state.fullScreenFlag ? this.entryFullScreen() : this.exitFullScreen();
        });
    }
    entryFullScreen = () => {
        StatusBar.setHidden(true, true);
        Orientation.lockToLandscape();
        this.setState({
            videoWidth: screenHeight,
            videoHeight: screenWidth
        })
    }
    exitFullScreen = () => {
        StatusBar.setHidden(false, true);
        Orientation.lockToPortrait();
        this.setState({
            videoWidth: screenWidth,
            videoHeight: 250
        })
    }
    back = () => {
        Orientation.lockToPortrait();
        this.setState({
            videoWidth: screenWidth,
            videoHeight: screenHeight
        })
        global.navigation.pop();
    }

    handleSubtitleChange = (itemValue, itemIndex) => {
        if(itemIndex == 0){
            this.setState({selectedSubtitle: itemValue, currentSubtitle: {type: "title", value:""}});
        }else {
            this.setState({
                selectedSubtitle: itemValue,
                currentSubtitle : {
                type: "title",
                value: itemValue
                }});
        }
    }

    handleQualityChange = (itemValue, itemIndex) => {
        if(itemIndex == 0){
            this.setState({SelectedQuality: itemValue, currentPlayUri: this.state.streamUrls[0]})    
        }
        else{
            this.setState({
                SelectedQuality: itemValue, 
                currentPlayUri: this.state.streamUrls[itemIndex - 1]
            })
        }     
    }

    onProgress = (data) => {
        this.setState({currentTime: data.currentTime});
    }
    onLoad = () => {
        // this.player.seek(this.state.currentTime);
        this.setState({videoLoading: false})
    }
    onLoadStart = (data) => {
        this.setState({videoLoading: true})
    }

    playYoutube = () => {
        this.setState({paused: true})
        global.youtubeId = this.state.meta.youtube;
        global.navigation.navigate('YoutubePlayScreen');
        global.youtubeTitle = this.state.meta.title;
        global.youtubeDesc = this.state.meta.description;
    }

    onSelectedChange = (selectedItems) => {
        this.setState({ selectedItems }, ()=>{
            const selected = selectedItems[0];
            this.setState({
                currentPlayUri: API.show_stream + this.state.accessToken + "/" + this.state.expires + "/" + selected + "/master.m3u8",
            }, () => {
                this.fetchSubtitles
            })
        });
    };

    render() {
        if(this.state.isLoading)
            return <ProgressScreen/>
        return(
            <View style={styles.container}>
                {
                    this.state.init &&
                    <View>
                        <ImageBackground
                        style={{width: this.state.videoWidth, height: this.state.videoHeight, alignItems: 'center', justifyContent: 'center'}}
                        resizeMode={'cover'}
                        source={{uri: this.state.meta.backdrop == "" ? API.backdrop : API.base_home_img + this.state.meta.backdrop}}>
                            <TouchableOpacity onPress={() => {this.setState({init: false})}}>
                                <PlayIcon name = 'play-circle' 
                                    color = 'rgba(255,255,255,0.8)'
                                    size = {60} />
                            </TouchableOpacity>                        
                        </ImageBackground>                        
                        <View style={{position: 'absolute', left: 3, top: 3}}>
                            <TouchableOpacity onPress={this.back}>
                                <Icon name= 'chevron-left' size={60} style={{color: 'rgba(255, 255, 255, 0.9)'}}/> 
                            </TouchableOpacity>                                                      
                        </View>
                        <View style={{position: 'absolute', right: 0, top: 0, backgroundColor: 'rgba(16, 33, 51, 0.8)'}}>
                            <Text style={{fontSize: 17, color: 'rgba(255, 255, 255, 0.7)'}}>{this.state.meta.year}</Text>                           
                        </View>
                        <View style={{position: 'absolute', left: 0, bottom: 0, backgroundColor: 'rgba(16, 33, 51, 0.8)', justifyContent: 'center',alignItems: 'center'}}>
                            <Text style={{fontSize: 12, color: 'rgba(255, 255, 255, 0.4)'}}>IMDB</Text>
                            <Text style={{fontSize: 16, color: 'rgba(255, 255, 255, 0.7)'}}>{this.state.meta.imdb_rating}</Text>
                        </View>
                    </View>
                }
                {
                    !this.state.init &&
                    <View style={{width: this.state.videoWidth, height: this.state.videoHeight}}>
                        {
                            Platform.OS == 'android'&&
                            <Video
                            source={{uri: this.state.currentPlayUri}}
                            repeat={true}
                            resizeMode={"contain"}
                            paused={this.state.paused}
                            currentTime={this.state.currentTime}
                            style={{width: this.state.videoWidth, height: this.state.videoHeight, backgroundColor: 'black'}}
                            fullscreenOrientation={'landscape'}
                            selectedTextTrack={this.state.currentSubtitle}
                            textTracks={this.state.textTracks}
                            controls
                            ref={(ref)=> this.player = ref}
                            onProgress={this.onProgress}
                            onLoad={this.onLoad}
                            onLoadStart={this.onLoadStart}
                            />
                        }
                        {
                            Platform.OS == 'ios'&&
                            <VIdeoControls
                            source={{uri: this.state.currentPlayUri}}
                            disableVolume={true}
                            onEnterFullscreen={this.entryFullScreen}
                            onExitFullscreen={this.exitFullScreen}
                            onBack={this.back}
                            // repeat={true}
                            // resizeMode={"contain"}
                            // paused={this.state.paused}
                            // currentTime={this.state.currentTime}
                            // fullscreenOrientation={'landscape'}
                            // controls
                            // ref={(ref)=> this.player = ref}
                            // onProgress={this.onProgress}
                            // onLoad={this.onLoad}
                            // onLoadStart={this.onLoadStart}
                            />
                        }
                        {
                            this.state.videoLoading && Platform.OS == 'android' &&
                            <ActivityIndicator 
                                size={40}
                                color={colors.progress}
                                style={{position: 'absolute', left: this.state.videoWidth/2 - 20, top: this.state.videoHeight/2 - 20}}/>
                        }
                        {
                            Platform.OS == 'android' &&
                            <View style={styles.topControls}>
                                <TouchableOpacity onPress={this.back} style={{width: 30}}>
                                    <Icon name= 'chevron-left' size={30} style={styles.back}/>
                                </TouchableOpacity>
                                <View style={styles.topControlItems}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 130}}>
                                        <Text style={{fontSize: 13, color: 'rgba(255, 255, 255, 0.4)', width: 50}}>Subtitle:</Text>
                                        <Picker selectedValue={this.state.selectedSubtitle} style={Platform.OS === 'ios' ? styles.picker_ios : styles.picker} itemStyle={styles.pickerItem} onValueChange={this.handleSubtitleChange}>
                                            <Picker.Item label = 'Off' value = ''/>
                                        {
                                            this.state.textTracks.map(item => {
                                                return(
                                                    <Picker.Item label = {item.title} value = {item.title}/>
                                                )
                                            })
                                        } 
                                        </Picker>
                                    </View>
                                    {/* <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 130}}>
                                        <Text style={{fontSize: 13, color: 'rgba(255, 255, 255, 0.4)', width: 50}}>Quality:</Text>
                                        <Picker selectedValue={this.state.SelectedQuality} style={Platform.OS === 'ios' ? styles.picker_ios : styles.picker} itemStyle={styles.pickerItem} onValueChange={this.handleQualityChange}>
                                            <Picker.Item label = 'Auto' value = {this.state.streamUrls[0]}/>
                                        {
                                            this.state.qualities.map((item, index, array) => {
                                                return(
                                                    <Picker.Item label = {item} value = {this.state.streamUrls[index]}/>
                                                )
                                            })
                                        } 
                                    </Picker>  
                                    </View>                                                           */}
                                    <TouchableOpacity onPress={this.playerControlClickFullScreen} style={{width: 30}}>
                                        <Icon name={this.state.fullScreenFlag ? 'fullscreen-exit' : 'fullscreen'} size={30} style={styles.topControlFullScreen}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </View>
                }
                <SectionedMultiSelect
                    items={itemsShow}
                    uniqueKey="id"
                    single={true}
                    subKey="children"
                    iconKey="icon"
                    selectText="Select Genres..."
                    showDropDowns={true}
                    readOnlyHeadings={true}
                    colors={{selectToggleTextColor:'#ffffff', primary: 'rgba(231,76,60,0.8)'}}
                    style={styles.picker}
                    onSelectedItemsChange={this.onSelectedChange}
                    selectedItems={this.state.selectedItems}
                />
                <ScrollView>
                    <View style={styles.poster}>
                        <View style={{width: screenWidth/3,}}>
                            <Image
                                style={styles.ImageBk_poster}
                                source={{uri: API.base_filter_img + this.state.meta.poster}}/>
                            <TouchableOpacity onPress={this.playYoutube} style={{width:screenWidth/3, height: 25, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ff1000'}}>
                                <Text style={{fontSize: 12, color: 'white'}}>WATCH TRAILER</Text>
                            </TouchableOpacity>
                        </View>
                                
                        <View style={styles.dsc}>
                            <Text style={styles.title}>{this.state.meta.title}</Text>
                            <View style={styles.duration_h}>
                                <Icon name='av-timer' color = '#fff' size = {14}/>
                                <Text style={styles.duration}>{this.state.meta.duration} minutes</Text>
                            </View>
                            <ScrollView>
                                <Text style={styles.item_description}>{this.state.meta.description}</Text>
                            </ScrollView>                        
                        </View>  
                    </View>
                    {
                        this.state.cast.length > 0 &&
                        <View>
                            <View style={styles.div_header}>
                                <Text style={styles.div_txt}>CAST</Text>
                            </View>
                            <View style={styles.sub_div_h}>
                                <Text style={styles.cast_sub}>Stars:</Text>
                            </View>
                            <ScrollView horizontal={true}>
                            {
                                this.state.cast.map(item => {
                                    if(item.picture_url != ""){
                                        return (
                                        <View style={styles.stars}>
                                            <Image
                                            style={styles.ImageBk_cast}
                                            source={{uri: item.profile_path == "" ? API.cast : API.base_filter_img + item.profile_path}}/>
                                            <Text style= {styles.star_name}>
                                                {item.name}
                                            </Text>
                                            <Text style={styles.star_hero}>
                                                {item.hero}
                                            </Text>
                                        </View>                                
                                        )     
                                    }                    
                                })
                            }
                            </ScrollView>   
                        </View>
                    }                    
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: colors.subScreen
    },
    topControls: {
        position: 'absolute',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    back:{
        color: 'rgba(255,255,255,0.5)'
    },
    topControlFullScreen:{
        color: 'rgba(255,255,255,0.5)'
    },
    topControlItems:{
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        top: 0,
        right: 0,        
    },
    selectSeasonEpisode:{
        flexDirection: 'row',
        justifyContent: 'flex-end',      
    },
    picker: {
        height: 30,
        width: 100,
        color:'rgba(255,255,255,0.8)',
        transform: [
            {scaleX: 1},
            {scaleY: 1}
        ]
    },
    pickerItem: {
        transform: [
            {scaleX: 0.6},
            {scaleY: 0.6}
        ]
    },
    //scroll view
    poster: {
        flexDirection: 'row',
        width: screenWidth,
        height: (screenWidth/3-10)*424/300 + 25,
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
        // borderWidth: 1,
        // borderRadius: 2,
        // borderColor: '#616161',
        // borderTopWidth: 0,
        // borderLeftWidth: 0,
        // borderRightWidth: 0,        
        justifyContent: 'space-between'
      },
      cast: {
        flex: 1,
        width: screenWidth/4 - 10,
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
        justifyContent: 'space-around'
      },
      ImageBk_poster: {
        width: screenWidth/3,
        height: (screenWidth/3-10)*424/300,
        alignItems: 'baseline'
      },
      ImageBk_cast: {
        width: screenWidth/4 - 10,
        height: (screenWidth/4-10)*424/300,
        
        justifyContent: 'center',
        alignItems: 'center'
      },
      ImageBk_related: {
        width: screenWidth/2 - 10,
        height: (screenWidth/2-10)*424/300,
        
        justifyContent: 'center',
        alignItems: 'center'
      },
      dsc: {
        width:screenWidth*2/3,
        padding: 16,
      },
      title_related: {
        color: '#f9f9f9',
        fontSize: 12,
        marginBottom: 10
      },
      title: {
        color: '#f9f9f9',
        fontSize: 18,
        marginBottom: 15
      },
      duration_h: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      duration: {
        color: '#ffffff',
        fontSize: 10
      },
      item_description: {
        color: '#9f9f9f',
        fontSize: 10
      },
      stars: {
        width: screenWidth/4 - 10,
        backgroundColor: colors.movieItem,
        margin: 3,
        shadowColor: '#717a83',
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
      },
      star_name: {
          fontSize: 10,
          color: '#ffff'
      },
      star_hero: {
          fontSize: 8,
          color: 'rgba(255, 255, 255, 0.6)'
      },
      related:{
        flexDirection: 'row', 
        alignItems:'center', 
        justifyContent:'space-between',
      },
      MovieItem: {
        flex: 1,
        width: screenWidth/2 - 10,
        backgroundColor: colors.movieItem,
        marginBottom: 20,
        shadowColor: '#717a83',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1
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
      swiper: {
        height: (screenWidth/2)*424/300 + 60,
        marginTop: 10
      },
    div_header: {
        marginTop: 10,
        width: screenWidth,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0
    },
    div_header_r: {
        marginTop: 20,
        marginBottom: 25,
        width: screenWidth,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0
    },
    div_txt:{
        padding:5,
        fontSize: 18,
        color: '#9f9f9f'
    },
    sub_div_h: {
        marginTop: 10,
        marginLeft: 10,
        width: screenWidth
    },
    cast_sub: {
        padding:5,
        fontSize: 15,
        color: colors.textColor01
    },
    director :{
        marginLeft:15,
        fontSize: 12,
        color: 'rgb(50,72,200)'
    }
 });