import React, {Component} from 'react';
import { Alert, Platform, PermissionsAndroid, Permission, ToastAndroid } from 'react-native';
import Router from './Navigation/Router';

import messaging from '@react-native-firebase/messaging';
import { firebase } from '@react-native-firebase/auth';

import PushNotification, {Importance} from 'react-native-push-notification';

import AsyncStorage from '@react-native-async-storage/async-storage';

PushNotification.configure({
  largeIcon: "ic_launcher",
  smallIcon: "ic_notification",
  
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
    //notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);
  },
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

  PushNotification.createChannel(
  {
    channelId: "TEST", // (required)
    channelName: "TEST", // (required)
    channelDescription: "TEST", // (optional) default: undefined.
    playSound: true, // (optional) default: true
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );

export default class App extends Component {
  componentDidMount = () => {         
    this.foreground();             
  }

  componentWillUnmount = () => {
    this.foreground();
  }

  foreground = () => {
    messaging().onMessage(payload => { 
      console.log(payload);            
      this.showNotification(payload.data.title, payload.data.body);
    });    
  }

  showNotification = (title, message) => {
    PushNotification.localNotification({
      title: title,
      message: message,
      playSound: true,
      vibrate: true,
      channelId: 'TEST',      
    })
  }

  render() {
    return (
      <>
        <Router/>
      </>
    )
  }
}