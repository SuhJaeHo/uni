import React, { useEffect } from 'react';
import { Text, View, TouchableHighlight, Pressable } from 'react-native';
import { CometChatUserPresence, CometChatAvatar } from '../../Shared';

import AntDesign from 'react-native-vector-icons/AntDesign';

import AsyncStorage from '@react-native-async-storage/async-storage';

import style from './styles';
import theme from '../../../resources/theme';

const CometChatSearchUserListItem = (props) => {
  const viewTheme = { ...theme, ...props.theme };

  const addFriend = async(uid) => {
    var id = await AsyncStorage.getItem('id');

    fetch("https://api-us.cometchat.io/v3.0/users/" + id + "/friends", {
      method: 'POST',
      headers: {
        Accept: 'application/json', 
        'Content-Type': 'application/json',
        appId: '192332ba9a7ee10b',
        apiKey: 'e545675a7e11466d096a79bc9c5270838d6d633d',
      },     
      body: JSON.stringify({
        accepted: ["" + uid],
      })   
    })    
    .then(response => response.json())
    .then(responseData => console.log(responseData))
  }

  return (
    <TouchableHighlight
      key={props.user.uid}
      onPress={() => props.clickHandler(props.user)}
      underlayColor={viewTheme.backgroundColor.listUnderlayColor}>
      <View style={style.listItem}>
        <View style={[style.avatarStyle, { borderRadius: 22 }]}>
          <CometChatAvatar
            image={{ uri: props.user.avatar }}
            cornerRadius={22}
            borderColor={viewTheme.color.secondary}
            borderWidth={0}
            name={props.user.name}
          />
          <CometChatUserPresence
            status={props.user.status}
            cornerRadius={18}
            style={{ top: 30 }}
            borderColor={viewTheme.color.white}
            borderWidth={2}
          />
        </View>
        <View style={style.userNameStyle}>
          <Text numberOfLines={1} style={style.userNameText}>
            {props.user.name}
          </Text> 
          <Pressable
            onPress={() => addFriend(props.user.uid)}
          >
            <AntDesign
              name={"pluscircleo"}
              size={25}
            />            
          </Pressable>       
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default CometChatSearchUserListItem;
