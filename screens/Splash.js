import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Image,
  PermissionsAndroid
} from "react-native";

import auth from "@react-native-firebase/auth";
import RNBootSplash from "react-native-bootsplash";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { CometChat } from '@cometchat-pro/react-native-chat';

import {CHAT_APPID, CHAT_AUTHKEY} from '@env'

const SplashScreen = ({ navigation }) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  //chatting  
  const appID = CHAT_APPID;
  const region = 'us';
  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build();

  React.useEffect(() => {   
    checkPermission();
  }, []);
  
  const checkPermission = async() => {
    var count = 0;

    await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
      if(result !== 'granted') {
        console.log(result);
        count += 1;
      }
    })

    await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((result) => {
      if(result !== 'granted') {
        console.log(result);
        count += 1;     
      }
    })

    await navigator(count)
  }

  const navigator = async(count) => {
    console.log('카운트 : ' + count);
    if(count === 0) {
      setTimeout(() => {
        navigation.replace (
          auth().currentUser ? "DrawerNav" : "Auth"
        );

        auth().currentUser ? chatInit() : console.log('Login Please');
      }, 1);
    }else {
      setTimeout(() => {
        navigation.replace (
          "PermissionScreen"  
        );    
      }, 1);
    }  
  }

  const chatInit = async() => {    
    var id = await AsyncStorage.getItem('id');

    CometChat.init(appID, appSetting).then(
      () => {
        console.log('Initialization completed successfully');
      },
      (error) => {
        console.log('Initialization failed with error:', error);
      },
    ).then(
      CometChat.login(id, CHAT_AUTHKEY).then (
        User => {
          console.log("Login Successful:", { User });
        },
        error => {
          console.log("Login failed with exception:", { error });
        }
      )
    )
  }

  return (
    <SafeAreaView
      style={{ flex: 1 }}
    >
      <ActivityIndicator size="large" color="#fb009e"/>
    </SafeAreaView>
  );
};

export default SplashScreen;