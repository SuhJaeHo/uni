import React, { Component } from 'react';
import { View, Pressable, Text, Image } from 'react-native';
import { LoginButton, AccessToken,LoginManager } from 'react-native-fbsdk-next';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';

async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
  
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
  
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
  
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential).then((idToken) => {
      console.log(idToken);
      // If server response message same as Data Matched
      // if (idToken) navigation.replace("Gender");
      var id = idToken.additionalUserInfo.profile.sub;   
      var email = idToken.additionalUserInfo.profile.email;
              
      // If server response message same as Data Matched
      //if (idToken) navigation.replace("HomeScreen");
      connect(id, email);
    })
};
    
function FLogin() {
    return(
        <View style={{}}>
            <Pressable
                onPress={() => onFacebookButtonPress()}
                style={{
                    backgroundColor: "white",
                    borderColor: "black",
                    width:312, 
                    height:48, 
                    flexDirection:'row', 
                    justifyContent: 'space-between',
                    paddingHorizontal:30,
                    alignItems:'center',                
                    borderRadius:40
                }}
            >
            <Image
                source={require('../assets/logo/flogo.png')}
                style={{width:38, height:38}}
            />
            <Text style={{fontWeight:'bold', color:'black', fontSize: 16,}}> Continue with Facebook</Text>
            </Pressable>
        </View>
    )
}

export default FLogin