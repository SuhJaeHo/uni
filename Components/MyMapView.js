import React, {Component} from 'react';
import { View, Pressable, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import Svg, { Image as Imagesvg } from 'react-native-svg';
import FastImage from 'react-native-fast-image';

import AsyncStorage from '@react-native-async-storage/async-storage';

import MapView, { Marker } from 'react-native-maps';
import ActionButton from 'react-native-action-button';
import Animated from 'react-native-reanimated';

import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

import { CometChat } from '@cometchat-pro/react-native-chat';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Foundation from 'react-native-vector-icons/Foundation';

import style from '../lib/chat/cometchat-pro-react-native-ui-kit-3/src/components/Groups/CometChatViewGroupMemberListItem/style';

export default class MyMapView extends Component {
    constructor(props){
        super(props);
        this.state = {
            region: {
                latitude: 37.49783315274643, 
                longitude: 127.02783092726877,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,  
            },
            id: '',
            roomData: [],
            userData: [],            
            hobbyList: [],
            hobby: '',
            onFilter: false,
            check: 0,            

            dragCount: 0,
            pressedCurrentBtn: false,
            trackView: true,
            firstLoading: true,
        }
    }

    componentDidMount = async() => {         
        this.removeStorage();  
    }

    removeStorage = async() => {
        await AsyncStorage.removeItem('check');
        await AsyncStorage.removeItem('category');
        await AsyncStorage.removeItem('title');
        await AsyncStorage.removeItem('time');
        await AsyncStorage.removeItem('timeInfo');
    }

    createMarker = () => {        
        let marker = []
        var key = 0;                 

        if(this.props.hobby !== '' && this.props.cnt === 1) {         
            this.state.trackView = true;
        }else if(this.state.firstLoading) {
            this.state.firstLoading = false;
        }else if(this.props.temp === 1) {            
            this.state.trackView = true;
        }

        if(this.props.roomData.length === 0) {
            this.state.trackView = true;
        }        

        for(let index = 0; index < this.props.roomData.length; index++) {            
            this.props.roomData.map(roomInfo => marker.push (                  
                <Marker
                    coordinate={{latitude: roomInfo.latitude, longitude: roomInfo.longitude}}
                    onPress={() => {                        
                        this.props.sendData(roomInfo);                    
                    }}
                    key={key++}                
                    tracksViewChanges={this.state.trackView}                                                                                                                                                                                                 
                >
                    {roomInfo.category === '축구' ?
                    <View style={{justifyContent: 'center', alignItems: 'center', height: 100, width: 55}}>
                        <Image
                            style={{resizeMode: 'contain', width: 50, position: 'absolute'}}                            
                            source={require('../assets/pin/ping.png')}    
                            onLoadStart={() => this.state.trackView = false}                                    
                        />
                        <Image  
                            style={{ width:38, height:38, zIndex:10, marginBottom:8, borderRadius:19 }}   
                            source={require('../assets/cateicon/soccer.png')}
                            onLoadStart={() => this.state.trackView = false}                             
                        />
                    </View>
                    : roomInfo.category === '농구' ? 
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 100, width: 55 }}>
                        <Image style={{resizeMode: 'contain', width: 50, position: 'absolute'}} source={require('../assets/pin/ping.png')} onLoadStart={() => this.state.trackView = false}/>
                        <Image  
                            style={{ width:40, height:40, zIndex:10, marginBottom:8, borderRadius:19 }}   
                            source={require('../assets/cateicon/basketball.png')}
                            onLoadStart={() => this.state.trackView = false} 
                        />
                    </View>
                    : roomInfo.category === '볼링' ?
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 100, width: 55 }}>
                        <Image style={{resizeMode: 'contain', width: 50, position: 'absolute'}} source={require('../assets/pin/ping.png')}/>
                        <Image  
                            style={{ width:38, height:38, zIndex:10, marginBottom:8, borderRadius:19 }}   
                            source={require('../assets/cateicon/bowling.png')}
                            onLoadStart={() => this.state.trackView = false} 
                        />
                    </View>   
                    : roomInfo.category === '등산' ?
                    <View style={{ justifyContent:'center', alignItems:'center', height: 100, width: 55 }} >
                        <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/pin/ping.png')}/>
                        <Image  
                            style={{ width:38, height:38, zIndex:10, marginBottom:8, borderRadius:19 }}   
                            source={require('../assets/cateicon/hiking.png')}
                            onLoadStart={() => this.state.trackView = false} 
                        />
                    </View>
                    : roomInfo.category === '웨이트' ?
                    <View style={{ justifyContent:'center', alignItems:'center', height: 100, width: 55 }} >
                        <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/pin/ping.png')}/>
                        <Image  
                            style={{ width:38, height:38, zIndex:10, marginBottom:8, borderRadius:19 }}   
                            source={require('../assets/cateicon/weight.png')}
                            onLoadStart={() => this.state.trackView = false} 
                        />
                    </View>
                    : roomInfo.category === '런닝' ?
                    <View style={{ justifyContent:'center', alignItems:'center', height: 100, width: 55 }} >
                        <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/pin/ping.png')} onLoadStart={() => this.state.trackView = false}/>
                        <Image  
                            style={{ width:38, height:38, zIndex:10, marginBottom:8, borderRadius:19 }}   
                            source={require('../assets/cateicon/running.png')}
                            onLoadStart={() => this.state.trackView = false}                                                                       
                        />
                    </View>
                    : roomInfo.category === '골프' ?
                    <View style={{ justifyContent:'center', alignItems:'center', height: 100, width: 55 }} >
                        <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/pin/ping.png')}/>
                        <Image  
                            style={{ width:38, height:38, zIndex:10, marginBottom:8, borderRadius:19 }}   
                            source={require('../assets/cateicon/golf.png')}
                            onLoadStart={() => this.state.trackView = false} 
                        />
                    </View>
                    : roomInfo.category === '탁구' ?
                    <View style={{ justifyContent:'center', alignItems:'center', height: 100, width: 55 }} >
                        <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/pin/ping.png')}/>
                        <Image  
                            style={{ width:38, height:38, zIndex:10, marginBottom:8, borderRadius:19 }}   
                            source={require('../assets/cateicon/table-tennis.png')}
                            onLoadStart={() => this.state.trackView = false} 
                        />
                    </View>
                    : roomInfo.category === '술 한잔' ?
                    <View style={{ justifyContent:'center', alignItems:'center', height: 100, width: 55 }} >
                        <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/pin/ping.png')}/>
                        <Image  
                            style={{ width:38, height:38, zIndex:10, marginBottom:8, borderRadius:19 }}   
                            source={require('../assets/cateicon/drink.png')}
                            onLoadStart={() => this.state.trackView = false} 
                        />
                    </View>
                    : roomInfo.category === '배틀그라운드' ? 
                    <View style={{ justifyContent:'center', alignItems:'center', height:100, width:55 }} >
                        <Image style={{resizeMode:'contain', width:50, position:'absolute'}} source={require('../assets/pin/ping.png')}/>
                        <Image  
                            style={{ width:36, height:38, zIndex:38, marginBottom:7, backgroundColor:'#fff', borderRadius:19, padding:5 }}   
                            source={require('../assets/cateicon/pubg.png')}
                            onLoadStart={() => this.state.trackView = false} 
                        />                                                                    
                    </View>
                    : roomInfo.category === '리그오브레전드' ? 
                    <View style={{ justifyContent:'center', alignItems:'center', height: 100, width: 55 }} >
                        <Image style={{resizeMode:'contain', width:50, position:'absolute'}} source={require('../assets/pin/ping.png')}/>
                        <Image  
                            style={{ width:36, height:38, zIndex:38, marginBottom:8, borderRadius:19 }}   
                            source={require('../assets/cateicon/lol.png')}
                            onLoadStart={() => this.state.trackView = false} 
                        />                                                                    
                    </View>
                    : roomInfo.category === '언어교환' ? 
                    <View style={{ justifyContent:'center', alignItems:'center', height: 100, width: 55 }} >
                        <Image style={{resizeMode:'contain', width:50, position:'absolute'}} source={require('../assets/pin/ping.png')}/>
                        <Image  
                            style={{ width:36, height:38, zIndex:38, marginBottom:8, borderRadius:19 }}   
                            source={require('../assets/cateicon/language.png')}
                            onLoadStart={() => this.state.trackView = false} 
                        />                                                                    
                    </View>
                    : roomInfo.category === '보드게임' ? 
                    <View style={{ justifyContent:'center', alignItems:'center', height: 100, width: 55 }} >
                        <Image style={{resizeMode:'contain', width:50, position:'absolute'}} source={require('../assets/pin/ping.png')}/>
                        <Image  
                            style={{ width:36, height:38, zIndex:38, marginBottom:8, borderRadius:19 }}   
                            source={require('../assets/cateicon/board-game.png')}
                            onLoadStart={() => this.state.trackView = false} 
                        />                                                                    
                    </View>
                    : roomInfo.category === '파티' ? 
                    <View style={{ justifyContent:'center', alignItems:'center', height: 100, width: 55 }} >
                        <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/pin/ping.png')}/>
                        <Image  
                            style={{ width:38, height:38, zIndex:10, marginBottom:8, borderRadius:19 }}   
                            source={require('../assets/cateicon/party.png')}
                            onLoadStart={() => this.state.trackView = false} 
                        />                       
                    </View>                 
                    : null}
                </Marker>
            ))
        }
        
        return marker;
    }     

    render() {        
        let marker = <View style={{top: '50%', left: '50%', marginLeft: -15, marginTop: -40, position: 'absolute'}}>
                        <Image style={{height: 50, resizeMode:'contain'}} source={require('../assets/marker/mpin.png')}/>   
                     </View>                 

        let region; 

        return (    
            <View>                                                                  
                {this.state.dragCount === 0 ?                                                 
                <View>                                                            
                    <MapView                  
                        style={{width: '100%', height: '100%'}}                                            
                        showsUserLocation={true}   
                        showsMyLocationButton={false}                                                                                                                   
                        region={this.props.region}                                                       
                        onPanDrag={() => this.state.dragCount += 1}                      
                        onRegionChangeComplete={(reg) => {
                            region = reg;                                
                            this.props.onRegionChange(reg);                                                           
                            
                            if(!this.props.onFilter) {
                                this.props.connect();
                            }else{
                                this.props.connectFilter(this.props.hobby);
                            }
                        }}                             
                        onPress={() => this.props.sendData(undefined)}                    
                    >                    
                        {this.createMarker()}                                                                                  
                    </MapView>                
                    {marker}   
                </View>
                :
                <View>                                                            
                    <MapView
                        ref={ref => {this.map = ref}}
                        style={{width: '100%', height: '100%'}}                    
                        showsUserLocation={true}    
                        showsMyLocationButton={false}                                                                                            
                        region={this.state.pressedCurrentBtn === true ? this.props.region : region}                            
                        onRegionChangeComplete={(reg) => {   
                            this.setState({pressedCurrentBtn: false})                            
                            this.props.onRegionChange(reg);
                            region = reg;

                            if(!this.props.onFilter) {
                                this.props.connect();
                            }else{
                                this.props.connectFilter(this.props.hobby);
                            }
                        }}                             
                        onPress={() => this.props.sendData(undefined)}                    
                    >                    
                        {this.createMarker()}                                                                                  
                    </MapView>                
                    {marker}
                    <TouchableOpacity
                        style={styles.locationBtn}
                        onPress={() => {
                            this.props.getLocation();                                                               
                            this.state.pressedCurrentBtn = true;                                
                        }}
                    >
                        <Text>
                            <Ionicons name="ios-locate" color="grey" size={30} /> 
                        </Text>
                    </TouchableOpacity>                            
                </View>                
                }                                
            </View>
        )                  
    }    
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        position: 'absolute',
        top: -20,
        right: -10     
    },
    locationBtn:{
        position: 'absolute', 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: 40, 
        height: 40, 
        backgroundColor: 'white', 
        right: 25,
        bottom: 120, 
        borderRadius: 20,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 3, width: 3 },
    },
    marker: {
        resizeMode: 'contain', width: 50, position: 'absolute'
    }
  });