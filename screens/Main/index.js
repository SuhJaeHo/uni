import React, {Component} from 'react';
import { View, Text, Alert, Button, Pressable, Dimensions, TextInput, Image, BackHandler} from 'react-native';
import { Platform, PermissionsAndroid } from 'react-native';

import BottomSheet from 'reanimated-bottom-sheet';
import ActionButton from 'react-native-action-button';
import Animated from 'react-native-reanimated';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';

import MyMapView from '../../Components/MyMapView';
import MainButton from '../../Components/MainButton';

import Moment from 'moment';
import 'moment/locale/ko';

import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { CometChat } from '@cometchat-pro/react-native-chat';

import { geo, LOCAL_URL } from '@env';

import { LogBox } from "react-native";

import styles from './styles';

const renderHeight = Dimensions.get('window').height * 0.8;

const region = 'us';

export default class Main extends Component {
     constructor(props) {
          super(props);
          this.state = {
               region: undefined,     
               roomInfo: undefined,
               hostsProfile: [],
               usersProfile: [],
               address: 0,
               id: '',
               push: 0,
               roomData: [],
               userData: [],
               GUID: [],
               hobbyList: [],               
               hobby: '',
               onFilter: false,   
               firstLoading: true, 
               
               check: false,    
               
               //trackview controll value
               cnt: 0,
               temp: 0,

               //bottom sheet
               isOpen: false,
          }
     }

     /*
     locatePermission = async() => {
          try {
               const granted = await PermissionsAndroid.request (
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                         'title': 'TEST',
                         'message': 'TEST',
                    }
               )

               if(granted === PermissionsAndroid.RESULTS.GRANTED) {
                    this.getCurrentLocation();
                    console.log('Granted')
               }else {
                    Alert.alert('Location Permission Not Granted');
               }
          } catch(err) {
               console.log(err);
          }
     }
     */

     componentDidMount = async() => {            
          if(this.props.route.params.params.params !== undefined) {               
               this.state.firstLoading = false;         
          }
          
          LogBox.ignoreAllLogs(true); 
          BackHandler.addEventListener('hardwareBackPress', this.backButtonClick); 
                                                      
          if(this.state.firstLoading) {   
               console.log('FIRSTLOADING');                                                         
               this.state.firstLoading = false;               
               this.getCurrentLocation();
          }else {
               this.hosted();
          }

          this.props.navigation.addListener('focus', async () => {                                                                   
               this.setState({ 
                    temp: 1,
               })   
               this.removeStorage();                                   
          })               
     }

     componentWillUnmount = async() => {
          BackHandler.removeEventListener('hardwareBackPress', this.backButtonClick);
     }

     backButtonClick = () => {         
          if(this.state.isOpen) {
               this.bs.current.snapTo(2);
               this.state.isOpen = false;
          }else {
               BackHandler.exitApp();
          } 
          
          return true;
     }

     removeStorage = async() => {
          await AsyncStorage.removeItem('check');
          await AsyncStorage.removeItem('category');
          await AsyncStorage.removeItem('title');
          await AsyncStorage.removeItem('time');
          await AsyncStorage.removeItem('timeInfo');
     }    
     
