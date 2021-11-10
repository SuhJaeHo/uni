import React, { Component } from 'react';
import {Text, View, SafeAreaView, TextInput, Pressable, Alert, ImageBackground, BackHandler} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';
import 'moment/locale/ko';

import { CometChat } from '@cometchat-pro/react-native-chat';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


import { LOCAL_URL } from '@env';

import { LogBox } from "react-native";

import styles from './styles';

export default class Hosting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            room: {
                
            },
            check: '',
        }
    }

    componentDidMount = async() => {
        LogBox.ignoreAllLogs(true);  
        this.asyncStorage();

        this.props.navigation.addListener('focus', async () => {
            BackHandler.addEventListener('hardwareBackPress', this.backButtonClick);  
        });     
    }

    componentWillUnmount = async() => {
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonClick);
    }

    backButtonClick = () => {
        this.props.navigation.navigate('DrawerNav');
        return true;
    }

    asyncStorage = async() => {        
        if(this.props.route.params.Info === 'modify') {
            await AsyncStorage.setItem('check', this.props.route.params.Info);            
            await AsyncStorage.setItem('_id', this.props.route.params._id);
            await AsyncStorage.setItem('lat', JSON.stringify(this.props.route.params.lat));
            await AsyncStorage.setItem('lng', JSON.stringify(this.props.route.params.lng));
            await AsyncStorage.setItem('address', this.props.route.params.address);            
            await AsyncStorage.setItem('category', this.props.route.params.category);
            await AsyncStorage.setItem('title', this.props.route.params.title);
            await AsyncStorage.setItem('time', JSON.parse(this.props.route.params.time));
            await AsyncStorage.setItem('timeInfo', this.props.route.params.timeInfo);
        }else if(this.props.route.params.Info === 'place') {    
            if(this.props.route.params.address !== null) {        
                console.log(this.props.route.params.lat);
                console.log(this.props.route.params.lng);
                await AsyncStorage.setItem('address', this.props.route.params.address);
                await AsyncStorage.setItem('lat', JSON.stringify(this.props.route.params.lat));
                await AsyncStorage.setItem('lng', JSON.stringify(this.props.route.params.lng));
            }
        }else if(this.props.route.params.Info === 'category') {
            if(this.props.route.params.category !== ''){
                await AsyncStorage.setItem('category', this.props.route.params.category);
            }
        }else if(this.props.route.params.Info === 'time') {
            await AsyncStorage.setItem('time', JSON.parse(this.props.route.params.time));
            await AsyncStorage.setItem('timeInfo', this.props.route.params.timeInfo);
        } 
        
        try {                        
            const _id = await AsyncStorage.getItem('_id');
            const check = await AsyncStorage.getItem('check');

            const id = await AsyncStorage.getItem('id');
            const address = await AsyncStorage.getItem('address');
            const lat = await AsyncStorage.getItem('lat');
            const lng = await AsyncStorage.getItem('lng');
            const category = await AsyncStorage.getItem('category');
            const title = await AsyncStorage.getItem('title');

            var getTime = await AsyncStorage.getItem('time');

            var time = new Date(getTime);
            time.setHours(time.getHours() + 9); 
            const timeInfo = await AsyncStorage.getItem('timeInfo');

            var chatLimit = new Date(getTime);       
            chatLimit.setHours(chatLimit.getHours() + 11);            
            this.setState({
                room: {
                    id: id,
                    address: address,
                    lat: lat,
                    lng: lng,
                    category: category,
                    title: title,
                    time: time,                                      
                    timeInfo: timeInfo,
                    chatLimit: chatLimit,  
                },
                check: check,         
                _id: _id,       
            })
        } catch(e) {
            console.log(e);
        }
    }    

    //수정필요
    onChangeText = async(text) => {
        await AsyncStorage.setItem('title', text);    
        const title = await AsyncStorage.getItem('title');
        
        this.state.room.title = title;
    }

    createRoom = async() => {        
        const {id, address, lat, lng, category, title, time, timeInfo, chatLimit} = this.state.room;
        var GUID = Moment(new Date()).format('MMDD_HHmmss');

        const URL = `${ LOCAL_URL }/createRoom`;
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                address: address,
                lat: lat,
                lng: lng,                
                category: category,
                title: title,
                time: time,
                timeInfo: timeInfo,
                chatLimit: chatLimit,
                GUID: GUID,
            })
        })
        .then(() => this.props.navigation.navigate('DrawerNav'))
    }

    modifyRoom = async() => {
        const {_id} = this.state;
        const {address, lat, lng, category, title, time, timeInfo} = this.state.room;
        
        const URL = `${ LOCAL_URL }/modifyRoom`;
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: _id,
                address: address,
                lat: lat,
                lng: lng,
                category: category,
                title: title,
                time: time,
                timeInfo: timeInfo,
            })
        })
        .then(this.props.navigation.push('DrawerNav'));
        
        //this.props.navigation.push('Main', {lat: this.state.room.lat, lng: this.state.room.lng})
    }

    hosting = async() => {
        if(this.state.room.address === null) {            
            Alert.alert('지역을 설정하세요');
        }else if(this.state.room.category === null) {
            Alert.alert('카테고리를 설정하세요');
        }else if(this.state.room.title === null) {
            Alert.alert('제목을 입력하세요');
        }else if(this.state.room.time === null) {
            Alert.alert('시간을 설정하세요');
        }else {
            this.createRoom();  
            this.props.navigation.push('DrawerNav', {lat: this.state.room.lat, lng: this.state.room.lng})                                  
        }        
    }  
    
    //방 생성과 동시에 그룹 채팅 생성
    createGroup = () => {
        var GUID = Moment(new Date()).format('MMDD_HHmmss');
        var groupName = this.state.room.title;
        var groupType = CometChat.GROUP_TYPE.PUBLIC;
        var password = "";
        var icon;

        if(this.state.room.category === '축구') {            
            icon = 'https://cdn.pixabay.com/photo/2014/10/14/20/24/soccer-488700_960_720.jpg';
        }else if(this.state.room.category === '농구') {
            icon = 'https://cdn.pixabay.com/photo/2015/05/15/14/49/basketball-768713_960_720.jpg';
        }else if(this.state.room.category === '테니스') {
            icon = 'https://cdn.pixabay.com/photo/2016/11/29/01/14/athletes-1866487_960_720.jpg';
        }else if(this.state.room.category === '탁구') {
            icon = 'https://cdn.pixabay.com/photo/2019/03/07/16/40/table-tennis-4040584_960_720.jpg';
        }else if(this.state.room.category === '풋살') {
            icon = 'https://t4.ftcdn.net/jpg/02/51/90/51/240_F_251905127_onmn1GR6Gmq7WXzIsA0WRWQ7atoQEgkt.jpg';
        }else if(this.state.room.category === '볼링') {
            icon = 'https://cdn.pixabay.com/photo/2014/01/03/02/48/bowling-237905_960_720.jpg';
        }
        
        var group = new CometChat.Group(GUID, groupName, groupType, password, icon);

        CometChat.createGroup(group).then (
            group => {
                console.log("Group created successfully:", group);
            },
            error => {
                console.log("Group creation failed with exception:", error);
            }    
        )
    }

    render() {
        return (
            <View style={styles.hostingContainer}>          
                <ImageBackground
                    source={require("../../../assets/imgs/3.png")} resizeMode="cover" 
                    style={{ width:"100%", height:'100%' }}
                >
                    <SafeAreaView >
                        <View style={styles.headerConatiner}>
                            <View style={styles.backIcon}>
                                <Pressable
                                    onPress={() => this.props.navigation.navigate('DrawerNav')}
                                    style={styles.backIcon}
                                >
                                    <TouchableOpacity>
                                        <Ionicons                        
                                            name={"ios-chevron-back"}
                                            size={30}
                                            color={'black'}
                                            style={{marginRight: 22, marginLeft: 10}}
                                            //onPress={() => this.props.navigation.push('Hosting', {time: JSON.stringify(this.state.dateTime), timeInfo: this.state.showTime, Info: 'time'})}
                                        />
                                    </TouchableOpacity>                               
                                </Pressable>
                                {this.state.check === 'modify' 
                                ? 
                                <Text style={styles.headerText}>수정</Text>
                                : 
                                <Text style={styles.headerText}>호스트</Text>
                                }    
                            </View>                                                                  
                        </View>      
                        <View style={styles.contentContainer}>
                            <View style={styles.categoryContainer}>
                                <Text style={styles.categoryText}>Category</Text>
                                <Pressable
                                    style={styles.categoryInput}
                                    onPress={() => this.props.navigation.push('Category')}
                                >
                                    {this.state.room.category === null ?
                                    <TouchableOpacity>
                                        <Text>카테고리 설정</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity>
                                        <Text>{this.state.room.category}</Text>
                                    </TouchableOpacity>
                                    }
                                </Pressable>
                            </View>
                            <View style={styles.placeContainer}>
                                <Text style={styles.placeText}>Place</Text>
                                <Pressable
                                    style={styles.placeInput}
                                    onPress={() => this.props.navigation.navigate('LocationSearch')}
                                >                            
                                    <TouchableOpacity>
                                        <Text>{this.state.room.address}</Text>                            
                                    </TouchableOpacity>
                                </Pressable>
                            </View>                    
                            <View style={styles.titleConatiner}>
                                <Text style={styles.titleText}>Title</Text>
                                <TextInput
                                    style={styles.titleInput}
                                    autoCapitalize="none"
                                    onChangeText={text => this.onChangeText(text)}
                                    value={this.state.room.title}
                                />
                            </View>
                            <View style={styles.timeConatiner}>
                                <Text style={styles.timeText}>Time</Text>
                                <Pressable
                                    style={styles.timeInput}
                                    onPress={() => this.props.navigation.navigate('Time')}
                                >                                      
                                    <TouchableOpacity style={styles.timeInfo}>
                                        <Text style={styles.timePlaceHolder}>약속시간 설정</Text>
                                        <Text>{this.state.room.timeInfo}</Text>
                                    </TouchableOpacity>                                                                
                                </Pressable>                        
                            </View>
                            {this.state.check === 'modify' ?
                            <TouchableOpacity>
                                <Pressable
                                    style={styles.modifyButton}  
                                    onPress={() => this.modifyRoom()}                           
                                >
                                    <Text style={{color:'#000', fontSize:25, fontWeight:'bold'}}>수정</Text>
                                </Pressable>
                            </TouchableOpacity>
                            :   
                            <TouchableOpacity>     
                                <Pressable
                                    style={styles.hostButton}
                                    onPress={() => {this.hosting(); this.createGroup();}}                        
                                >                                
                                    <Text style={{color:'#000', fontSize:25, fontWeight:'bold'}}>호스팅</Text>                                
                                </Pressable>
                            </TouchableOpacity>
                            }
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </View>
        )
    }
}