import React, {Component} from 'react';
import {View, Text, Pressable, Dimensions, StyleSheet, Alert, BackHandler} from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

import auth from "@react-native-firebase/auth";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { CometChat } from '@cometchat-pro/react-native-chat';

import { LOCAL_URL, CHAT_APPID, CHAT_APIKEY } from '@env';

export default class DropUser extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            GUID: [],
        }
    }    

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );

        this.connect();
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    connect = async() => {
        var id = await AsyncStorage.getItem('id');

        const URL = `${LOCAL_URL}/chatInfo`;
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                id: id,                
            })
        })
        .then(response => response.json())
        .then(responseData => {
            this.setState({
                GUID: responseData
            })
        })
    }

    deleteGroup = async(GUID) => {
        CometChat.deleteGroup(GUID).then(
            response => {
                 console.log("Groups deleted successfully:", response);
            },
            error => {
                 console.log("Group delete failed with exception:", error);
            }
        )
    }

    leaveGroup = async(GUID) => {
        CometChat.leaveGroup(GUID).then(
            response => {
                 console.log("Leave group successfully:", response);
            },
            error => {
                 console.log("Leave group failed with exception:", error);
            }
        )     
    }

    dropFunc = async() => {
        const user = auth().currentUser;
        var id = await AsyncStorage.getItem('id');    

        const URL = `${LOCAL_URL}/dropUser`;

        user.delete().then(() => {
            fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    id: id,                
                })
            })  
            console.log('User Deleted Successfully');                                           
        })
        .then(() => {
            const url = 'https://api-us.cometchat.io/v3.0/users/' + id;
            fetch(url, {
                method: 'DELETE',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json', appId: CHAT_APPID, apiKey: CHAT_APIKEY},
                body: JSON.stringify({permanent: true})
            })
            .then(response => response.json())
            .then(responseData => console.log(responseData))  
        })
        .then(() => {            
            for(let i = 0; i < this.state.GUID.length; i++) {
                //탈퇴하는 회원이 방의 호스트 일 경우
                if(this.state.GUID[i].hostUser.length === 1 && this.state.GUID[i].hostUser.indexOf(id) > -1) {
                    this.deleteGroup(this.state.GUID[i].GUID);
                //탈퇴하는 회원이 방의 참가자 일 경우                    
                }else {
                    this.leaveGroup(this.state.GUID[i].GUID);
                }                
            }
        })
        .then(() => BackHandler.exitApp())        
        //.then(() => RNExitApp.exitApp())
        .catch(function(error) {
            console.log(error);
            Alert.alert('Login again please');
        }) 
    }

    dropUser = () => {    
        Alert.alert (
            "회원탈퇴",
            "탈퇴 하시겠습니까?",
            [
                {
                    text: "아니요",
                    onPress: () => {
                    return null;
                    },
                },
                {
                    text: "네",
                    onPress: () => {
                        this.dropFunc();
                    },
                },
            ],            
        );
    }

    backAction = () => {
        Alert.alert("탈퇴 하시겠습니까?", [
            {
                text: "아니요",
                onPress: () => null,
                style: "cancel"
            },
            { text: "네", onPress: () => this.dropUser() }
        ]);
        return true;
    };    

    render() {
        return (       
            <View>
                <TouchableOpacity 
                    onPress={() => this.dropUser()}
                    //style={styles.buttonStyle}
                >
                    <Text>회원탈퇴</Text>                    
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        minWidth: Dimensions.get('screen').width * 0.3,
        height: Dimensions.get('screen').height * 0.06,
        backgroundColor: "#1212",
        borderWidth: 0,
        color: "red",                    
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle:{
        color: '#fb009e',
        paddingVertical: 10,
        fontSize: Dimensions.get('screen').height * 0.025,
        fontWeight: 'bold'
    }
}); 