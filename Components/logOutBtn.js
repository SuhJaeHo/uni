import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";

import { useNavigation } from '@react-navigation/native';

import auth from "@react-native-firebase/auth";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const LogoutBtn = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      console.log("user", JSON.stringify(user));
      setUser(user);
    });

    return subscriber;
  }, []);

  const navigation = useNavigation();

  const logout = async() => {
    Alert.alert(
      "Logout",
      "Are you sure? You want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return null;
          },
        },
        {
          text: "Confirm",
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
    <View style={{width:100, height:39, justifyContent:'center', alignItems:'center', zIndex:200}}>
        <Pressable
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={logout}
        >
            <Text style={styles.buttonTextStyle}>
                Logout
            </Text>
        </Pressable>
    </View>
  );
};

export default LogoutBtn;

const styles = StyleSheet.create({
  buttonStyle: {
    minWidth: 300,
    backgroundColor: "grey",
    borderWidth: 0,
    color: "red",    
    height: 50,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "red",
    paddingVertical: 10,
    fontSize: 20,    
  },
});