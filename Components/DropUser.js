import React, {Component} from 'react';
import {View, Text, Pressable, Dimensions, StyleSheet, Alert} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

import { firebase } from '@react-native-firebase/auth';
import auth from "@react-native-firebase/auth";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { LOCAL_URL } from '@env';

export default class DropUser extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            id: '',
        }
    }

    dropUser = async() => {
        var user = firebase.auth().currentUser;
        var id = await AsyncStorage.getItem('id');
        const URL = `${LOCAL_URL}/dropUser`;

        user.delete().then(() => {
            console.log('User Deleted Successfully');
            fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    id: id,                
                })
            })
        }).catch(function(error) {
            Alert.alert(error.message);
        })                     
    }

    render() {
        return (       
            <View>
                <TouchableHighlight 
                    onPress={() => this.dropUser()}
                >
                    <Text>회원탈퇴</Text>                    
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
});