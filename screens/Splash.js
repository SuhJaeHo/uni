import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Image,
} from "react-native";

import auth from "@react-native-firebase/auth";
import RNBootSplash from "react-native-bootsplash";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { CometChat } from '@cometchat-pro/react-native-chat';

const SplashScreen = ({ navigation }) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  //chatting  
  const appID = '192332ba9a7ee10b';
  const region = 'us';
  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build();

  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace(
        auth().currentUser ? "Auth" : "Auth"        
      );

      auth().currentUser ? chatInit() : console.log('Login Please');
    }, 1);
  }, []);  

  const chatInit = async() => {    
    //임시
    var id = await AsyncStorage.getItem('id');

    CometChat.init(appID, appSetting).then(
      () => {
        console.log('Initialization completed successfully');
      },
      (error) => {
        console.log('Initialization failed with error:', error);
      },
    ).then(
      CometChat.login(id, '92a48b2397822aea1cbebd8c615115bd3a14d4fa').then (
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