import React, {Component} from 'react';
import {KeyboardAvoidingView, View, Text, TouchableOpacity, Pressable, Dimensions, Image, TextInput, Alert, SafeAreaView, ImageBackground, BackHandler} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import { Buffer } from 'buffer';

import BottomSheet from 'reanimated-bottom-sheet';
import ActionSheet from 'react-native-actionsheet';

import AsyncStorage from '@react-native-async-storage/async-storage';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { LOCAL_URL, CHAT_API_KEY, CHAT_APP_ID } from '@env';

import { LogBox } from "react-native";

import styles from './styles';

export default class EditProfile extends Component {
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
            interestList: [],
            userInterest: [],

            menu: [
                '갤러리',
                '카메라', 
                '취소',           
            ],
        }
    }

    componentDidMount = () => {      
        LogBox.ignoreAllLogs(true);     
        this.props.navigation.addListener('focus', async () => {
            BackHandler.addEventListener('hardwareBackPress', this.backButtonClick);  
        });   
        
        this.props.navigation.addListener('focus', () => {   
            this.getProfile();  
            this.getUserInfo();                                                          
        })                
    }

    componentWillUnmount = async() => {
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonClick);
    }

    backButtonClick = () => {
        this.props.navigation.navigate('DrawerNav');
        return true;
    }

    getProfile = async () => {                
        const id = await AsyncStorage.getItem('id');
        this.setState({ 
            id: id,
        })            

        fetch(`${LOCAL_URL}/firstProfile/?id=` + id  + "&time=" + new Date())        
        .then(responseData => {                      
            if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {              
                this.state.image[0].uri = responseData.url;    
            }   
        })
        .then(() =>
            fetch(`${LOCAL_URL}/secondProfile/?id=` + id + "&time=" + new Date())
            .then(responseData => {  
                if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {
                    this.state.image[1].uri = responseData.url;                                     
                }
            })
        )
        .then(() =>
            fetch(`${LOCAL_URL}/thirdProfile/?id=` + id + "&time=" + new Date())
            .then(responseData => {
                console.log(responseData);
                if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {  
                    this.state.image[2].uri = responseData.url;                                   
                }
            })
        )
        .then(() =>
            fetch(`${LOCAL_URL}/fourthProfile/?id=` + id + "&time=" + new Date())
            .then(responseData => {
                if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {  
                    this.state.image[3].uri = responseData.url;     
                }
            })
        ).then(() =>
            fetch(`${LOCAL_URL}/fifthProfile/?id=` + id + "&time=" + new Date())
            .then(responseData => {
                if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {  
                    this.state.image[4].uri = responseData.url;                                     
                }
            })
        ).then(() => 
            fetch(`${LOCAL_URL}/sixthProfile/?id=` + id + "&time=" + new Date())
            .then(responseData => {
                if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {  
                    this.state.image[5].uri = responseData.url;                                     
                }
            })
        )        
        .then(() => this.picker())

        /*
        .then(response => response.json())
        .then(responseData => {                              
            const b64 = Buffer(responseData[0]).toString('base64');
            const a64 = Buffer(responseData[1]).toString('base64');         
            const mimeType = 'image/jpeg';
            test.push(<Image source={{uri : `data:${mimeType};base64,${b64}`}} style={{width: 50, height: 50}}/>);
            test.push(<Image source={{uri : `data:${mimeType};base64,${a64}`}} style={{width: 50, height: 50}}/>);            
        })
        */
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
                            style={{width: Dimensions.get('window').width*0.26, height: 150, borderRadius: 25}}
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

    updateChatUser = async() => {                
        fetch(`${LOCAL_URL}/firstProfile/?id=` + this.state.id  + "&time=" + new Date())
        .then(responseData => {
            const URL = "https://" + CHAT_APP_ID + ".api-us.cometchat.io/v3.0/users/" + this.state.id;
            fetch(URL, {
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    apiKey: CHAT_API_KEY,
                },
                body: JSON.stringify({ 
                    avatar: responseData.url,             
                })
            })
            .then(response => response.json())
            .then(responseData => console.log(responseData))  
        })                 
    }

    uploadImage = async(image, index) => { 
        var profile;             
        profile = await ImageResizer.createResizedImage(image.path, 1000, 1000, 'JPEG', 100, 0, undefined, false, {mode: 'contain'});

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

    getUserInfo = async() => {       
        this.state.interestList = '';

        const id = await AsyncStorage.getItem('id');
        const URL = `${LOCAL_URL}/userInfo`;
        var interest = new Array();

        fetch(URL, {
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
            interest = userData.hobby.split(',');                        
          })
        })
        .then(() => {
            this.state.userInterest = interest; 

            interest.map(data => {                
                this.state.interestList += data;
                
                if(data !== interest[interest.length - 1]) {
                    this.state.interestList += ', ';
                }
            })
        })                
    }            

    render() {
        return (
            <View style={styles.editContainer}>                  
                <TouchableOpacity activeOpacity={1}>                 
                    <ImageBackground
                        source={require("../../assets/imgs/3.png")} resizeMode="cover" 
                        style={{ width: "100%", height: '110%' }}                    
                    >                    
                        <View style={styles.announceContainer}>
                            <View style={styles.headerConatiner}>
                                <MaterialIcons name={"arrow-back-ios"} 
                                    size={45} 
                                    color={'#000'}
                                    style={{marginLeft:10, marginTop:20}}
                                    onPress={() => {this.props.navigation.navigate('DrawerNav');}}
                                />                   
                            </View>
                            <View style={{ flexDirection:'row', alignItems:'flex-end' }}>
                                <Text style={styles.announceTitle}>
                                    사진
                                </Text>
                                <Text style={styles.announce}>
                                    을 
                                </Text>
                            </View>
                            <Text style={styles.announce}>
                                추가해 주세요! 
                            </Text>                                           
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', marginTop: 60 }}>  
                            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: Dimensions.get('window').width*0.9, marginHorizontal: Dimensions.get('window').width*0.05}}>                                
                                {this.state.picker}
                            </View>                                               
                            <View style={styles.interestContainer}>                                
                                <Pressable
                                    style={styles.interestList}
                                    onPress={() => this.props.navigation.push('editHobby', {interest: this.state.userInterest})}
                                >
                                    <Text>{this.state.interestList}</Text>
                                </Pressable>                                                                                    
                            </View>                               
                            <ActionSheet 
                                ref={this.bs}
                                title={'프로필 사진 업로드'}
                                options={this.state.menu}
                                cancelButtonIndex={2} 
                                onPress={(index) => this.pickImage(this.state.menu[index])}  
                            />                                                                                                       
                        </View>
                    </ImageBackground>               
                </TouchableOpacity>
            </View> 
        )
    }
}