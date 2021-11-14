import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Pressable, Dimensions, Image, TextInput, Alert, SafeAreaView, ImageBackground} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';

import BottomSheet from 'reanimated-bottom-sheet';
import ActionSheet from 'react-native-actionsheet';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { CometChat } from '@cometchat-pro/react-native-chat';

import messaging from '@react-native-firebase/messaging';

import { CHAT_APPID, CHAT_APIKEY, CHAT_AUTHKEY, LOCAL_URL  } from '@env';

import { LogBox } from "react-native";

import styles from './styles';

export default class NewProfileImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            picker: [],
            image: [
                {uri: undefined, width: 100, height: 150, mime: undefined},
                {uri: undefined, width: 100, height: 150, mime: undefined},
                {uri: undefined, width: 100, height: 150, mime: undefined},
                {uri: undefined, width: 100, height: 150, mime: undefined},
                {uri: undefined, width: 100, height: 150, mime: undefined},
                {uri: undefined, width: 100, height: 150, mime: undefined},    
            ],
            index: 0,
            nextColor: '#fff',

            menu: [
                '갤러리',
                '카메라', 
                '취소',           
            ],

            FCM_TOKEN: '',
        }
    }

    componentDidMount = async() => {
        LogBox.ignoreAllLogs(true); 
        this.getProfile();        
    }

    getProfile = async () => {
        try {
            const id = await AsyncStorage.getItem('id');
            if(id !== null) {
                this.setState({ 
                    id: id,
                })
            }

            const FCM_TOKEN = await messaging().getToken();
            this.setState({FCM_TOKEN: FCM_TOKEN});
        } catch(e) {
            console.log(e);
        }

        fetch(`${LOCAL_URL}/firstProfile/?id=` + this.state.id + "&time=" + new Date())
        .then(responseData => {
            if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {              
                this.state.image[0].uri = responseData.url;     
            }
        })
        .then(() =>
            fetch(`${LOCAL_URL}/secondProfile/?id=` + this.state.id + "&time=" + new Date())
            .then(responseData => {  
                if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {
                    this.state.image[1].uri = responseData.url;                                     
                }
            })            
        )
        .then(() =>
            fetch(`${LOCAL_URL}/thirdProfile/?id=` + this.state.id + "&time=" + new Date())
            .then(responseData => {
                if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {  
                    this.state.image[2].uri = responseData.url;                                   
                }
            })
        )
        .then(() =>
            fetch(`${LOCAL_URL}/fourthProfile/?id=` + this.state.id + "&time=" + new Date())
            .then(responseData => {
                if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {  
                    this.state.image[3].uri = responseData.url;     
                }
            })
        ).then(() =>
            fetch(`${LOCAL_URL}/fifthProfile/?id=` + this.state.id + "&time=" + new Date())
            .then(responseData => {
                if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {  
                    this.state.image[4].uri = responseData.url;                                     
                }
            })
        ).then(() => 
            fetch(`${LOCAL_URL}/sixthProfile/?id=` + this.state.id + "&time=" + new Date())
            .then(responseData => {
                if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {  
                    this.state.image[5].uri = responseData.url;                                     
                }
            })
        )
        .then(() => this.picker())
    }

    picker = () => {
        let picker = new Array();

        this.state.image.map((data, index) => {             
            picker.push (
                <TouchableOpacity
                    style={styles.imageBoard}
                    onPress={() => {this.setState({index : index}); this.showActionSheet();}}
                    key={index}
                >                    
                    {data.uri === undefined ?
                        <Fontisto
                            name={"plus-a"}
                        />
                        :
                        <Image 
                            source={{uri: data.uri}}
                            style={{width: 100, height: 150, borderRadius: 25}}
                        />
                    }
                </TouchableOpacity>
            )
        })

        this.setState({
            picker: picker
        })
    }

    bs = React.createRef();
    showActionSheet = () => {        
        this.bs.current.show();
    };

    pickImage = async(option) => {
        if(option === '카메라') {
            ImagePicker.openCamera({
                cropping: true, freeStyleCropEnabled: true, includeBase64: true,           
            })
            .then(image => {
                var sequence = 6;
                var check = 0;

                this.state.image.map((data, index) => {
                    if(data.uri !== undefined) {
                        if(this.state.index === index) {
                            data.uri = image.path;
                            data.mime = image.mime;
                            check += 1;
                        }
                    }else if(data.uri === undefined) {
                        if(check === 0) {
                            if(sequence > index) {
                                data.uri = image.path;
                                data.mime = image.mime;
                                sequence = index;
                                this.setState({index: sequence});
                            }
                        }
                    }
                })
                
                this.uploadImage(image, this.state.index);
                this.picker();
            }).catch((error) => {
                if (error === 'E_PICKER_CANCELLED') {
                    return false;
                }
            });
        }else if(option === '갤러리') {
            ImagePicker.openPicker({
                cropping: true, freeStyleCropEnabled: true, includeBase64: true,
            }).then((image) => {
                var sequence = 6;
                var check = 0;

                this.state.image.map((data, index) => {
                    if(data.uri !== undefined) {
                        if(this.state.index === index) {
                            data.uri = image.path;
                            data.mime = image.mime;
                            check += 1;
                        }
                    }else if(data.uri === undefined) {
                        if(check === 0) {
                            if(sequence > index) {
                                data.uri = image.path;
                                data.mime = image.mime;
                                sequence = index;
                                this.setState({index: sequence});
                            }
                        }
                    }
                })
                
                this.uploadImage(image, this.state.index);
                this.picker();    
            }).catch((error) => {
                if (error === 'E_PICKER_CANCELLED') {
                    return false;
                }
            });
        }        
    }

    uploadImage = async(image, index) => {
        var profile;             
        profile = await ImageResizer.createResizedImage(image.path, 700, 700, 'JPEG', 100, 0, undefined, false, {mode: 'contain'});

        const formData = new FormData();

        var path = profile.uri;        
        var name = profile.uri.substring(path.lastIndexOf('/') + 1, path.length);        
        var type = image.mime;

        var id = this.state.id;
        var date = Date.now();

        formData.append('id', id);
        formData.append('date', date);
        formData.append('index', index);
        formData.append('profile', {
            name: name,
            uri: path,  
            type: type,
        })

        const URL = `${LOCAL_URL}/uploadProfile`;
        fetch(URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
    }

    //채팅 아이디 생성
    createUser = async() => {
        const appSetting = new CometChat.AppSettingsBuilder()
        .subscribePresenceForAllUsers()
        .setRegion('us')
        .build();

        CometChat.init(CHAT_APPID, appSetting).then(
            () => {
                console.log('Initialization completed successfully');
            },
            (error) => {
                console.log('Initialization failed with error:', error);
            },
        );

        const nickname = await AsyncStorage.getItem('nickname'); 

        fetch(`${LOCAL_URL}/firstProfile/?id=` + this.state.id  + "&time=" + new Date())
        .then(responseData => {           
            const URL = 'https://api-us.cometchat.io/v3.0/users';
            fetch(URL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    appId: CHAT_APPID,
                    apiKey: CHAT_APIKEY,
                },
                body: JSON.stringify({
                    uid: this.state.id,
                    name: nickname,   
                    avatar: responseData.url,             
                })
            })    
            .then(response => response.json())
            .then(responseData => console.log(responseData))   
            .then(() => {
                CometChat.login(this.state.id, CHAT_AUTHKEY).then (
                    User => {
                      console.log("Login Successful:", { User });
                    },
                    error => {
                      console.log("Login failed with exception:", { error });
                    }
                )
            }) 
            .then(() => {
                CometChat.registerTokenForPushNotification(this.state.FCM_TOKEN);
            })
        })            
    }

    check = async() => {
        var cnt = 0;
        this.state.image.map((data, index) => {
            console.log(data);
            if(data.uri !== undefined){
                cnt+=1;
            }
        })

        if(cnt === 0) {
            Alert.alert('프로필 사진을 1장 이상 등록하세요');
        }else {
            this.createUser();
            this.setCompleted();
            this.props.navigation.navigate('DrawerNav');            
        }
    }

    setCompleted = () => {
        const URL = `${LOCAL_URL}/setCompleted`;
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.id,
                complete: true,
            })
        })
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>   
                <TouchableHighlight activeOpacity={1}>
                    <ImageBackground
                        source={require("../../../assets/imgs/3.png")} resizeMode="cover" 
                        style={{ width: "100%", height: '100%', }}
                    >
                        <View style={styles.announceContainer}>
                            <View style={{ flexDirection:'row', alignItems:'flex-end' }}>
                                <Text style={styles.announceTitle}>
                                    사진
                                </Text>
                                <Text style={ styles.announce}>
                                    을 
                                </Text>
                            </View>
                            <Text style={ styles.announce}>
                                추가해 주세요! 
                            </Text>                                           
                        </View>
                        <View style={{ flex:1, justifyContent:'center' }}>  
                            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: Dimensions.get('window').width*0.9, marginHorizontal: Dimensions.get('window').width*0.05}}>
                                {this.state.picker}
                            </View>
                            {this.state.image[0].uri == undefined ?
                            <View>
                                <Pressable
                                    style={{
                                        width: Dimensions.get('window').width * 0.7,
                                        height: 50,
                                        borderColor: this.state.nextColor,
                                        marginHorizontal:Dimensions.get('window').width * 0.15,
                                        marginTop: 70,
                                        borderRadius: 25,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#fff',
                                        shadowOpacity: 0.5,
                                        shadowRadius: 5,
                                        shadowColor: 'grey',
                                        shadowOffset: { height: 3, width: 3 },
                                        position: 'absolute',
                                    }}                                
                                    onPress={() => this.check()}
                                >
                                    <Text style={styles.btnFonts}>NEXT </Text>                            
                                </Pressable>
                            </View>
                            : 
                            <View>
                                <Pressable
                                    style={{
                                        width: Dimensions.get('window').width * 0.7,
                                        height: 50,
                                        borderColor: this.state.nextColor,
                                        marginHorizontal:Dimensions.get('window').width * 0.15,
                                        marginTop: 70,
                                        borderRadius: 25,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#49ffbd',
                                        shadowOpacity: 0.5,
                                        shadowRadius: 5,
                                        shadowColor: 'grey',
                                        shadowOffset: { height: 3, width: 3 },
                                        position: 'absolute'
                                    }}                                
                                    onPress={() => this.check()}
                                >
                                    <Text style={styles.btnFonts}>NEXT </Text>                            
                                </Pressable>
                            </View>
                            }                    
                            <ActionSheet 
                                ref={this.bs}
                                title={'프로필 사진 업로드'}
                                options={this.state.menu}
                                cancelButtonIndex={2} 
                                onPress={(index) => this.pickImage(this.state.menu[index])}  
                            />                                       
                        </View>
                    </ImageBackground>
                    </TouchableHighlight>
            </View> 
        )
    }
}