import React, { useState, createRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import PassMeter from "react-native-passmeter";
import auth from "@react-native-firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("")
  const [errortext, setErrortext] = useState("");

  const emailInputRef = createRef();
  const passwordInputRef = createRef();

  const MAX_LEN = 15,
  MIN_LEN = 6,
  PASS_LABELS = ["Too Short", "Weak", "Normal", "Strong", "Secure"];

  const handleSubmitButton = () => {    
    setErrortext("");
    if (!userName) return Alert.alert("이름을 입력하세요");
    if (!userEmail) return Alert.alert("이메일을 입력하세요");
    if (!userPassword) return Alert.alert("비밀번호를 설정하세요");
    if (userPassword != userPasswordCheck) {
      Alert.alert("비밀번호를 확인해주세요");
      return false;
    } 

    auth()
      .createUserWithEmailAndPassword(
        userEmail,
        userPassword
      )
      .then((user) => {
        console.log(
          "Registration Successful. Please Login to proceed"
        );
        user.user.sendEmailVerification();
        alert('이메일 인증을 완료해주세요!')
        console.log(user);
        if (user) {
          auth()
            .currentUser.updateProfile({
              displayName: userName,
              photoURL:
                "https://aboutreact.com/profile.png",
            })
            .then(() => navigation.replace("Auth"))
            .catch((error) => {
              alert(error);
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
          setErrortext(
            "That email address is already in use!"
          );
        } else {
          setErrortext(error.message);
        }
      });
  };

  const passwordCheck = () => {
    if (userPassword === userPasswordCheck){
      true
    } else {
      false
    };
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#121212", width: Dimensions.get('screen').width * 1, height: Dimensions.get('screen').height * 1 }}      
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: "center",
          alignContent: "center",
        }}
      >        
        <KeyboardAvoidingView enabled>
          <View style={styles.containerStyle}>
            <View>              
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
                Name
              </Text>           
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserName) =>
                  setUserName(UserName)
                }
                placeholder="Enter Name"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                onSubmitEditing={() =>
                  emailInputRef.current &&
                  emailInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
          </View> 
          
          <View style={styles.containerStyle}>
            <View>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
                Email
              </Text>                
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) =>
                  setUserEmail(UserEmail)
                }              
                placeholder="Enter Email"
                placeholderTextColor="#8b9cb5"
                keyboardType="email-address"
                ref={emailInputRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
          </View>
          {errortext != "" ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}

          <View style={styles.containerStyle}>            
            <View>
              <Text style={{width: 100, textAlign:'left', color: '#fff', fontWeight:'bold', fontSize:20}}>
                Password
              </Text>
            </View>   
            <View style={styles.sectionStyle}>           
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                placeholder="Enter Password"
                placeholderTextColor="#8b9cb5"
                ref={passwordInputRef}
                returnKeyType="next"
                secureTextEntry={true}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
              /> 
            </View>
          </View>
          <View style={styles.containerStyle}>
            <View>
              <Text style={{width:100, textAlign:'left', color:'#fff', fontWeight:'bold', fontSize:20}}>
                Confirm
              </Text>
            </View> 
            <View style={styles.sectionStyle}>          
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPasswordCheck(UserPassword)
                }
                placeholder="Enter Password"
                placeholderTextColor="#8b9cb5"
                ref={passwordInputRef}
                returnKeyType="next"
                secureTextEntry={true}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
              />  
            </View> 
          </View>                       
          <View style={{marginTop:10}}>
            <PassMeter
              showLabels
              password={userPassword}
              maxLength={MAX_LEN}
              minLength={MIN_LEN}
              labels={PASS_LABELS}            
            />
          </View>                               
          <View style={{justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitButton}
            >
              <Text style={styles.buttonTextStyle}>
                회원가입
              </Text>
            </TouchableOpacity>
          </View>          
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  containerStyle: {    
    marginHorizontal: Dimensions.get('screen').width * 0.1,
    marginBottom: 10,
    marginTop: 20,
  },
  sectionStyle: {
    alignItems: 'center',
  },
  text:{
    color: '#fff'
  },
  buttonStyle: {
    backgroundColor: "#fb009e",    
    color: "#FFF",    
    height: 50,    
    borderRadius: 30,
    width: Dimensions.get('screen').width * 0.7,
    marginTop: Dimensions.get('screen').height * 0.07,
    marginBottom: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonTextStyle: {
    color: "#fff",
    paddingVertical: 10,    
    fontSize: 20,
    fontWeight:'bold',  
  },
  inputStyle: {
    paddingLeft: 20,
    color: "#fff",
    width: Dimensions.get('screen').width * 0.8,
    height: 45,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#fff",
    marginBottom: 10,
    marginTop: 10  
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});