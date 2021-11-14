import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Pressable,
  Dimensions,
} from "react-native";

import { useNavigation } from '@react-navigation/native';

import auth from "@react-native-firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const LogoutBtn = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {      
      setUser(user);
  });

    return subscriber;
  }, []);

  const navigation = useNavigation();

  const logout = async() => {
    Alert.alert(
      "로그아웃",
      "로그아웃 하시겠습니까?",
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
              GoogleSignin.signOut();
              auth()
              .signOut()
              .then(() => navigation.replace("Auth"))
              .catch((error) => {
                console.log(error);
                if (error.code === "auth/no-current-user")
                  navigation.replace("Auth");
                else alert(error);
              });                             
          },
        },
      ],
      { cancelable: false }
    );
  };


  const signOut = async() => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  }

  return (  
    <View>
        <TouchableOpacity
          onPress={logout}
        >        
          <Text>
              로그아웃
          </Text>
        </TouchableOpacity>
        {/*
        <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={logout}
        >
            <Text style={styles.buttonTextStyle}>
                로그아웃
            </Text>
        </TouchableOpacity>
        */}
    </View>
  );
};

export default LogoutBtn;

const styles = StyleSheet.create({
  buttonStyle: {
    minWidth: Dimensions.get('screen').width * 0.3,
    height: Dimensions.get('screen').height * 0.06,
    backgroundColor: "grey",
    borderWidth: 0,
    color: "red",    
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 30,
    marginBottom: Dimensions.get('screen').height * 0.05,
  },
  buttonTextStyle: {
    color: "#fb009e",
    paddingVertical: 10,
    fontSize: Dimensions.get('screen').height * 0.025, 
    fontWeight: 'bold'
  },
});