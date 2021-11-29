import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  Pressable,
} from 'react-native';

import {Navigation} from '@react-navigation/native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Avatar } from 'react-native-paper';
import ImageModal from 'react-native-image-modal';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { SERVER_URL } from '@env';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomSidebarMenu = (props) => {  
    const [url, setUrl] = useState('https://cdn.pixabay.com/photo/2014/10/14/20/24/soccer-488700_960_720.jpg');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');

    useEffect(() => {   
      props.navigation.addListener('focus', () => {
        getUserInfo();
      })      
    }, []);

    const getUserInfo = async() => {
      var id = await AsyncStorage.getItem('id');

      fetch(`${SERVER_URL}/firstProfile/?id=` + id + "&time=" + new Date())
      .then(responseData => {
        setUrl(responseData.url);
      })
      .then(
          fetch(`${SERVER_URL}/userInfo`, {
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
          responseData.map(userData => {
            setEmail(userData.email);
            setNickname(userData.nickname);
          })
        })
      )        
    }

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{marginTop: 30}}>
          <View style={{flexDirection: 'row',  alignItems: 'center', justifyContent: 'center', height: 100}}>
            <View style={{flex: 1, paddingHorizontal: 10}} >
              <Text style={{fontWeight: 'bold', fontSize: 23, marginVertical: 5}}>
                {nickname}
              </Text>
              <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 15, marginVertical: 5}}>
                {email}
              </Text> 
            </View>
            <View style={{flex: 1, paddingHorizontal: 10, marginLeft: 25}}>
              <Avatar.Image size={120} source={{uri: url}} />            
            </View>
          </View>
        </View>
          <Pressable 
            style={{justifyContent: 'center', alignItems: 'center',  flexDirection: 'row', marginBottom: 15, marginTop: 15}}
            onPress={()=> props.navigation.navigate('EditProfile')}
          >
            <TouchableOpacity>
              <Text style={{color: 'grey', fontSize: 13}}>
                내 프로필
              </Text>              
            </TouchableOpacity>            
            <Icon name="keyboard-arrow-right" color="grey" size={30} /> 
          </Pressable>          
        <DrawerContentScrollView {...props}>
          <View style={{width:"100%", height:80, backgroundColor:'grey', justifyContent:'center', alignItems:'center', marginBottom:10}}>
            <Pressable style={{width:"90%", height:70, backgroundColor:'#fff',  alignItems:'center',justifyContent:'center'}}>
              <Text>
                AD
              </Text>
            </Pressable>
          </View>
          <DrawerItemList {...props}/>
          <DrawerItem
            label="Setting ⚙️"
            onPress={() => props.navigation.navigate('Setting')}
          />
          <DrawerItem
            label="Visit Us 🌐"
            onPress={() => Linking.openURL('https://loof.party/')}
          />
          <DrawerItem
            label="Rate Us ⭐️"
            onPress={() => Linking.openURL('https://loof.party/')}
          />
        </DrawerContentScrollView>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey'
          }}>
          loof.party
        </Text>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    sideMenuProfileIcon: {
      width: 70,
      height: 70,
      borderRadius: 100 / 2,
    },
    iconStyle: {
      width: 15,
      height: 15,
      marginHorizontal: 5,
    },
    customItem: {
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
  
  export default CustomSidebarMenu;