     connect = async() => {
          const id = await AsyncStorage.getItem('id');
          this.setState({id: id});

          var Interest = new Array();
          var hobbyList = new Array();

          const URL = `${LOCAL_URL}/main`;
          fetch(URL, {
               method: 'POST',
               headers: {
                    'Content-Type' : 'application/json',
               },
               body: JSON.stringify({
                    id: id,
                    onFilter: this.state.onFilter,
                    category: this.state.hobby,
               })            
          })
          .then(response => response.json())
          .then(responseData => {
               this.setState({
                    roomData: responseData[0],
                    userData: responseData[1],
                    GUID: responseData[2],
               })
     
               this.state.userData.map(userData => {
                    Interest = userData.hobby.split(',');       
               })                                        
          })
          .then(() => {                                             
               Interest.map((hobby, index) => {
                    hobbyList.push (                                   
                         <ActionButton.Item 
                              key={index} buttonColor='#49ffbd' 
                              onPress={() => 
                                   {                               
                                        this.state.cnt = 1;
                                        this.connectFilter(hobby); 
                                        this.state.hobby = hobby;
                                   }}
                         >
                              {
                                   hobby === '축구' ?                   
                                        <Image 
                                             style={{width: 34, height: 34, zIndex: 10}}
                                             source={require('../../assets/cateicon/soccer.png')}
                                        />
                                   : hobby === '농구' ?
                                        <Image 
                                             style={{width: 38, height: 38, zIndex: 10}}
                                             source={require('../../assets/cateicon/basketball.png')}
                                        />
                                   : hobby === '볼링' ?
                                        <Image  
                                             style={{width:38, height:38, zIndex:10}}   
                                             source={require('../../assets/cateicon/bowling.png')}
                                        />
                                   : hobby === '웨이트' ?
                                        <Image  
                                             style={{width:36, height:36, zIndex:10}}   
                                             source={require('../../assets/cateicon/weight.png')}
                                        />
                                   : hobby === '등산' ?
                                   <Image  
                                        style={{width:36, height:36, zIndex:10}}   
                                        source={require('../../assets/cateicon/hiking.png')}
                                   />
                                   : hobby === '런닝' ?
                                        <Image  
                                             style={{width:36, height:36, zIndex:10}}   
                                             source={require('../../assets/cateicon/running.png')}
                                        />
                                   : hobby === '골프' ?                                  
                                        <Image  
                                             style={{width:36, height:36, zIndex:10}}   
                                             source={require('../../assets/cateicon/golf.png')}
                                        />                                             
                                   : hobby === '탁구' ?                                  
                                        <Image  
                                             style={{width:36, height:36, zIndex:10}}   
                                             source={require('../../assets/cateicon/table-tennis.png')}
                                        />  
                                   : hobby === '술 한잔' ?
                                        <Image  
                                             style={{width:38, height:38, zIndex:10}}   
                                             source={require('../../assets/cateicon/drink.png')}
                                        />   
                                   : hobby === '언어교환' ? 
                                        <Image  
                                             style={{width:36, height:36, zIndex:10}}   
                                             source={require('../../assets/cateicon/language.png')}
                                        />   
                                   : hobby === '보드게임' ?
                                        <Image  
                                             style={{width:36, height:36, zIndex:10}}   
                                             source={require('../../assets/cateicon/board-game.png')}
                                        />                                                                                              
                                   : hobby === '리그오브레전드' ?                                  
                                        <Image  
                                             style={{width:36, height:36, zIndex:10}}   
                                             source={require('../../assets/cateicon/lol.png')}
                                        />
                                   : hobby === '배틀그라운드' ?                                  
                                        <Image  
                                             style={{width:36, height:36, zIndex:30, backgroundColor:'#fff', borderRadius:18}}   
                                             source={require('../../assets/cateicon/pubg.png')}
                                        />                                                                                                
                                   : hobby === '파티' ?                                                                 
                                        <Image  
                                             style={{width:36, height:36, zIndex:10}}   
                                             source={require('../../assets/cateicon/party.png')}
                                        />
                                   : <Text>{hobby}</Text>
                              }
                         </ActionButton.Item>                                                       
                    )                              
               });

               hobbyList.push (
                    <ActionButton.Item
                         key={"all"} buttonColor='#49ffbd'
                         onPress={() => 
                              {
                                   this.state.cnt = 1;
                                   this.connectFilter("all");
                                   this.state.hobby = "all";
                              }}
                    >
                         <FontAwesome 
                              name={"repeat"}
                              size={37}   
                              color={'#000'}
                         />
                    </ActionButton.Item>
               )

               if(this.state.GUID.length !== 0) {
                    this.deleteGroupChat(this.state.GUID);
               };
          })
          .then(() => {
               this.setState({
                    hobbyList: hobbyList,
               })
          })                      
     }

     deleteGroupChat = async(GUID) => {  
          GUID.map((data, index) => {
               CometChat.deleteGroup(data.GUID).then(
                    response => {
                         console.log("Groups deleted successfully:", response);
                    },
                    error => {
                         console.log("Group delete failed with exception:", error);
                    }
               )
          })                        
     }

