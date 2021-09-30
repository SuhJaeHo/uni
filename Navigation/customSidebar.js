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

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Avatar } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomSidebarMenu = (props) => {  
    const [url, setUrl] = useState('https://cdn.pixabay.com/photo/2014/10/14/20/24/soccer-488700_960_720.jpg');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');

    useEffect(() => {
      getUserInfo();
    }, []);

    const getUserInfo = async() => {
      var id = await AsyncStorage.getItem('id');

      fetch("http://localhost:3000/firstProfile/?id=" + id + "&time=" + new Date())
      .then(responseData => {
        setUrl(responseData.url);
      })
      .then(
        fetch("http://localhost:3000/userInfo", {
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
        <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'center', marginVertical:40}}>
          <View style={{paddingHorizontal: 10}}>            
            <Text style={{fontWeight:'bold', fontSize:20, marginVertical:5, marginLeft: 10}}>
              {nickname}
            </Text> 
            <Text style={{fontWeight:'bold', fontSize:15, marginVertical:5, marginLeft: 10}}>
              {email}
            </Text>           
          </View>
          <View style={{marginHorizontal:18}}>
            <Avatar.Image size={100} source={{uri: url}} />
          </View>
        </View>
          <Pressable 
            style={{justifyContent:'center', alignItems:'center',  flexDirection:'row', marginBottom:15, marginTop:-20}}
            onPress={()=> props.navigation.navigate('EditProfile')}
          >
            <Text style={{color:'grey', fontSize:13}}>
              Edit Profile
            </Text>
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