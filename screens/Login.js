import React, {useState, createRef, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  ImageBackground,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
  Linking,
  Dimensions,
  Platform,
  BackHandler,
} from 'react-native';

import auth from '@react-native-firebase/auth';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {AccessToken, LoginManager} from 'react-native-fbsdk-next';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {CometChat} from '@cometchat-pro/react-native-chat';

import messaging from '@react-native-firebase/messaging';

import {
  CHAT_APPID,
  CHAT_APIKEY,
  CHAT_AUTHKEY,
  LOCAL_URL,
  GOOGLE_WEB_CLIENT_ID,
} from '@env';

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);

const LoginScreen = ({navigation}) => {
  //custom
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [fcmToken, setFcmToken] = useState('');
  const [errortext, setErrortext] = useState('');

  // google
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);

  const passwordInputRef = createRef();

  //chatting
  const appID = CHAT_APPID;
  const region = 'us';
  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build();

  const usersRequest = new CometChat.UsersRequestBuilder()
    .setLimit(100)
    .friendsOnly(true)
    .build();

  useEffect(() => {
    getFcmToken();
    // Initial configuration
    GoogleSignin.configure({
      // Mandatory method to call before calling signIn()
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId
      // Generated from Firebase console
      webClientId: GOOGLE_WEB_CLIENT_ID,
    });

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
    // Check if user is already signed in
  }, []);

  const handleBackButtonClick = () => {
    BackHandler.exitApp();
    return true;
  }

  const getFcmToken = async () => {
    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      const token = await messaging().getToken();
      setFcmToken(token);
      console.log(token);
    } else {
      console.log('fcm auth fail');
    }
  };

  // BACK
  const connect = async (id, email) => {
    try {
      await AsyncStorage.setItem('id', id);
    } catch (e) {
      console.log(e);
    }

    const URL = `${LOCAL_URL}/signIn`;
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        email: email,
        fcm: fcmToken,
      }),
    })
    .then(response => response.json())
    .then(responseData => {
      if (responseData) {              
      CometChat.init(appID, appSetting)
        .then(
          () => {
            console.log('Initialization completed successfully');
          },
          error => {
            console.log('Initialization failed with error:', error);
          },
        )
        .then(
          CometChat.login(id, CHAT_AUTHKEY).then(
            User => {
              console.log('Login Successful:', {User});
            },
            error => {
              console.log('Login failed with exception:', {error});
            },
          ),
        )
        .then(
          CometChat.registerTokenForPushNotification(fcmToken).then(
            () => {
              console.log('OK');
            },
            error => {
              console.log('Fail: ', error);
            },
          ),
        );
        navigation.navigate('DrawerNav');
      } else {
        console.log(responseData);
        navigation.navigate('Nickname');
      }
    });
  };

  // CUSTOM
  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    auth()
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then(user => {  
        var id = user.user.uid;
        var email = userEmail;
        // If server response message same as Data Matched
        // if (user) navigation.replace("DrawerNav");
        connect(id, email);
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/invalid-email') setErrortext(error.message);
        else if (error.code === 'auth/user-not-found')
          setErrortext('No User Found');
        else {
          setErrortext('Please check your email id or password');
        }
      });
  };

  // GOOGLE

  const g_signIn = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();
      setloggedIn(true);

      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      await auth()
        .signInWithCredential(credential)
        .then(idToken => {
          console.log(idToken);
          // If server response message same as Data Matched
          // if (idToken) navigation.replace("Gender");
          var id = idToken.additionalUserInfo.profile.sub;
          var email = idToken.additionalUserInfo.profile.email;

          // If server response message same as Data Matched
          //if (idToken) navigation.replace("HomeScreen");
          connect(id, email);
        });
    } catch (error) {
      console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Play Services Not Available or Outdated');
      } else {
        alert(error.message);
      }
    }
  };

  /// FBLOGIN
  const onFacebookButtonPress = async () => {
    // Attempt login with permissions
    if(Platform.OS === "android") {
      LoginManager.setLoginBehavior("web_only")
    }

    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth()
      .signInWithCredential(facebookCredential)
      .then(accessToken => {
        console.log(accessToken);
        // If server response message same as Data Matched
        // if (idToken) navigation.replace("Gender");
        var id = accessToken.additionalUserInfo.profile.id;
        var email = accessToken.user.email;
        console.log(email);

        // If server response message same as Data Matched
        //if (idToken) navigation.replace("HomeScreen");
        connect(id, email);
      });
  };

  return (
    <View style={styles.mainBody}>
      <View keyboardShouldPersistTaps="handled">
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <KeyboardAvoidingView enabled>
            <View
              style={{alignItems: 'center', flex: 1, justifyContent: 'center', marginVertical:20}}>
              <Image
                source={require('../assets/logo/halflogo2.png')}
                style={{width: 140, height: 140, resizeMode: 'contain'}}
              />
            </View>
            <View style={{flex: 3, alignItems: 'center', marginTop: 50}}>
              {/*CUSTOM LOGIN */}
              <View style={styles.customSectionStyle}>
                <View style={{ }}>
                  <View >
                    <TextInput
                      style={styles.inputStyle}
                      onChangeText={UserEmail => setUserEmail(UserEmail)}
                      placeholder="Enter Email"
                      placeholderTextColor="#8b9cb5"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      returnKeyType="next"
                      onSubmitEditing={() =>
                        passwordInputRef.current &&
                        passwordInputRef.current.focus()
                      }
                      underlineColorAndroid="#f000"
                      blurOnSubmit={false}
                    />
                  </View>
                  <View >
                    <TextInput
                      style={styles.inputStyle}
                      onChangeText={UserPassword =>
                        setUserPassword(UserPassword)
                      }
                      placeholder="Enter Password"
                      placeholderTextColor="#8b9cb5"
                      keyboardType="default"
                      ref={passwordInputRef}
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      secureTextEntry={true}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={handleSubmitPress}>
                    <Text style={styles.loginBtn}>LOGIN</Text>
                  </TouchableOpacity>
                  {errortext != '' ? (
                    <Text style={styles.errorTextStyle}> {errortext} </Text>
                  ) : null}
                  <Text
                    style={styles.registerTextStyle}
                    onPress={() => navigation.navigate('RegisterScreen')}>
                    New Here ? Register
                  </Text>
                </View>
              </View>
              {/*경계 선*/}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, height: 1, backgroundColor: '#fff'}} />
                <View>
                  <Text style={{width: 150, textAlign: 'center', color: '#fff'}}>
                    Or continue with
                  </Text>
                </View>
                <View style={{flex: 1, height: 1, backgroundColor: '#fff'}} />
              </View>
              {/*로그인 뷰 선*/}
              <View style={{flexDirection: 'row', marginTop:40, }}>
                <View style={styles.sectionStyle}>
                  <Pressable
                    onPress={g_signIn}
                    style={{
                      backgroundColor: 'white',
                      borderColor: 'black',
                      width: 80,
                      height: 80,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      paddingHorizontal: 30,
                      alignItems: 'center',
                      borderRadius: 100,
                      shadowOpacity: 0.5,
                      shadowRadius: 5,
                      shadowColor: 'grey',
                      shadowOffset: {height: 2, width: 2},
                    }}>
                    <Image
                      source={require('../assets/logo/g-logo.png')}
                      style={{width: 35, height: 35}}
                    />
                  </Pressable>
                </View>                                
                <View style={styles.sectionStyle}>
                  <Pressable
                    onPress={() => onFacebookButtonPress()}
                    style={{
                      backgroundColor: 'white',
                      width: 80,
                      height: 80,
                      borderRadius:100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      shadowOpacity: 0.5,
                      shadowRadius: 5,
                      shadowColor: 'grey',
                      shadowOffset: {height: 2, width: 2},                      
                    }}>
                    <Image
                      source={require('../assets/logo/flogo.png')}
                      style={{width: 38, height: 38}}
                    />
                  </Pressable>                  
                </View>              
              </View>
              <View style={{marginTop:10, flexDirection:'row', width: Dimensions.get('window').width*0.8, flexWrap:'wrap', marginHorizontal:Dimensions.get('window').width*0.1}}>
                <Text style={styles.termText}>가입하시면 LOOF의 </Text>
                <Text style={styles.termLinkText}
                      onPress={() => Linking.openURL('https://www.loof.party/Privacy')}>
                  개인정보 처리방침
                </Text>
                <Text style={styles.termLinkText}
                      onPress={() => Linking.openURL('https://www.loof.party/Privacy')}>
                  , 이용약관에
                </Text>
                <Text style={styles.termText}>동의하게 됩니다.</Text>
              </View>              
            </View>            
          </KeyboardAvoidingView>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    justifyContent: 'center',
    backgroundColor: '#121212',
  },
  sectionStyle: {
    marginTop: 20,
    margin: 17,
  },
  customSectionStyle: {
    flexDirection: 'row',
    height: 250,    
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#fb009e',
    width: 312,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  loginBtn: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25
  },
  buttonTextStyle: {
    color: '#fff',
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputStyle: {
    width: 312,
    height: 50,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: '#fff',
    marginBottom:20
  },
  registerTextStyle: {
    color: '#49ffbd',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,    
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  googleButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  termLinkText: {
    color:'#49ffbd'
  },
  termText: {
    color: '#fff'
  }
});