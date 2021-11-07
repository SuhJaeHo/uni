import React, {Component} from 'react';
import {View, Text, Pressable, Dimensions, StyleSheet, Alert, BackHandler} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

import { firebase } from '@react-native-firebase/auth';
import auth from "@react-native-firebase/auth";
import RNExitApp from 'react-native-exit-app';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LOCAL_URL } from '@env';

export default class DropUser extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            id: '',
        }
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
        .then(() => BackHandler.exitApp())        
        //.then(() => RNExitApp.exitApp())
        .catch(function(error) {
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

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    render() {
        return (       
            <View >
                <TouchableHighlight 
                    onPress={() => this.dropUser()}
                    style={styles.buttonStyle}
                >
                    <Text style={styles.textStyle}>회원탈퇴</Text>                    
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        minWidth: 300,
        backgroundColor: "#1212",
        borderWidth: 0,
        color: "red",
        height: 40,            
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle:{
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold'
    }
}); 