     connectFilter = async(hobby) => {
          const id = await AsyncStorage.getItem('id');
          this.state.onFilter = true;                          
  
          const URL = `${LOCAL_URL}/main`;
          fetch(URL, {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                    id: id,
                    onFilter: this.state.onFilter,                    
                    category: hobby,                    
               })
          })
          .then(response => response.json())
          .then(responseData => {
               this.setState({
                    roomData: responseData[0],
                    userData: responseData[1]
               })
          })
     }      

     getCurrentLocation = async() => {            
          Geolocation.getCurrentPosition (               
               position => {                                                                           
                    this.setState({
                         region: {
                              latitude: position.coords.latitude,
                              longitude: position.coords.longitude,
                              latitudeDelta: 0.015,
                              longitudeDelta: 0.0121,
                         },                                                      
                    }),
                    Geocoder.init(geo, { language: 'ko' });
                    Geocoder.from(position.coords.latitude, position.coords.longitude)
                         .then(json => {
                              var address = json.results[0].formatted_address;
                              this.setState({
                                   address: address
                              });
                         });                                         
               },               
               error => console.log(error),               
               { enableHighAccuracy: false, timeout: 30000, maximumAge: 1000 },
          ) 

          this.setState({
               check: true,
          })
     }

     onMapRegionChange = async(region) => {                           
          this.state.cnt = 0;  
          this.state.temp = 0;        
          this.setState({region: region})
          Geocoder.init(geo, { language: 'ko' });
          await Geocoder.from(region.latitude, region.longitude)
          .then(json => {
               var address = json.results[0].formatted_address;
               this.setState({
                    address: address,
               });
          })          
     } 
     
     getRoomData = async(data) => { 
          var hostsProfile = new Array();
          var usersProfile = new Array();

          if(data !== undefined) {
               this.setState({roomInfo: data});    
               
               for(let i = 0; i < data.hostUser.length; i++) {
                    fetch(`${LOCAL_URL}/firstProfile/?id=` + data.hostUser[i] + "&time=" + new Date())
                    .then(responseData => {
                         if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {
                              hostsProfile.push(responseData.url);
                         }
                    })                   
                    .then(() => this.setState({hostsProfile: hostsProfile}));
               }

               for(let i = 0; i < data.joinUser.length; i++) {
                    if(data.hostUser[i] !== data.joinUser[i]) {
                         fetch(`${LOCAL_URL}/firstProfile/?id=` + data.joinUser[i]  + "&time=" + new Date())
                         .then(responseData => {
                              if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {                                            
                                   usersProfile.push(responseData.url);    
                              }
                         })                    
                         .then(() => this.setState({usersProfile: usersProfile}));                          
                    }                                                  
               }

               this.bs.current.snapTo(0); 
               this.state.isOpen = true;                         
          }else {
               this.setState({hostsProfile: null, usersProfile: null})
               this.bs.current.snapTo(2);
               this.state.isOpen = false;
          }
     }

     joinRoom = async(hostId, roomId) => {
          const URL = `${LOCAL_URL}/joinRoom`;
          fetch(URL, {
               method: 'POST',
               headers: {
                    'Content-Type' : 'application/json',                         
               },
               body: JSON.stringify({
                    requestId: this.state.id,
                    hostId: hostId,
                    roomId: roomId,
               }),
          })              
     }
     
     checkJoin = async() => {
          const URL = `${LOCAL_URL}/checkJoin`;
          fetch(URL, {
               method: 'POST',
               headers: {
                    'Content-Type' : 'application/json',
               },
               body: JSON.stringify({
                    id: this.state.id,
               }),
          })
          .then(response => response.json())
          .then(responseData => {
               this.setState({
                    push: responseData,
               })
          })
     }

     bs = React.createRef();
     renderContent = () => (    
          <View
             style={{flex: 0, backgroundColor: '#fff', padding: 20, height: renderHeight}}
          >
               {this.state.roomInfo !== undefined ? 
               /* ScrollView 끝에 잘리는거 수정 필요 */
               <View style={styles.roomContainer}>
                    <View style={styles.placeContainer}>                                                                   
                         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                              {this.state.hostsProfile !== null ?
                                   this.state.hostsProfile.map((data, index) => {
                                        return (
                                             <View key={index++}>
                                                  <Image 
                                                       source={{uri : data}}
                                                       style={{width: 50, height: 50, borderRadius: 25, borderWidth: 3, marginLeft: 7,}}
                                                       key={index++}
                                                  />
                                                  <Image style={{position: 'absolute', left: 26, top: 22, flex: 1, width: 30, height: 30,}} source={require('../../assets/crown/crown.png')} key={index++}/> 
                                             </View>
                                        )
                                   })
                              : null}
                              {this.state.usersProfile !== null ?                              
                                   this.state.usersProfile.map((data, index) => {                                                   
                                        return (                                                          
                                             <Image 
                                                  source={{uri : data}}
                                                  style={{width: 50, height: 50, borderRadius: 25, borderWidth: 3, marginLeft: 7,}}
                                                  key={index++}
                                             />                                                                                                                                                                                                                                                        
                                        )                                             
                                   }) 
                              : null}                              
                         </ScrollView>                                                                                     
                         <Text style={styles.placeText}>Place</Text>
                         <TextInput
                              style={styles.placeInfo}
                              value={this.state.roomInfo.address}
                              editable={false}
                         />
                    </View>
                    <View style={styles.categoryContainer}>
                         <Text style={styles.categoryText}>Category</Text>
                         <TextInput
                              style={styles.categoryInfo}
                              value={this.state.roomInfo.category}
                              editable={false}
                         />                         
                    </View>
                    <View style={styles.titleContainer}>
                         <Text style={styles.titleText}>Title</Text>
                         <TextInput
                              style={styles.titleInfo}
                              value={this.state.roomInfo.title}
                              editable={false}
                         />
                    </View>
                    <View style={styles.timeContainer}>
                         <Text style={styles.timeText}>Time</Text>
                         <TextInput
                              style={styles.timeInfo}
                              value={this.state.roomInfo.timeInfo}
                              editable={false}
                         />
                    </View>           
                    {this.state.id === this.state.roomInfo.id ?
                    <Pressable
                         onPress={() => this.props.navigation.push('Hosting', 
                              {
                                   _id: this.state.roomInfo._id, address: this.state.roomInfo.address, lat: this.state.roomInfo.latitude, lng: this.state.roomInfo.longitude, 
                                   category: this.state.roomInfo.category, title: this.state.roomInfo.title, time: JSON.stringify(this.state.roomInfo.time), timeInfo: this.state.roomInfo.timeInfo, Info: 'modify'
                              }
                         
                         )}                              
                         style={styles.modifyButton}
                    >
                         <Text>modify</Text>
                    </Pressable>                   
                    :
                    <TouchableOpacity>
                         <Pressable
                              onPress={() => this.joinRoom(this.state.roomInfo.id, this.state.roomInfo._id)}
                              style={styles.joinButton}
                         >
                              <Text>join</Text>
                         </Pressable>  
                    </TouchableOpacity>
                    }                             
               </View>                                           
               : null}
          </View>          
     )

     //메인버튼 3개
     navigate = async(screen) => {
          if(screen === 'Hosting') {               
               this.props.navigation.push('Hosting', {address: this.state.address, lat: this.state.region.latitude, lng: this.state.region.longitude, Info: 'place'})
          }else if(screen === 'Room') {
               this.props.navigation.navigate('RoomList');
               this.checkJoin();               
          }else if(screen === 'Chat') {
               this.props.navigation.navigate('Chat');
          }
     }

     //방 만들었을 때 방 만든 주소를 중심으로 지도를 띄운다.
     hosted = () => {                    
          this.setState({
               region: {
                    latitude: parseFloat(this.props.route.params.params.params.lat),
                    longitude: parseFloat(this.props.route.params.params.params.lng),
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
               },
          });    

          console.log(this.state.region);
     } 

     render() {
          return (
               <View style={{width: '100%', height: Dimensions.get('window').height}}>                                      
                    <MyMapView
                         region={this.state.region}
                         onRegionChange={(reg) => this.onMapRegionChange(reg)}  
                         getLocation={() => this.getCurrentLocation()}
                         connect={this.connect}                       
                         connectFilter={this.connectFilter}
                         sendData={this.getRoomData}
                         onFilter={this.state.onFilter}
                         roomData={this.state.roomData}                         
                         hobby={this.state.hobby}
                         check={this.state.check}
                         cnt={this.state.cnt}
                         temp={this.state.temp}
                    >
                    </MyMapView>                    
                    <ActionButton 
                         size={48}
                         buttonColor="#fb009e" 
                         verticalOrientation="down"
                         renderIcon={active => active ? 
                              (<Ionicons name="ios-funnel-sharp" style={styles.actionButtonIconOpen}/>) : (<Ionicons name="ios-funnel-sharp" style={styles.actionButtonIconClose}/>)}
                         style={styles.actionButtonIcon} 
                    >
                        {this.state.hobbyList}  
                    </ActionButton>                                     
                    <MainButton                         
                         navigate={this.navigate}   
                         push={this.state.push}                      
                    >
                    </MainButton>                
                    <BottomSheet
                         ref={this.bs}
                         renderContent={this.renderContent}
                         snapPoints={[renderHeight, 450, 0]}
                         initialSnap={2}
                         borderRadius={10}
                         enabledContentTapInteraction={false}
                    />
               </View>  
          )
     }
}