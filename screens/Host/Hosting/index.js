import React, { Component } from 'react';
import {Text, View, SafeAreaView, TextInput, Pressable, Alert, ImageBackground} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';
import 'moment/locale/ko';

import { CometChat } from '@cometchat-pro/react-native-chat';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
        this.asyncStorage();
    }

    asyncStorage = async() => {
        if(this.props.route.params.Info === 'modify') {
            await AsyncStorage.setItem('check', this.props.route.params.Info);
            
            await AsyncStorage.setItem('_id', this.props.route.params._id);
            await AsyncStorage.setItem('address', this.props.route.params.address);
            await AsyncStorage.setItem('lat', JSON.stringify(this.props.route.params.lat));
            await AsyncStorage.setItem('lng', JSON.stringify(this.props.route.params.lng));
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
            const time = await AsyncStorage.getItem('time');
            const timeInfo = await AsyncStorage.getItem('timeInfo');
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
        const {id, address, lat, lng, category, title, time, timeInfo} = this.state.room;
        var GUID = Moment(new Date()).format('MMDD_HHmmss');

        //const URL = "http://localhost:3000/createRoom";
        const URL = "http://10.0.2.2:3000/createRoom";
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
                GUID: GUID,
            })
        })
        .then(() => this.props.navigation.navigate('DrawerNav'))
    }

    modifyRoom = async() => {
        const {_id} = this.state;
        const {address, lat, lng, category, title, time, timeInfo} = this.state.room;
        
        //const URL = "http://localhost:3000/modifyRoom";
        const URL = "http://10.0.2.2:3000/modifyRoom";
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
        
        this.props.navigation.push('Main', {lat: this.state.room.lat, lng: this.state.room.lng})
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
            this.props.navigation.navigate('DrawerNav');
            //this.props.navigation.push('DrawerNav', {lat: this.state.room.lat, lng: this.state.room.lng})          
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
                            <MaterialIcons name={"arrow-back-ios"} 
                                size={35} 
                                color={'#000'}
                                style={{marginLeft:30}}
                            />                                
                            </Pressable>
                        </View>
                    
                        <View style={styles.headerTextContainer}>
                            {this.state.check === 'modify' 
                            ? 
                            <Text style={styles.headerText}>Modify</Text>
                            : 
                            <Text style={styles.headerText}>Hosting</Text>
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
                            <Text>카테고리 설정</Text>
                            :
                            <Text>{this.state.room.category}</Text>
                            }
                        </Pressable>
                    </View>
                    <View style={styles.placeContainer}>
                        <Text style={styles.placeText}>Place</Text>
                        <Pressable
                            style={styles.placeInput}
                            onPress={() => this.props.navigation.navigate('LocationSearch')}
                        >                            
                            <Text>{this.state.room.address}</Text>                            
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
                            <View style={styles.timeInfo}>
                                <Text style={styles.timePlaceHolder}>약속시간 설정</Text>
                                <Text>{this.state.room.timeInfo}</Text>
                            </View>                                                                
                        </Pressable>
                        
                    </View>
                    {this.state.check === 'modify' ?
                    <Pressable
                        style={styles.modifyButton}  
                        onPress={() => this.modifyRoom()}                           
                    >
                        <Text>Complete</Text>
                    </Pressable>
                    :        
                    <Pressable
                        style={styles.hostButton}
                        onPress={() => {this.hosting(); this.createGroup();}}                        
                    >
                        <Text style={{color:'#000', fontSize:25, fontWeight:'bold'}}>Hosting</Text>
                    </Pressable>
                    }
                </View>
                </SafeAreaView>
                </ImageBackground>
            </View>
        )
    }
}