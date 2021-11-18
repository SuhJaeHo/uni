import React, {Component} from 'react';
import {View, Text, ImageBackground, Pressable, Dimensions, Image, Alert, SafeAreaView, TextInput, Linking, BackHandler} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

import Dialog, { DialogContent, DialogFooter, DialogButton, DialogTitle } from 'react-native-popup-dialog';

import AsyncStorage from '@react-native-async-storage/async-storage';


import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { LOCAL_URL } from '@env';

import { LogBox } from "react-native";

export default class PermissionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    componentDidMount = () => {
        LogBox.ignoreAllLogs(true); 
        BackHandler.addEventListener('hardwareBackPress', this.backButtonClick);
    }

    componentWillUnmount = async() => {
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonClick);
    }

    backButtonClick = () => {         
        BackHandler.exitApp();                       
        return true;
    }

    permissions = async() => {  
        var count = 0;      
        var locationCheck;
        var storageCheck;

        await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => { 
            if(result === 'blocked') {
                count += 1;
            }
        })
        
        await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
            if(result === 'blocked') {
                count += 1;
            }
        })

        if(count !== 0) {
            this.openSetting();
        }else {
            await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((response) => {      
                locationCheck = response;
            })
    
            await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((response) => { 
                storageCheck = response;
            })   
    
            if(locationCheck === 'granted' && storageCheck === 'granted') {
                this.props.navigation.navigate('Auth');
            }else if(locationCheck === 'blocked' || storageCheck === 'blocked') {
                this.setState({
                    visible: true,                    
                })                
            }else {
                this.setState({
                    visible: true
                })
            }  
        }                            
    }

    openSetting = () => {
        Linking.openSettings();
    }

    setVisible = () => {
        this.setState({
            visible: false,
        })
    }

    render() {
        return ( 
            <View style={{}}>
                <View style={{width: Dimensions.get('screen').width * 1, height: Dimensions.get('screen').height * 0.8, justifyContent: 'center', alignItems: 'center'}}>                                
                    <Dialog
                        visible = {this.state.visible}                                                
                        onTouchOutside = {() => {
                            this.setState({ visible: false });
                        }}
                        dialogTitle = {<DialogTitle title="필수 권한 허용 후 이용해주세요" />}                        
                        footer = {
                            <DialogFooter                                                             
                            >                                
                                <DialogButton
                                    text="확인"
                                    style={{height: 55}}
                                    textStyle={{color: '#fb009e', fontSize: 16}}                                                                                                          
                                    onPress={() => this.setVisible()}
                                />
                            </DialogFooter>
                        }
                    >            
                        <DialogContent>
                            {null}
                        </DialogContent>                                              
                    </Dialog>              
                    <Image
                        source={require('../assets/logo/halflogo2.png')}
                        style={{width: Dimensions.get('window').width * 0.5, height: Dimensions.get('window').height * 0.15, resizeMode: 'contain'}}
                    />
                    <View style={{alignItems: 'center', marginBottom: 10}}>
                        <Text style={{fontSize: 32, fontWeight: '100', color: '#fb009e'}}>LOOF</Text>
                        <Text style={{color: 'gray'}}>서비스 이용을 위해 필수 권한을 허용해주세요</Text>
                    </View>
                    <View style={{width: Dimensions.get('screen').width * 0.5, height: Dimensions.get('screen').width * 0.15, flexDirection: 'row'}}>
                        <MaterialIcons 
                            style={{marginRight: 10}}
                            name={'gps-fixed'}
                            size={20}
                        />
                        <Text style={{fontSize: 14}}>현재 위치를 조회하기 위해 필요합니다.</Text>
                    </View>
                    <View style={{width: Dimensions.get('screen').width * 0.5, height: Dimensions.get('screen').width * 0.15, flexDirection: 'row'}}>
                        <AntDesign 
                            style={{marginRight: 10}}
                            name={'camera'}
                            size={20}
                        />
                        <Text style={{fontSize: 14}}>프로필 사진을 등록하기 위해 필요합니다.</Text>
                    </View>
                </View>    
                <View style={{justifyContent: 'space-between', alignItems: 'center'}}>                
                    <TouchableOpacity
                        style={{
                            width: Dimensions.get('window').width * 0.7,
                            height: Dimensions.get('window').width * 0.1,                                                                        
                            backgroundColor: '#fb009e',                                                
                            borderRadius: 25,
                            justifyContent: 'center',
                            alignItems: 'center',                        
                            shadowOpacity: 0.5,
                            shadowRadius: 5,
                            shadowColor: 'grey',
                            shadowOffset: { height: 3, width: 3 }, 
                            elevation: 30,                       
                        }}
                        onPress={() => this.permissions()}
                    >
                        <Text style={{color: '#fff'}}>NEXT</Text>
                    </TouchableOpacity>              
                </View>
            </View>      
        )
    }
}
